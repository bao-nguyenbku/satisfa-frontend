export type ReduxErrorType = {
  statusCode: number;
  message: string;
  path?: string;
  type?: string;
};
export interface ReduxDataType {
  data: any;
  error?: ReduxDataType | null;
  isLoading: boolean;
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}
