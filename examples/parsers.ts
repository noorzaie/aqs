import { parse, ParseConfigType } from '../index';

const qs = 'name=null&age=30&married=false&address={"country":"canada","city":"vancouver"}';

const config: ParseConfigType = {
	globalConfigs: {
		parseJsons: false   // Disable parsing json values by default
	},
	paramsConfigs: {
		name: {
			parser: 'null'
		},
		age: {
			parser: 'number'
		},
		married: {
			parser: 'boolean'
		},
		address: {
			parser: 'json'  // Just parse address value as json
		}
	}
};

const results = parse(qs, config);

/*
{
        "conditions": [],
        "params": {
                "name": {
                        "name": "name",
                        "value": null,
                        "op": "equal",
                        "not": false
                },
                "age": {
                        "name": "age",
                        "value": 30,
                        "op": "equal",
                        "not": false
                },
                "married": {
                        "name": "married",
                        "value": false,
                        "op": "equal",
                        "not": false
                },
                "address": {
                        "name": "address",
                        "value": {
                                "country": "canada",
                                "city": "vancouver"
                        },
                        "op": "equal",
                        "not": false
                }
        }
}
*/
