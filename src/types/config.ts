export interface Judge0ClientConfig {
	/**
	 * Base URL of the Judge0 API.
	 */
	baseUrl: string;

	/**
	 * Header for the Authorization Token.
	 * @default "X-Auth-User"
	 */
	authorizationHeader?: string;

	/**
	 * Token for the Authorization.
	 */
	authorizationToken?: string;

	/**
	 * Header for the Authentication Token.
	 * @default "X-Auth-Token"
	 */
	authenticationHeader?: string;

	/**
	 * Token for the Authentication.
	 */
	authenticationToken?: string;
}
