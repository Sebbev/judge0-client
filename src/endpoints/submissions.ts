import type { HTTPError, KyInstance } from "ky";
import {
	type ClientResponse,
	type CreateSubmission,
	type Submission,
	type SubmissionResponse,
	createSubmissionToBase64,
	fromBase64ToSubmission,
	responseToSubmission,
	submissionToRequest,
} from "../types/index.js";
import { handleError } from "../utils/error.js";
import { successResponse } from "../utils/response.js";

/**
 * Submissions endpoint.
 */
export class SubmissionsEndpoint {
	private _client: KyInstance;

	constructor(client: KyInstance) {
		this._client = client.extend((parent) => ({
			...parent,
			prefixUrl: `${parent.prefixUrl}/submissions`,
		}));
	}

	/**
	 * Creates new submission. Created submission waits in queue to be processed. On successful creation, you are returned submission token which can be used to check submission status.
	 * @param submission The submission to create.
	 * @param base64Encoded Whether the submission should be base64 encoded.
	 * @param wait NOTE: It is not recommend the use of wait=true feature because it does not scale well. Whether to wait for the submission to complete.
	 * @returns A promise that resolves to the created submission.
	 */
	public async createAsync(
		submission: CreateSubmission,
		base64Encoded = false,
		wait = false,
	): Promise<ClientResponse<Submission, HTTPError["response"]>> {
		try {
			const searchParams = new URLSearchParams({
				wait: wait ? "true" : "false",
				base64_encoded: base64Encoded ? "true" : "false",
			});

			const requestSubmission = submissionToRequest(
				base64Encoded ? createSubmissionToBase64(submission) : submission,
			);

			const response = await this._client
				.post("", { json: requestSubmission, searchParams })
				.json<SubmissionResponse>();

			return successResponse(responseToSubmission(response));
		} catch (error) {
			return handleError(error);
		}
	}

	/**
	 * Get submission details.
	 * @param token Submission token
	 * @param base64Encoded Whether the response should be Base64 encoded
	 * @param fields Comma-separated list of fields to include in the response
	 * @returns Submission details
	 */
	public async getAsync(
		token: string,
		base64Encoded = false,
		fields: string | undefined = undefined,
	): Promise<ClientResponse<Submission, HTTPError["response"]>> {
		try {
			const searchParams = new URLSearchParams({
				base64_encoded: base64Encoded ? "true" : "false",
				fields: fields || "",
			});

			const response = await this._client.get(token, { searchParams }).json<SubmissionResponse>();
			return successResponse(
				base64Encoded
					? fromBase64ToSubmission(responseToSubmission(response))
					: responseToSubmission(response),
			);
		} catch (error) {
			return handleError(error);
		}
	}
}
