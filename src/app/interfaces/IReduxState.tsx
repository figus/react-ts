import ICard from './ICard';

export default interface IReduxState
{
  searchHistoryTerms: string[];
  searchResults: ICard[];
  myList: string[];
}
