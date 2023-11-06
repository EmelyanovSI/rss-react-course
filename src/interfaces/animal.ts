export interface Animal {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
}

export interface AnimalPageResponse {
  animals: Animal[];
  page: {
    firstPage: boolean;
    lastPage: boolean;
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
  sort: {
    clauses: [];
  };
}

export interface AnimalResponse {
  animal: Animal;
}
