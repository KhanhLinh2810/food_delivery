import {
	CounterService,
	getNextSequence,
} from '../api/counter/v1/counter.service';
import { NumericStringMap } from '../interface/common.interface';

export const getKeysMatching = async (
	list: NumericStringMap,
	keyword: string,
): Promise<Array<number>> => {
	const matchingKeys = [];
	for (const key in list) {
		if (list[key].includes(keyword)) {
			matchingKeys.push(parseInt(key.toString()));
		}
	}
	return matchingKeys;
};

export const genCode = async (prefix = 'HW', numLen = 8): Promise<string> => {
	const nextSq = await CounterService.getNextSequence(prefix);
	return prefix + nextSq.toString().padStart(numLen, '0');
};
