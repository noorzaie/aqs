import { parse, ParseConfigType } from '../index';

const qs = 'phone_number=09';

const config: ParseConfigType = {
	paramsConfigs: {
		phone_number: {
			alias: 'pn'
		}
	}
};

const results = parse(qs, config);

/*
{
        "conditions": [],
        "params": {
                "pn": {
                        "name": "pn",
                        "value": "09",
                        "op": "equal",
                        "not": false
                }
        }
}
*/
