import IProduct from './../interfaces/IProduct';
import { IWoolworthsResult, IProductInner, IProductOuter } from './../interfaces/IWoolworthsResult';

export const productSearchAsync = async (term: string): Promise<IProduct[]> =>
{
  const isBarcode = term.match(/^\d+$/gm) ? true : false;

  const wResults = await searchWoolworthsAsync(term, isBarcode);

  return wResults;
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

export const barcodeListSearch = (barcode: string[]): Array<Promise<IProduct>> =>
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
