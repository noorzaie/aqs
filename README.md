AQS is a query parser library that provides advanced operations comparing to typical query parser libraries.
For example, you can use different operators additional to `=`, or parse values from string to whatever you want and even define complex logic instead of just using `and` operator for parameters!

## Usage

### Basic
```javascript
const { parse } = require('aqs');

const parsed = parse('id=3&age=22');
```

### Use other operators
```javascript
const { parse } = require('aqs');

const parsed = parse('id=3&age{gt}22'); // Greater than
```

### Use negative operators
You can add `n` prefix to operator names or `not_` to full name of operators to make them negative.
```javascript
const { parse } = require('aqs');

const parsed = parse('id=3&age{ne}22'); // Not equal
``` 

### Use with config
```javascript
const { parse } = require('aqs');

const parsed = parse('id=3&age=22', { paramsConfigs: { age: { defaultValue: 20 } } });
```

### Use with custom logic
You can define logic of parameters in `logic` query string, using parentheses with `and` and `or` operators.

Benefit of this feature is that you can allow client side that makes more complex queries instead of simple `equal` queries.
```javascript
const { parse } = require('aqs');

const parsed = parse('skill=coding&age=30&experience=8&logic=(and,skill,(or,age,experience))');   // skill==coding and (age==30 or experience==8)
```
### Other features
There are some other features such as defining custom operators, parse values, ... that you can find them in [exmaples](https://github.com/noorzaie/aqs/tree/master/examples) folder.

## List of operators

| Operator        | Full-name           |
| ------------- | -------------:|
| e      | equal |
| i      | in      |
| sw | startsWith      |
| ew | endsWith      |
| gt | greaterThan      |
| lt | lessThan      |
| ge | greaterOrEqual      |
| le | lessOrEqual      |
| b | between      |
| c | contains      |
| ic | includes      |
| l | like      |
| il | ilike      |
| r | regex      |

## Configurations

<table>
<tr>
<td></td>
<th>Option</th>
<th>Description</th>
<th>Default value</th>
</tr>
<tr><td rowspan="7">**paramsConfigs**<br>(Configs that can be set for each parameter)</td>
<td>defaultValue</td><td>Default value of specific param</td><td></td></tr>
<tr><td>defaultOptions</td><td>Set default operator for specific param</td><td></td></tr>
<tr><td>parser</td><td>Use a parser to parse value</td><td></td></tr>
<tr><td>allowUnParseAble</td><td>If true, throws error if value is not parsable with the parser, Otherwise unparsed value will be used</td><td>false</td></tr>
<tr><td>alias</td><td>Use another key instead of passed key</td><td></td></tr>
<tr><td>allowedOps</td><td>List of allowed operators to be used</td><td>all</td></tr>
<tr><td>mapOp</td><td>If false, short name of operator will be returned, Otherwise fullname of operator will be returned</td><td>true</td></tr>

<tr><td rowspan="7">**globalConfigs**<br>(Configs that will be applied on all parameters)</td>
<td>allowedParams</td><td>List of parameters that could be passed in query string</td><td>all</td></tr>
<tr><td>excludedParams</td><td>List of parameters that could not be passed in query string</td><td></td></tr>
<tr><td>parseArrays</td><td>Parse array values or not</td><td>true</td></tr>
<tr><td>parseJsons</td><td>Parse json values or not</td><td>true</td></tr>
<tr><td>throwOnIllegalOp</td><td>If true, throws error if an unknown operator passed</td><td>false</td></tr>
<tr><td>allowLogic</td><td>Allow logic in query string or not</td><td>true</td></tr>
<tr><td>throwWrongLogic</td><td>Throw error if incorrect logic passed</td><td>false</td></tr>

<tr><td rowspan="7">**fixedParams**<br>(List of parameters that always will be returned)</td>
<td>name</td><td>Name of parameter</td><td></td></tr>
<tr><td>value</td><td>Value of parameter</td><td></td></tr>
<tr><td>op</td><td>Operator of parameter</td><td></td></tr>
<tr><td>not</td><td>Negate operator or not</td><td></td></tr>

</table>
