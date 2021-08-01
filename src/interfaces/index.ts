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
  value: string | number;
  category: string;
}

export interface GetCountryData {
  id: number;
  name: string;
  year: number;
  category: string;
}

export interface SetCountryData {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  categories: (string | boolean)[];
}
