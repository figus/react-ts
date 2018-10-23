import IProduct from './../interfaces/IProduct';
import { IWoolworthsResult, IProductInner, IProductOuter } from './../interfaces/IWoolworthsResult';
import { IColesResult, ICatalogEntryView } from '../interfaces/IColesResult';
import ICard from '../interfaces/ICard';

export const productSearchAsync = async (term: string): Promise<ICard[]> =>
{
  const isBarcode = term.match(/^\d+$/gm) ? true : false;

  const wResults = await searchWoolworthsAsync(term, isBarcode);
  const cResults = await searchColesAsync(term, isBarcode);
  const results = wResults.concat(cResults);

  const tarjetas: ICard[] = mergeResults(results);

  return tarjetas;
};

export const mergeResults = (resultados: IProduct[]): ICard[] =>
{
  if (resultados.length <= 0)
  {
    return;
  }

  const tarjetas: ICard[] = [];

  while (resultados.length > 0)
  {
    const currentProduct: IProduct = resultados.shift();
    const tarjeta: ICard = {
      barcode: currentProduct.barcode,
      name: currentProduct.name,
      imageUrl: currentProduct.image,
      size: currentProduct.packageSize,
      prices: [{
        price: currentProduct.price,
        cupString: currentProduct.cupString,
        store: currentProduct.origin,
      }],
    };

    if (resultados.length > 0)
    {
      const sameBc = resultados.filter((item) =>
      {
        return currentProduct.barcode === item.barcode;
      });

      resultados = resultados.filter((item) =>
      {
        return currentProduct.barcode !== item.barcode;
      });

      sameBc.forEach((item) =>
      {
        tarjeta.prices.push({
          price: item.price,
          cupString: item.cupString,
          store: item.origin,
        });
      });
    }

    tarjetas.push(tarjeta);
  }

  return tarjetas;
};

export const searchWoolworthsAsync = async (term: string, barcode: boolean = false): Promise<IProduct[]> =>
{
  if (barcode && !term.match(/\d+/gm))
  {
    throw new Error(`${term} is not a barcode`);
  }

  const queryUrl =
    'https://thingproxy.freeboard.io/fetch/https://www.woolworths.com.au/apis/ui/Search/products';
  const query = {
    SearchTerm: term,
    PageSize: 24,
    PageNumber: 1,
    SortType: 'TraderRelevance',
    Location: '/shop/search/products?searchTerm=' + term,
  };

  try
  {
    const resultados = await fetch(queryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });
    const products: IProduct[] = [];

    const productsRaw: IWoolworthsResult = await resultados.json();
    productsRaw.Products.map((productOuter: IProductOuter) =>
    {
      productOuter.Products.map((productInner: IProductInner) =>
      {
        if (!barcode || productInner.Barcode === term)
        {
          products.push({
            barcode: productInner.Barcode,
            hasCupString: productInner.HasCupPrice,
            cupString: productInner.CupString,
            image: productInner.MediumImageFile,
            name: productInner.Name,
            price: productInner.Price,
            packageSize: productInner.PackageSize,
            onSale: productInner.IsOnSpecial,
            origin: 'W',
          });
        }
      });
    });

    return products;
  }
  catch (err)
  {
    throw new Error('Error al buscar producto: ' + err);
  }
};
export const searchColesAsync = async (term: string, barcode: boolean = false): Promise<IProduct[]> =>
{
  if (barcode && !term.match(/\d+/gm))
  {
    throw new Error(`${term} is not a barcode`);
  }

  const proxy1 = 'https://thingproxy.freeboard.io/fetch/';
  const queryUrl = proxy1 + 'https://shop.coles.com.au/search/resources/store/20501/productview/bySearchTerm/' + term;

  try
  {
    const resultados = await fetch(queryUrl, {
      method: 'GET',
    });
    const products: IProduct[] = [];

    const productsRaw: IColesResult = await resultados.json();
    productsRaw.catalogEntryView.map((product: ICatalogEntryView) =>
    {
      products.push({
        barcode: term,
        hasCupString: true,
        cupString: product.u2.toUpperCase().replace('PER', ' / '),
        image: 'https://shop.coles.com.au' + product.t,
        name: product.n,
        price: Number(product.p1.o),
        packageSize: product.a.O3[0].toLowerCase(),
        onSale: false,
        origin: 'C',
      });
    });

    return products;
  }
  catch (err)
  {
    throw new Error('Error al buscar producto: ' + err);
  }
};

export const barcodeListSearch = (barcode: string[]): Array<Promise<ICard>> =>
{
  return barcode.map(async (bc: string) =>
  {
    const results = await productSearchAsync(bc);
    if (results.length > 0)
    {
      return results[0];
    }
  });
};
