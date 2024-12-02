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
