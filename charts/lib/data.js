import * as time from './time.js';

export const format = ({
  chartDataGroupBy = '',
  chartType = '',
  data,
  xScaleTime,
  xScaleTimeFormat,
  xValue = '',
}) => {
  switch (chartType.toLowerCase()) {
    case 'line': {
      // break if required data is present
      if (chartDataGroupBy && !appFuncs._.isEmpty(data))
        break;
    }
    // grouping not setup for the following chart types
    case 'scatterplot': // eslint-disable-line
    case 'bar':
    case 'pie':
    default: return data;
  }
  // group all values by groupby
  const lineValues = appFuncs._.groupBy(data, (d) => d[chartDataGroupBy]);

  if (appFuncs._.isEmpty(lineValues)) {
    appFuncs.logError({
      data: [ data, lineValues ],
      loc: __filename,
      msg: `could not create groups for data on key ${chartDataGroupBy}, returning data`,
    });

    return data;
  }
  // create object with values and keys for each lineValues group
  const lineGroups = Object.keys(lineValues).map((key) => {
    const transformed = [];

    // transform data if required
    if (xScaleTime && xScaleTimeFormat) {
      const parseTime = time.parse({ format: xScaleTimeFormat });
      lineValues[key].forEach((group) =>
        transformed.push({
          ...group,
          [xValue]: parseTime(group[xValue]),
        })
      );
    }

    return {
      id: key,
      values: transformed.length
        ? transformed
        : lineValues[key],
    };
  });

  return lineGroups;
};
