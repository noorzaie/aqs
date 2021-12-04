import { LOGIC_REGEX, OPERATOR_MAPPINGS, DEFAULT_PARSERS, OPERATORS } from './constants';

type BareOperatorsType =
	'equal'
	| 'in'
	| 'startsWith'
	| 'endsWith'
	| 'greaterThan'
	| 'lessThan'
	| 'greaterOrEqual'
	| 'lessOrEqual'
	| 'between'
	| 'contains'
	| 'includes'
	| 'like'
	| 'ilike'
	| 'regex';

type BareOperatorsAliasType = 'e' | 'i' | 'sw' | 'ew' | 'gt' | 'lt' | 'ge' | 'le' | 'b' | 'c' | 'ic' | 'l' | 'il' | 'r';

type PositiveOperatorsType = `{${BareOperatorsType}}`;
type PositiveOperatorsAliasType = `{${BareOperatorsAliasType}}`;

type NegativeOperatorsType = `{not_${BareOperatorsType}}`;
type NegativeOperatorsAliasType = `{n${BareOperatorsAliasType}}`;

type NonBareOperatorsType =
	'='
	| PositiveOperatorsType
	| PositiveOperatorsAliasType
	| NegativeOperatorsType
	| NegativeOperatorsAliasType;
type FormattedOperatorType = '=' | BareOperatorsType | BareOperatorsAliasType;
export type OperatorsType =
	'='
	| PositiveOperatorsType
	| PositiveOperatorsAliasType
	| NegativeOperatorsType
	| NegativeOperatorsAliasType;
export type OperatorMappingType = { [key in '=' | PositiveOperatorsType | PositiveOperatorsAliasType]: BareOperatorsType };

export type DefaultParsersType = 'null' | 'number' | 'boolean' | 'json';
type CustomParserType = (value: string) => unknown;

export interface ParamConfigType {
	defaultValue?: any;
	defaultOptions?: { op?: FormattedOperatorType; not?: boolean; };   // Used for params that is not passed in query string
	parser?: DefaultParsersType | CustomParserType;
	allowUnParseAble?: boolean;
	alias?: string;
	allowedOps?: NonBareOperatorsType[];
	mapOp?: boolean;    // Default is true
}

export interface ParamsConfigType {
	[key: string]: ParamConfigType;
}

export interface GlobalConfigs {
	allowedParams?: string[];
	excludedParams?: string[];
	parseArrays?: boolean;
	parseJsons?: boolean;
	throwOnIllegalOp?: boolean;
	allowLogic?: boolean;
	throwWrongLogic?: boolean;
}

export interface FixedParamType {
	name: string;
	value: any;
	op: BareOperatorsType | BareOperatorsAliasType;
	not: boolean;
}

export interface FormattedValueType {
	name: string;
	op: FormattedOperatorType;
	value: any;
	not?: boolean;
}

export interface FormattedValuesType {
	[key: string]: FormattedValueType
}

type LogicalOperatorsType = 'and' | 'or';

export interface LogicalValueType {
	op: LogicalOperatorsType;
	operands: (LogicalValueType | FormattedValueType)[]
}

export type ConditionalQueryType = (FormattedValueType | LogicalValueType)[];

export type ParsedParamType = [ string, NonBareOperatorsType, string ];

export interface CustomOpType {
	op: string;
	fullName: string;
}

export interface ParseConfigType {
	paramsConfigs?: ParamsConfigType;
	globalConfigs?: GlobalConfigs;
	fixedParams?: FixedParamType[];
}

export interface ParseReturnType {
	conditions: ConditionalQueryType;
	params: FormattedValuesType;
}

export const addCustomOperator = (op: CustomOpType) => {
	OPERATORS.push(`{${op.op}}` as any, `{${op.fullName}}` as any);
	OPERATORS.push(`{${op.fullName}}` as any);
	OPERATORS.push(`{n${op.op}}` as any, `{${op.fullName}}` as any);
	OPERATORS.push(`{not_${op.fullName}}` as any);
	// @ts-ignore
	OPERATOR_MAPPINGS[`{${op.op}}`] = op.fullName;
};

const getParamsRegex = () => {
	return new RegExp(`(${OPERATORS.join('|')})`, 'g');
};

const formatParam = ([ rawName, rawOp, rawValue ]: ParsedParamType, config?: ParamConfigType) => {
	if (!config || !config.allowedOps || config.allowedOps.includes(rawOp)) {   // Check allowed operators for this param
		let not = false;
		let op: FormattedOperatorType;
		// Remove negative sign from operator (if is negative)
		if (rawOp.startsWith('{not_')) {
			not = true;
			op = rawOp.replace('not_', '') as FormattedOperatorType;
		} else if (rawOp.startsWith('{n')) {
			not = true;
			op = rawOp.replace('n', '') as FormattedOperatorType;
		} else {
			op = rawOp as FormattedOperatorType;
		}

		let value: any = rawValue;
		let name = rawName;
		if (config !== undefined) {
			if (config.alias) {
				name = config.alias;
			}

			if (config.defaultValue && rawValue === undefined) {
				value = config.defaultValue;
			}

			// Parse value
			if (config.parser) {
				let parser;
				if (typeof config.parser === 'function') {  // Custom parser
					parser = config.parser;
				} else if (config.parser in DEFAULT_PARSERS) {
					parser = DEFAULT_PARSERS[config.parser];
				} else {
					value = rawValue;
					console.warn(`AQS: Wrong parser for '${rawValue}'`);
				}

				if (parser) {
					try {
						value = parser(rawValue);
					} catch (e) {
						if (config.allowUnParseAble === true) {
							value = rawValue;
						} else {
							throw new Error(`Error parsing param '${name}' with value ${rawValue}!`);
						}
					}
				}
			}
		}

		const param: FormattedValueType = {
			name,
			value,
			op: config?.mapOp === false ?
				op === '=' ?
					op :
					op.substr(1, op.length - 2) as BareOperatorsType :  // Remove braces from operator
				OPERATOR_MAPPINGS[op as keyof OperatorMappingType], // Map operator to complete name
			not
		};

		if (typeof value === 'string') {
			try {
				param.value = decodeURIComponent(param.value);
			} catch (e) {
				//
			}
		}

		return param;
	} else {
		throw new Error(`Operator ${rawOp} is not allowed for param ${rawName}!`);
	}
};

const setDefaultValues = (params: FormattedValuesType, configs: ParamConfigType) => {
	for (const [ key, config ] of Object.entries(configs)) {
		if (!(key in params) && 'default' in config) {
			params[key] = {
				name: key,
				value: config.defaultValue,
				op: 'equal',
				not: false,
				...config.defaultOptions
			};
		}
	}
};

const setFixedParams = (params: FormattedValuesType, fixedParams: FixedParamType[]) => {
	for (const fp of fixedParams) {
		params[fp.name] = fp;
	}
};

const addCondition = (data: ConditionalQueryType, logic: string[], formattedParams: FormattedValuesType, throwWrongLogic: boolean) => {
	while (logic.length > 0) {
		const word = logic.shift() as string;
		if (word === '(' || word === ',') {
			continue;
		} else if ([ 'and', 'or' ].includes(word)) {
			const operand = { op: word as LogicalOperatorsType, operands: [] };
			data.push(operand);
			addCondition(operand.operands, logic, formattedParams, throwWrongLogic);
		} else if (word === ')') {
			break;
		} else if (word in formattedParams) {
			data.push(formattedParams[word]);
		} else {
			if (throwWrongLogic) {
				throw new Error(`Param ${word} of logic not found in query!`);
			} else {
				console.warn(`AQS: Param ${word} of logic not found in query!`);
			}
		}
	}
};

const parseLogic = (conditions: ConditionalQueryType, logicString: string, formattedParams: FormattedValuesType, throwWrongLogic: boolean) => {
	const parsed = logicString.split(LOGIC_REGEX).filter(s => s !== '');
	addCondition(conditions, parsed, formattedParams, throwWrongLogic);
};

export const parse = (qs: string, { paramsConfigs, globalConfigs, fixedParams }: ParseConfigType = {}): ParseReturnType => {
	const params = qs.trim().split('&');
	const formattedParams: FormattedValuesType = {};
	let logic: string | undefined;
	const paramsRegex = getParamsRegex();

	for (const p of params) {
		const parsed = p.split(paramsRegex) as ParsedParamType; // Split by operators
		if (
			parsed.length === 3 && OPERATORS.includes(parsed[1]) && // If key, op and value exists in splitted param
			(
				(
					(!globalConfigs?.allowedParams || globalConfigs.allowedParams.includes(parsed[0])) &&
					(!globalConfigs?.excludedParams || !globalConfigs.excludedParams.includes(parsed[0]))
				) ||
				(parsed[0] === 'logic' && (!globalConfigs || globalConfigs.allowLogic !== false))   // Skip logic param if not allowed
			)
		) {
			if (parsed[0] === 'logic') {
				logic = parsed[2];
			} else {
				// Parse array and jsons if allowed
				if (globalConfigs?.parseArrays !== false && parsed[2].startsWith('[') && parsed[2].endsWith(']')) {
					parsed[2] = JSON.parse(parsed[2].replace(/'/g, '"')); // JSON.parse not working with single quotes
				} else if (globalConfigs?.parseJsons !== false && parsed[2].startsWith('{') && parsed[2].endsWith('}')) {
					parsed[2] = JSON.parse(parsed[2].replace(/'/g, '"')); // JSON.parse not working with single quotes
				}

				// Format param to final form
				const param = formatParam(parsed, paramsConfigs?.[parsed[0]]);
				formattedParams[param.name] = param;
			}
		} else {
			if (globalConfigs && globalConfigs.throwOnIllegalOp === true) {
				throw new Error(`Wrong parameter '${p}' passed!`);
			} else {
				console.warn(`AQS: Wrong parameter '${p}' passed!`);
			}
		}
	}

	// If there is any param with default value that is not passed in query string, add that to output params
	if (paramsConfigs) {
		setDefaultValues(formattedParams, paramsConfigs);
	}

	// Add fixed params to output
	if (fixedParams) {
		setFixedParams(formattedParams, fixedParams);
	}

	// Format params with specified logic
	let conditions: ConditionalQueryType = [];
	if (logic !== undefined && globalConfigs?.allowLogic !== false) {
		parseLogic(conditions, logic, formattedParams, !!globalConfigs && globalConfigs.throwWrongLogic === true);
	}

	return {
		conditions,
		params: formattedParams
	};
};
