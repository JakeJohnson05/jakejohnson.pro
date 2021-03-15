declare module 'simple-output' {
	export function success(msg: string): void;
	export function error(msg: string): void;
	export function info(msg: string): void;
	export function message(msg: string): void;
	export function warn(msg: string): void;
	export function node(msg: string): void;
	export const stdout: NodeJS.WriteStream;
	export const stderr: NodeJS.WriteStream;
}
