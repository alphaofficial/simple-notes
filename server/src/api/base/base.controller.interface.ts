export interface ApiResponse {
  statusCode: number;
  message: string;
  meta?: Record<string, unknown>;
}

export interface SuccessResponse<T> extends ApiResponse {
  data: T;
}

export interface ErrorResponse extends ApiResponse {
  error: string;
}

export type Either<T, U> = T | U;
