import IProduct from './../interfaces/IProduct';
import { IWoolworthsResult, IProductInner, IProductOuter } from './../interfaces/IWoolworthsResult';

export const productSearch = (term: string): Promise<IProduct[]> =>
{
  let isBarcode = false;
  if (term.match(/^\d+$/gm))
  {
    isBarcode = true;
  }

  const woollies = woolworthsSearch(term);

  const resultados = Array<Promise<IProduct[]>>();
  resultados.push(woolworthsSearch(term));

  return woollies;
};

export const searchWooliesBarcodeAsync = async (term: string): Promise<IProduct[]> =>
{
  if (!term.match(/\d+/gm))
  {
    return null;
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

  const resultados = await fetch(queryUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  });
  const productsRaw: IWoolworthsResult = await resultados.json();

  const products: IProduct[] = [];
  productsRaw.Products.map((productOuter: IProductOuter) =>
  {
    productOuter.Products.map((productInner: IProductInner) =>
    {
      if (productInner.Barcode === term)
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
          origin: 'woolworths',
        });
      }
    });
  });

  return products;
};

export const woolworthsSearch = async (term: string): Promise<IProduct[]> =>
{
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
    const resp = await fetch(queryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });
    const respUno = await resp.json();
    const products: IProduct[] = [];
    respUno.Products.map((prods) =>
    {
      prods.Products.map((pro) =>
      {
        if (pro.Barcode === term)
        {
          products.push({
            barcode: pro.Barcode,
            hasCupString: pro.HasCupPrice,
            cupString: pro.CupString,
            image: pro.MediumImageFile,
            name: pro.Name,
            price: pro.Price,
            packageSize: pro.PackageSize,
            onSale: pro.IsOnSpecial,
            origin: 'woolworths',
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

export const colesSearch = (term: string): Promise<IProduct[]> =>
{
  const queryUrl =
    'https://thingproxy.freeboard.io/fetch/https://api.coles.com.au/customer/v1/coles/products/complete?type=Barcode';
  const query = {
    productIds: term,
  };

  return fetch(queryUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'User-Agent': 'Shopmate/3.4.2 (iPhone; iOS 12.0.1; Scale/2.00)',
      'X-Coles-Api-Key': '046bc0d4-3854-481f-80dc-85f9e846503d',
      'X-Coles-Api-Secret': 'e6ab96ff-453b-45ba-a2be-ae8d7c12cadf',
    },
    body: JSON.stringify(query),
  })
    .then((resp) => resp.json())
    .then((resp) =>
    {
      const products: IProduct[] = [];
      resp.map((pro) =>
      {
        products.push({
          barcode: term,
          hasCupString: false,
          cupString: null,
          image: pro.ImageUri,
          name: pro.Name,
          price: 0.0,
          packageSize: pro.GeneralMerchandise.Size,
          onSale: false,
          origin: 'coles',
        });
      });

      return products;
    })
    .catch((err) =>
    {
      throw new Error('Error al buscar producto: ' + err);
    });
};

export const barcodeSearch = (barcode: string): Promise<IProduct> =>
{
  return productSearch(barcode).then((res: IProduct[]) =>
  {
    return res
      .filter((item: IProduct) =>
      {
        return item.barcode === barcode;
      })
      .shift();
  });
};

export const barcodeListSearchAsync = (barcode: string[]): Array<Promise<IProduct>> =>
{
  return barcode.map((bc: string) => barcodeSearch(bc));
};
