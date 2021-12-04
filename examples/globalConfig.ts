import { parse, ParseConfigType } from '../index';

const qs = 'name=ahmad&hobbies{i}["coding","sport"]&family{sw}noor&experience{gt}8&age{ge}30&logic=(and,skill,(or,age,experience))';

const config: ParseConfigType = {
	globalConfigs: {
		parseJsons: false,
		parseArrays: false,
		allowedParams: [ 'name', 'age' ],
		throwOnIllegalOp: false,
		allowLogic: false,
		throwWrongLogic: false,
		excludedParams: []
	}
};

const results = parse(qs, config);

/*
{
        "conditions": [],
        "params": {
                "name": {
                        "name": "name",
                        "value": "ahmad",
                        "op": "equal",
                        "not": false
                },
                "age": {
                        "name": "age",
                        "value": "30",
                        "op": "greaterOrEqual",
                        "not": false
                }
        }
}
*/
