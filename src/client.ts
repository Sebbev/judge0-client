import ky, { type KyInstance } from "ky";
import { SubmissionsEndpoint } from "./endpoints/submissions.js";
import type { Judge0ClientConfig } from "./types/config.js";

export class Judge0Client {
	private _client: KyInstance;

	/**
	 * The Submission endpoints.
	 */
	public submissions: SubmissionsEndpoint;

	/**
	 * Create a new Judge0 API client
	 * @param config Client configuration
	 */
	constructor(config: Judge0ClientConfig) {
		const headers = new Headers({ "Content-Type": "application/json" });
		if (config.authorizationToken) {
			headers.append(config.authorizationHeader || "X-Auth-User", config.authorizationToken);
		}
		if (config.authenticationToken) {
			headers.append(config.authenticationHeader || "X-Auth-Token", config.authenticationToken);
		}

		this._client = ky.create({
			prefixUrl: config.baseUrl,
			headers,
		});
		this.submissions = new SubmissionsEndpoint(this._client);
	}

	/**
	 * Ping the Judge0 API to check if it's available.
	 * @returns True if the API is available
	 */
	async pingAsync() {
		try {
			await this._client.get("");
			return true;
		} catch (error) {
			return false;
		}
	}
}
