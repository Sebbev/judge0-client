export interface SuccessResponse<TData> {
	success: true;
	data: TData;
	error?: undefined;
}

export interface ErrorResponse<TError> {
	success: false;
	data?: undefined;
	error: TError;
}

export type ClientResponse<TSuccess, TError> = SuccessResponse<TSuccess> | ErrorResponse<TError>;
