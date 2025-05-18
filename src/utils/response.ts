import type { ErrorResponse, SuccessResponse } from "../types/index.js";

export function successResponse<T>(data: T): SuccessResponse<T> {
	return {
		success: true,
		data,
	};
}

export function errorResponse<T>(error: T): ErrorResponse<T> {
	return {
		success: false,
		error,
	};
}
