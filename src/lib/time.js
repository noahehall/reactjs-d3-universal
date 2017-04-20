import * as d3 from 'd3';

// convert string to date
export const parse = ({
  format = '',
}) => {
  if (!format) {
    appFuncs.logError({
      data: format,
      loc: __filename,
      msg: 'format must be valid variables in time.parse(), returning null',
    });

    return null;
  }

  return d3.timeParse(format);
};

// convert date to string
export const format = ({
  format, // eslint-disable-line
}) => d3.timeFormat(format);
