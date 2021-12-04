import { parse } from '../index';

const qs = 'age{ngt}30&experience{ne}0';

const results = parse(qs);

/*
* {
        "conditions": [],
        "params": {
                "age": {
                        "name": "age",
                        "value": "30",
                        "op": "greaterThan",
                        "not": true
                },
                "experience": {
                        "name": "experience",
                        "value": "0",
                        "op": "equal",
                        "not": true
                }
        }
}
*/
