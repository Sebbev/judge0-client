# Judge0 Client

Client for Judge0 API build with Typescript.

## Features

- Submissions

## Installation

```bash
npm install judge0-client
```

Or with bun:

```bash
bun add judge0-client
```

## Usage

```ts
import { Judge0Client } from "judge0-client";

// Create a new client
const judge0 = new Judge0Client({
  baseUrl: "https://judge0-ce.p.rapidapi.com", // or any other Judge0 CE API URL
  authorizationHeader: "your-authorization-header", // defaults to X-Auth-User
  authorizationToken: "your-authorization-token",
  authenticationHeader: "your-authentication-header", // defaults to X-Auth-Token
  authenticationToken: "your-authentication-token",
});

// Create a submission
const createdSubmission = await judge0.submissions.createAsync({
  sourceCode: 'print("Hello, World!")',
  languageId: 63, // Node.js
});
console.log(`Submission created with token: ${createdSubmission.data.token}`);

// Get submission details
const submissionResult = await judge0.submissions.getAsync(
  createdSubmission.data.token
);
console.log("Submission status:", submissionResult.data.status);
```

## Development

### Building the package

```bash
bun run build
```

### Running tests

```bash
bun test
```

### Linting

```bash
bun run lint
```

### Formatting

```bash
bun run format
```

### Lint and format

```bash
bun run check
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
