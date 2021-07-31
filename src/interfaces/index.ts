export interface SourceCSVRowNames {
  country_or_area: string;
  year: number;
  value: number;
  category: string;
}

export interface CleanedRowNames {
  id: number;
  name: string;
  year: number;
  value: number;
  category: string;
}

export interface GetCompanyData {
  id: number;
  name: string;
  year: number;
  category: string;
}

export interface SetCompanyData {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  categories: (string | boolean)[];
}
