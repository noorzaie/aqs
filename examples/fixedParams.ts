import { parse, ParseConfigType } from '../index';

const qs = 'age=30';

const config: ParseConfigType = {
	fixedParams: [
		{
			name: 'skills',
			not: false,
			op: 'i',
			value: [ 'js', 'php' ]
		}
	]
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
                "skills": {
                        "name": "skills",
                        "not": false,
                        "op": "i",
                        "value": [
                                "js",
                                "php"
                        ]
                }
        }
}
*/
