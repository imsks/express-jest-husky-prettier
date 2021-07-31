export interface UserCsvRow {
  country_or_area: string;
  year: number;
  value: number;
  category: string;
}

export interface UserDetailsRow {
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
