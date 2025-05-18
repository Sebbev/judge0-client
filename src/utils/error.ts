import { HTTPError } from "ky";
import { errorResponse } from "./response.js";

export function handleError(error: unknown) {
	if (error instanceof HTTPError) {
		return errorResponse(error.response);
	}

	throw error;
}
