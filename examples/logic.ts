import { parse } from '../index';

const qs = 'skill=coding&age{lt}30&experience{gt}8&logic=(and,skill,(or,age,experience))';

const results = parse(qs);

/*

{
        "conditions": [
                {
                        "op": "and",
                        "operands": [
                                {
                                        "name": "skill",
                                        "value": "coding",
                                        "op": "equal",
                                        "not": false
                                },
                                {
                                        "op": "or",
                                        "operands": [
                                                {
                                                        "name": "age",
                                                        "value": "30",
                                                        "op": "lessThan",
                                                        "not": false
                                                },
                                                {
                                                        "name": "experience",
                                                        "value": "8",
                                                        "op": "greaterThan",
                                                        "not": false
                                                }
                                        ]
                                }
                        ]
                }
        ],
        "params": {
                "skill": {
                        "name": "skill",
                        "value": "coding",
                        "op": "equal",
                        "not": false
                },
                "age": {
                        "name": "age",
                        "value": "30",
                        "op": "lessThan",
                        "not": false
                },
                "experience": {
                        "name": "experience",
                        "value": "8",
                        "op": "greaterThan",
                        "not": false
                }
        }
}
*/
