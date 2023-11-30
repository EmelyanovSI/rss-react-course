export interface Animal {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
}

export interface Page {
  firstPage: boolean;
  lastPage: boolean;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface AnimalPageRequest {
  search: string;
  page: string;
  limit: string;
}

export type AnimalRequest = string | undefined;

export interface AnimalPageResponse {
  animals: Animal[];
  page: Page;
  sort: {
    clauses: [];
  };
}

export interface AnimalResponse {
  animal: Animal;
}
