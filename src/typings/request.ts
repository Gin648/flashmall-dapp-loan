export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
  total?: number;
  failMsg?: string;
}

export interface Page {
  page: number;
  size: number;
}
