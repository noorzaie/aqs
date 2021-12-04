import { parse, ParseConfigType } from '../index';

const qs = 'birthDate=2000-03-23';

const config: ParseConfigType = {
	paramsConfigs: {
		birthDate: {
			parser: value => new Date(value)
		}
	}
};

const results = parse(qs, config);

/*
{
  conditions: [],
  params: {
    birthDate: {
      name: 'birthDate',
      value: 2000-03-23T00:00:00.000Z,
      op: 'equal',
      not: false
    }
  }
}
*/
