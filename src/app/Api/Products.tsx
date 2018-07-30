import IProduct from './../interfaces/IProduct';

export const productSearch = (term: string): Promise<IProduct[]> => {
  let queryUrl =
    'https://thingproxy.freeboard.io/fetch/https://www.woolworths.com.au/apis/ui/Search/products';
  let query = {
    SearchTerm: term,
    PageSize: 24,
    PageNumber: 1,
    SortType: 'TraderRelevance',
    Location: '/shop/search/products?searchTerm=' + term
  };

  return fetch(queryUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  })
    .then(resp => resp.json())
    .then(resp => {
      let products: IProduct[] = [];
      resp.Products.map(prods => {
        prods.Products.map(pro => {
          products.push({
            barcode: pro.Barcode,
            hasCupString: pro.HasCupPrice,
            cupString: pro.CupString,
            image: pro.MediumImageFile,
            name: pro.Name,
            price: pro.Price,
            packageSize: pro.PackageSize,
            onSale: pro.IsOnSpecial,
            origin: 'woolworths'
          });
        });
      });

      return products;
    })
    .catch(err => {
      throw new Error('Error al buscar producto');
    });
};
