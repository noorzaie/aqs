import { parse, ParseConfigType } from '../index';

const qs = 'age=30';

const config: ParseConfigType = {
	paramsConfigs: {
		hobbies: {
			defaultValue: [],
			defaultOptions: {
				not: false,
				op: 'e'
			}
		}
	}
};

const results = parse(qs, config);

/*
{
        "conditions": [],
        "params": {
                "age": {
                        "name": "age",
                        "value": "30",
                        "op": "equal",
                        "not": false
                },
                "hobbies": {
                        "name": "hobbies",
                        "value": [],
                        "op": "e",
                        "not": false
                }
        }
}
*/
