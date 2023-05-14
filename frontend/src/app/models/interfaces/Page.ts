import { City } from './City';
import { Pageable } from './Pageable';
import { Sort } from './Sort';

export interface Page {
  content: City[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: false;
}
