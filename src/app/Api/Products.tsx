import ISearchResult from '../interfaces/ISearchResult';
import { IWoolworthsResult, IProductInner, IProductOuter } from './../interfaces/IWoolworthsResult';
import { IColesResult, ICatalogEntryView } from '../interfaces/IColesResult';
import ICard from '../interfaces/ICard';
import { Promise as Promis } from 'bluebird';

export const productSearchAsync = async (term: string): Promise<ICard[]> =>
{
  const isBarcode = term.match(/^\d+$/gm) ? true : false;

  const wResults = await buscaWoolworthsAsync(term, isBarcode);
  const cResults = await buscaColesAsync(term, isBarcode);

  const tarjetas = combinaResultados([wResults, cResults]);

  return tarjetas;
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
export const busqueda = async (term: string) =>
{
  const isBarcode = term.match(/\d+/gm) ? true : false;

  const resultadosW: Array<Promise<ISearchResult>> = await buscaWoolworthsAsync(term, isBarcode);
  let resultadosC: Array<Promise<ISearchResult>> = [];
  if (isBarcode)
  {
    resultadosC = await buscaColesAsync(term, isBarcode);
  }
  else
  {
    resultadosC = resultadosW.map(async (item) =>
    {
      const a = await buscaColesAsync((await item).barcode, true);
      if (a.length > 0 && a[0] !== undefined)
      {
        return a[0];
      }
    });
  }

  return await combinaResultados([resultadosW, resultadosC]);
};
export const combinaResultados = async (resultados: Array<Array<Promise<ISearchResult>>>) =>
{
  if (resultados.length <= 0)
  { return; }

  const tarjetas: ICard[] = [];

  let unArray;
  try
  {
    unArray = await Promise.all(
      await Promis.reduce(resultados, (acc: Array<Promise<ISearchResult>>, item: Array<Promise<ISearchResult>>) =>
      {
        return acc.concat(item);
      }, []));
  }
  catch (err)
  {
    throw err;
  }

  while (unArray.length > 0)
  {
    const primerItem: ISearchResult = unArray.shift();
    if (!primerItem) { continue; }

    const iguales = unArray.filter((item) =>
    {
      return item && item.barcode === primerItem.barcode;
    });

    const diferentes = unArray.filter((item) =>
    {
      return item && item.barcode !== primerItem.barcode;
    });

    unArray = diferentes;

    const tarjeta: ICard = {
      barcode: primerItem.barcode,
      imageUrl: primerItem.image,
      name: primerItem.name,
      size: primerItem.packageSize,
      prices: [{
        id: primerItem.origin + primerItem.barcode,
        cupString: primerItem.cupString,
        price: primerItem.price,
        store: primerItem.origin,
      }],
    };

    iguales.forEach((item) =>
    {
      if (item)
      {
        tarjeta.prices.push({
          id: item.origin + item.barcode,
          cupString: item.cupString,
          price: item.price,
          store: item.origin,
        });
      }
    });

    tarjetas.push(tarjeta);
  }
  return tarjetas;
};
export const buscaWoolworthsAsync = async (term: string, isBarcode: boolean = false) =>
{
  if (isBarcode && !term.match(/\d+/gm))
  {
    throw new Error(`${term} is not a barcode`);
  }

  const proxy1 = 'https://thingproxy.freeboard.io/fetch/';
  const proxy2 = 'http://localhost:3001/fetch/';
  const queryUrl = proxy2 +
    'https://www.woolworths.com.au/apis/ui/Search/products';
  const query = {
    SearchTerm: term,
    PageSize: 6,
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

    const productsRaw: IWoolworthsResult = await resultados.json();
    const products = [];
    productsRaw.Products.map((productOuter: IProductOuter) =>
    {
      productOuter.Products.map((productInner: IProductInner) =>
      {
        if (!isBarcode || productInner.Barcode === term)
        {
          const data: ISearchResult = {
            barcode: productInner.Barcode,
            hasCupString: productInner.HasCupPrice,
            cupString: productInner.CupString,
            image: productInner.MediumImageFile,
            name: productInner.Name,
            price: productInner.Price,
            special: productInner.IsOnSpecial,
            savingsAmount: productInner.SavingsAmount,
            packageSize: productInner.PackageSize,
            origin: 'W',
          };

          products.push(data);
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
export const buscaColesAsync = async (term: string, isBarcode: boolean = false) =>
{
  if (isBarcode && !term.match(/\d+/gm))
  {
    throw new Error(`${term} is not a barcode`);
  }

  const proxy1 = 'https://thingproxy.freeboard.io/fetch/';
  const proxy2 = 'http://localhost:3001/fetch/';
  const queryUrl = proxy2 +
    'https://shop.coles.com.au/search/resources/store/20501/productview/bySearchTerm/' + term;

  try
  {
    const resultados = await fetch(queryUrl, {
      method: 'GET',
    });

    const productsRaw: IColesResult = await resultados.json();
    const products = productsRaw.catalogEntryView.map(async (product: ICatalogEntryView) =>
    {
      const data: ISearchResult = {
        barcode: isBarcode ? term : undefined,
        hasCupString: true,
        cupString: product.u2.toUpperCase().replace('PER', ' / '),
        image: 'https://shop.coles.com.au' + product.t,
        name: product.n,
        price: Number(product.p1.o),
        special: product.t1 && product.t1.toUpperCase() === 'S',
        savingsAmount: product.p1.l4 && (Number(product.p1.l4) - Number(product.p1.o)),
        packageSize: product.a.O3[0].toLowerCase(),
        origin: 'C',
      };

      return data;
    });

    return products;
  }
  catch (err)
  {
    throw new Error('Error al buscar producto: ' + err);
  }
};
