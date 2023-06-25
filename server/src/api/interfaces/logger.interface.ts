export interface LoggerInterface {
	info(scope: string, message: string, params?: Record<string, unknown>): void;
	error(scope: string, message: string, params?: Record<string, unknown>): void;
	warn(scope: string, message: string, params?: Record<string, unknown>): void;
	debug(scope: string, message: string, params?: Record<string, unknown>): void;
}
