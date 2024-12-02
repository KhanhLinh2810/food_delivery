import { isNumber } from 'class-validator';

export function toSafeInteger(value: any): number {
	const result = Number(value);
	return isNumber(result) ? result : 0;
}

export function toSafeString(value: any): string | undefined {
	return value ? value.toString() : undefined;
}

export function parseSafeInterger(value: any): number | null | undefined {
	return value !== null && value !== undefined ? toSafeInteger(value) : value;
}
