import { parse } from '../index';

const qs = 'hobbies{i}["coding","sport"]&address={"country":"canada","city":"vancouver"}';

const results = parse(qs);

/*
{
        "conditions": [],
        "params": {
                "hobbies": {
                        "name": "hobbies",
                        "value": [
                                "coding",
                                "sport"
                        ],
                        "op": "in",
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

