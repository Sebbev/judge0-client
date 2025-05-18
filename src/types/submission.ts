/**
 * Represents a object for creating a submission in Judge0.
 */
export interface CreateSubmission {
	/**
	 * Program's source code.
	 * No default, this attribute is required for single-file programs.
	 */
	sourceCode: string;

	/**
	 * Language ID.
	 * No default, this attribute is required.
	 */
	languageId: number;

	/**
	 * Optional options for the compiler (i.e., compiler flags).
	 */
	compilerOptions?: string;

	/**
	 * Optional command line arguments for the program.
	 */
	commandLineArguments?: string;

	/**
	 * Optional input for program.
	 */
	stdin?: string;

	/**
	 * Optional expected output of program. Used when you want to compare with stdout
	 */
	expectedOutput?: string;

	/**
	 * Default runtime limit for every program in seconds. Depends on configuration.
	 */
	cpuTimeLimit?: number;

	/**
	 * Extra time before killing the program when time limit is exceeded. Depends on configuration.
	 */
	cpuExtraTime?: number;

	/**
	 * Limit wall-clock time in seconds. Depends on configuration.
	 */
	wallTimeLimit?: number;

	/**
	 * Limit address space of the program in kilobytes. Depends on configuration.
	 */
	memoryLimit?: number;

	/**
	 * Limit process stack in kilobytes. Depends on configuration.
	 */
	stackLimit?: number;

	/**
	 * Maximum number of processes and/or threads program can create. Depends on configuration.
	 */
	maxProcessesAndOrThreads?: number;

	/**
	 * If true then cpu_time_limit will be used as per process and thread. Depends on configuration.
	 */
	enablePerProcessAndThreadTimeLimit?: boolean;

	/**
	 * If true then memory_limit will be used as per process and thread. Depends on configuration.
	 */
	enablePerProcessAndThreadMemoryLimit?: boolean;

	/**
	 * Limit file size created or modified by the program in kilobytes. Depends on configuration.
	 */
	maxFileSize?: number;

	/**
	 * If true standard error will be redirected to standard output. Depends on configuration.
	 */
	redirectStderrToStdout?: boolean;

	/**
	 * If true program will have network access. Depends on configuration.
	 */
	enableNetwork?: boolean;

	/**
	 * Run each program number_of_runs times and take average of time and memory. Depends on configuration.
	 */
	numberOfRuns?: number;

	/**
	 * Optional additional files in Base64 Encoded String. This attribute is required for multi-file programs.
	 */
	additionalFiles?: string;

	/**
	 * Optional URL on which Judge0 will issue PUT request after submission.
	 */
	callbackUrl?: string;
}

/**
 * Internal interface used in the request to Judge0 API.
 * @see use {@link submissionToRequest} for converting a Submission object to a SubmissionRequest object.
 */
export interface SubmissionRequest {
	source_code: string;
	language_id: number;
	compiler_options?: string;
	command_line_arguments?: string;
	stdin?: string;
	expected_output?: string;
	cpu_time_limit?: number;
	cpu_extra_time?: number;
	wall_time_limit?: number;
	memory_limit?: number;
	stack_limit?: number;
	max_processes_and_or_threads?: number;
	enable_per_process_and_thread_time_limit?: boolean;
	enable_per_process_and_thread_memory_limit?: boolean;
	max_file_size?: number;
	redirect_stderr_to_stdout?: boolean;
	enable_network?: boolean;
	number_of_runs?: number;
	additional_files?: string;
	callback_url?: string;
}

/**
 * Represents a submission object returned from Judge0.
 */
export interface Submission {
	/**
	 * Standard output of the program after execution.
	 */
	stdout?: string;

	/**
	 * Standard error of the program after execution.
	 */
	stderr?: string;

	/**
	 * Standard error of the program after execution.
	 */
	compileOutput?: string;

	/**
	 * Status message from Judge0 or isolate.
	 */
	message?: string;

	/**
	 * The program’s exit code.
	 */
	exitCode?: string;

	/**
	 * Signal code that the program received before exiting.
	 */
	exitSignal?: string;

	/**
	 * Submission status.
	 */
	status?: {
		/**
		 * Status ID.
		 */
		id: number;

		/**
		 * Status description.
		 */
		description: string;
	};

	/**
	 *  Date and time when submission was created.
	 */
	createdAt?: string;

	/**
	 * Date and time when submission was processed. Undefined if still in queue or processing.
	 */
	finishedAt?: string;

	/**
	 * Unique submission token for specific submission.
	 */
	token: string;

	/**
	 *  Program's run time in seconds.
	 */
	time?: string;

	/**
	 * Program's wall time in seconds.
	 */
	wallTime?: string;

	/**
	 * Memory used by the program after execution in kilobytes.
	 */
	memory?: string;

	/**
	 * Language ID.
	 */
	languageId?: number;

	/**
	 * Status ID.
	 */
	statusId?: number;
}

/**
 * Internal interface used in the response from Judge0 API.
 * @see use {@link responseToSubmission} for converting a SubmissionResponse object to a Submission object.
 */
export interface SubmissionResponse {
	stdout?: string;
	stderr?: string;
	compile_output?: string;
	message?: string;
	exit_code?: string;
	exit_signal?: string;
	status?: {
		id: number;
		description: string;
	};
	created_at: string;
	finished_at?: string;
	token: string;
	time?: string;
	wall_time?: string;
	memory?: string;
	language_id?: number;
	status_id?: number;
}

/**
 * Converts a Submission object to a SubmissionRequest object.
 * @param submission Submission object
 * @returns SubmissionRequest object
 */
export function submissionToRequest(submission: CreateSubmission): SubmissionRequest {
	return {
		source_code: submission.sourceCode,
		language_id: submission.languageId,
		compiler_options: submission.compilerOptions,
		command_line_arguments: submission.commandLineArguments,
		stdin: submission.stdin,
		expected_output: submission.expectedOutput,
		cpu_time_limit: submission.cpuTimeLimit,
		cpu_extra_time: submission.cpuExtraTime,
		wall_time_limit: submission.wallTimeLimit,
		memory_limit: submission.memoryLimit,
		stack_limit: submission.stackLimit,
		max_processes_and_or_threads: submission.maxProcessesAndOrThreads,
		enable_per_process_and_thread_time_limit: submission.enablePerProcessAndThreadTimeLimit,
		enable_per_process_and_thread_memory_limit: submission.enablePerProcessAndThreadMemoryLimit,
		max_file_size: submission.maxFileSize,
		redirect_stderr_to_stdout: submission.redirectStderrToStdout,
		enable_network: submission.enableNetwork,
		number_of_runs: submission.numberOfRuns,
		additional_files: submission.additionalFiles,
		callback_url: submission.callbackUrl,
	};
}

/**
 * Converts a SubmissionRequest object to a Submission object.
 * @param request SubmissionRequest object
 * @returns Submission object
 */
export function responseToSubmission(request: SubmissionResponse): Submission {
	return {
		stdout: request.stdout,
		stderr: request.stderr,
		compileOutput: request.compile_output,
		message: request.message,
		exitCode: request.exit_code,
		exitSignal: request.exit_signal,
		status: request.status
			? {
					id: request.status.id,
					description: request.status.description,
				}
			: undefined,
		createdAt: request.created_at,
		finishedAt: request.finished_at,
		token: request.token,
		time: request.time,
		wallTime: request.wall_time,
		memory: request.memory,
		languageId: request.language_id,
		statusId: request.status_id,
	};
}

/**
 * Converts 'sourceCode', 'stdin' and 'expectedOutput' to Base64 encoded strings.
 * @param submission Submission object
 * @returns Submission object with 'sourceCode', 'stdin' and 'expectedOutput' as Base64 encoded strings
 */
export function createSubmissionToBase64(submission: CreateSubmission): CreateSubmission {
	return {
		...submission,
		sourceCode: btoa(submission.sourceCode),
		stdin: submission.stdin ? btoa(submission.stdin) : undefined,
		expectedOutput: submission.expectedOutput ? btoa(submission.expectedOutput) : undefined,
	};
}

/**
 * Converts 'stdout', 'stderr', 'compileOutput' and 'message' to Base64 decoded strings.
 * @param submission Submission object
 * @returns Submission object with 'stdout', 'stderr', 'compileOutput' and 'message' as Base64 decoded strings
 */
export function fromBase64ToSubmission(submission: Submission): Submission {
	return {
		...submission,
		stdout: submission.stdout ? atob(submission.stdout) : undefined,
		stderr: submission.stderr ? atob(submission.stderr) : undefined,
		compileOutput: submission.compileOutput ? atob(submission.compileOutput) : undefined,
		message: submission.message ? atob(submission.message) : undefined,
	};
}
