import { DefaultParsersType, OperatorMappingType, OperatorsType } from './index';

export const OPERATORS: OperatorsType[] = [
	'=',
	'{e}', '{i}', '{sw}', '{ew}', '{gt}', '{lt}', '{ge}', '{le}', '{b}', '{c}', '{ic}', '{l}', '{il}', '{r}',
	'{ne}', '{ni}', '{nsw}', '{new}', '{ngt}', '{nlt}', '{nge}', '{nle}', '{nb}', '{nc}', '{nic}', '{nl}', '{nil}', '{nr}',
	'{equal}', '{in}', '{startsWith}', '{endsWith}', '{greaterThan}', '{lessThan}', '{greaterOrEqual}', '{lessOrEqual}', '{between}', '{contains}', '{includes}', '{like}', '{ilike}', '{regex}',
	'{not_equal}', '{not_in}', '{not_startsWith}', '{not_endsWith}', '{not_greaterThan}', '{not_lessThan}', '{not_greaterOrEqual}', '{not_lessOrEqual}', '{not_between}', '{not_contains}', '{not_includes}', '{not_like}', '{not_ilike}', '{not_regex}'
];

export const OPERATOR_MAPPINGS: OperatorMappingType = {
	'=': 'equal',
	'{e}': 'equal',
	'{i}': 'in',
	'{sw}': 'startsWith',
	'{ew}': 'endsWith',
	'{gt}': 'greaterThan',
	'{lt}': 'lessThan',
	'{ge}': 'greaterOrEqual',
	'{le}': 'lessOrEqual',
	'{b}': 'between',
	'{c}': 'contains',
	'{ic}': 'includes',
	'{l}': 'like',
	'{il}': 'ilike',
	'{r}': 'regex',
	'{equal}': 'equal',
	'{in}': 'in',
	'{startsWith}': 'startsWith',
	'{endsWith}': 'endsWith',
	'{greaterThan}': 'greaterThan',
	'{lessThan}': 'lessThan',
	'{greaterOrEqual}': 'greaterOrEqual',
	'{lessOrEqual}': 'lessOrEqual',
	'{between}': 'between',
	'{contains}': 'contains',
	'{includes}': 'includes',
	'{like}': 'like',
	'{ilike}': 'ilike',
	'{regex}': 'regex'
};

export const PARAMS_REGEX = new RegExp(`(${OPERATORS.join('|')})`, 'g');

export const LOGIC_REGEX = new RegExp('([(,)])', 'g');

export const DEFAULT_PARSERS: { [key in DefaultParsersType]: (value: any) => any } = {
	number: value => parseFloat(value),
	boolean: value => value === 'true' ? true : value === 'false' ? false : value,
	null: value => value === 'null' ? null : value,
	json: value => JSON.parse(value.replace(/'/g, '"'))
};
