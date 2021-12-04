import { addCustomOperator, CustomOpType, parse } from '../index';

const qs = 'age=30&weight{lg}60';

const operator: CustomOpType = {
	op: 'lg',
	fullName: 'lessOrGreaterThan'
};

addCustomOperator(operator);

const results = parse(qs);

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
                "weight": {
                        "name": "weight",
                        "value": "60",
                        "op": "lessOrGreaterThan",
                        "not": false
                }
        }
}
*/
