export interface IAllUsers {
  results: IResult[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface IResult {
  locked: number;
  deleted: boolean;
  role: string;
  isEmailVerified: boolean;
  name: string;
  email: string;
  id: string;
  assigned:boolean
}
