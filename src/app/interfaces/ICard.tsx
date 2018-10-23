export default interface ICard {
  barcode: string;
  name: string;
  imageUrl: string;
  size: string;
  prices: [
    {
      price: number;
      cupString: string;
      store: string;
    }
  ];
}
