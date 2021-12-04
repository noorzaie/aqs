import { parse, ParseConfigType } from '../index';

const qs = 'age{gt}30';

const config: ParseConfigType = {
	paramsConfigs: {
		age: {
			allowedOps: [ '{e}' ]
		}
	}
};

const results = parse(qs, config);

/*
Error: Operator {gt} is not allowed for param age!
*/
