import { parse } from '../index';

const qs = 'name=ahmad&hobbies{i}["coding","sport"]&family{sw}noor&experience{gt}8&age{ge}30&weight{b}[60,70]&school{c}i&skills{ic}js&phone{l}09%';

const results = parse(qs);

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
                "hobbies": {
                        "name": "hobbies",
                        "value": [
                                "coding",
                                "sport"
                        ],
                        "op": "in",
                        "not": false
                },
                "family": {
                        "name": "family",
                        "value": "noor",
                        "op": "startsWith",
                        "not": false
                },
                "experience": {
                        "name": "experience",
                        "value": "8",
                        "op": "greaterThan",
                        "not": false
                },
                "age": {
                        "name": "age",
                        "value": "30",
                        "op": "greaterOrEqual",
                        "not": false
                },
                "weight": {
                        "name": "weight",
                        "value": [
                                60,
                                70
                        ],
                        "op": "between",
                        "not": false
                },
                "school": {
                        "name": "school",
                        "value": "i",
                        "op": "contains",
                        "not": false
                },
                "skills": {
                        "name": "skills",
                        "value": "js",
                        "op": "includes",
                        "not": false
                },
                "phone": {
                        "name": "phone",
                        "value": "09%",
                        "op": "like",
                        "not": false
                }
        }
}
*/
