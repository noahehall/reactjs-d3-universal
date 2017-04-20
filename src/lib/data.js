import * as time from './time.js';

export const checkTimeFormat = ({
  data,
  parseTime,
  timeProperty,
  xScaleTimeFormat,
}) => {
  try {
    if (parseTime(data[0][timeProperty])) return false;

    // return parseTime(time.format({ format: xScaleTimeFormat })(new Date("Fri Mar 17 16:50:48 +0000 2017")))
    return time.format({ format: xScaleTimeFormat });
  } catch (e) {
    return new Error(`something went wrong accessing data[0][${timeProperty}] inside lib/data.js.checkTimeFormat(), or creating a time formatter with format ${xScaleTimeFormat}, heres the message ${e.message}`);
  }
};

export const formatTime = ({
  data,
  timeProperty = '',
  xScaleTimeFormat = '',
}) => {
  if (!timeProperty || !xScaleTimeFormat || appFuncs._.isEmpty(data)) {
    appFuncs.logError({
      data: [ data, timeProperty, xScaleTimeFormat ],
      loc: __filename,
      msg: 'timeProperty and xScaleTimeFormat must be valid variables in data.formatTime(), returning data without transformations',
    });

    return data;
  }
  const parseTime = time.parse({ format: xScaleTimeFormat });
  const transformed = [];

  const timeFormatter = checkTimeFormat({ data, parseTime, timeProperty, xScaleTimeFormat });

  // parse time as is
  if (!timeFormatter)
    data.forEach((group) =>
      transformed.push({
        ...group,
        [timeProperty]: parseTime(group[timeProperty]),
      })
    );

  if (timeFormatter instanceof Error) {
    appFuncs.logError({
      data: [ data, timeProperty, xScaleTimeFormat, timeFormatter ],
      loc: __filename,
      msg: `${timeFormatter.message}, returning data without processing time, your chart is likely fucked up`,
    });

    return data;
  } else if (timeFormatter)
    // timeFormatter must be ready to use
    data.forEach((group) =>
      transformed.push({
        ...group,
        [timeProperty]: parseTime(timeFormatter(new Date(group[timeProperty]))),
      })
    );

  return transformed;
};

export const sumGroupedData = ({
  chartDataGroupBy,
  data,
  xValue,
  yValue,
}) => {
  const tempObj = {};
  data.forEach((el) => {
    if (tempObj[el[xValue]]) {
      tempObj[el[xValue]][yValue] += el[yValue];
      tempObj[el[xValue]].originalDataList.push(el);
    } else
      tempObj[el[xValue]] = {
        [chartDataGroupBy]: el[chartDataGroupBy],
        originalDataList: [el],
        [xValue]: el[xValue],
        [yValue]: el[yValue],
      };
  });

  return Object.values(tempObj).sort((a, b) => a.date - b.date);
};
// groups an array of objects by some property value
// returns an object where each property is an array of objects with a matching property  value
// in separate function for VM compiler optimization
export const createDataValues = ({
  chartDataGroupBy,
  data,
}) => {
  let dataValues;
  try {
    dataValues = appFuncs._.groupBy(data, (d) => {
      if (typeof d[chartDataGroupBy] === 'undefined')
        throw new Error(`key ${chartDataGroupBy} does not exist in ${JSON.stringify(Object.keys(d))}. exiting lib/data.groupBy. here is the entire object ${d}`);

      return d[chartDataGroupBy];
    });
  } catch (e) {
    dataValues = e;
  }

  return dataValues;
};

export const groupBy = ({
  chartDataGroupBy = '',
  chartDataSumGroupBy = false,
  data,
  xScaleTime,
  xValue = '',
  yValue = '',
}) => {
  if (appFuncs._.isEmpty(data) || !chartDataGroupBy || !yValue) {
    appFuncs.logError({
      data: [ chartDataGroupBy, yValue, data ],
      loc: __filename,
      msg: 'data and chartDataGroupBy and yValue must be valid variables in data.groupBy(), returning data without transformations',
    });

    return data;
  }

  // group all values by chartDataGroupBy, each group is a line on a chart
  const dataValues = createDataValues({
    chartDataGroupBy,
    chartDataSumGroupBy,
    data,
    xValue,
    yValue,
  });

  if (appFuncs._.isEmpty(dataValues) || dataValues instanceof Error) {
    appFuncs.logError({
      data: [ data, dataValues ],
      loc: __filename,
      msg: `could not create groups for data on key ${chartDataGroupBy}, returning data`,
    });

    return data;
  }

  const
    minDate = appFuncs._.minBy(data, xValue)[xValue],
    maxDate = appFuncs._.maxBy(data, xValue)[xValue],
    diff = Math.abs(maxDate - minDate),
    totalDays = diff / (1000*60*60*24);

  const format = totalDays > 3600
    // 1985
    ? '%Y'
    : totalDays > 360
    // Dec 1985
    ? '%b%Y'
    : totalDays > 27
    // 12/12/85
    ? '%m%d%y'
    : totalDays > 6
    // 12/12/85
    ? '%m%d%y'
    : totalDays > 3
    // 23 06/31/85
    ? '%H%m%d%y'
    // 2356 06/31/85
    : '%H%M%m%d%y';

  // create object with values and keys for each lineValues group
  const dataGroups = Object.keys(dataValues).map((key) => {
    let transformed = [];

    // transform time if required
    if (xScaleTime && format)
      transformed = formatTime({
        data: dataValues[key],
        timeProperty: xValue,
        xScaleTimeFormat: format,
      });

    if (transformed.length && chartDataSumGroupBy && yValue && xValue)
      transformed = sumGroupedData({ chartDataGroupBy, data: transformed, xValue, yValue });

    return {
      id: key,
      values: transformed.length
        ? transformed
        : dataValues[key],
    };
  });

  return dataGroups;
};

export const format = ({
  chartDataGroupBy = '',
  chartDataSumGroupBy = false,
  chartType = '',
  data,
  xScaleTime = false,
  xScaleTimeFormat = '',
  xValue = '',
  yValue = '',
}) => {
  if (appFuncs._.isEmpty(data)) return data;

  switch (chartType.toLowerCase()) {
    case 'pack': {
      return data;
    }
    case 'forcedirectedgraph': {
      /*
      const
        links = data.links,
        nodeByGroup = data.nodes.map((node) => node[chartDataGroupBy]),
        nodes = data.nodes;

      links.forEach((link) => {
        const
          source = nodeByGroup.find((node) => { if (node) return node[link.source[chartDataGroupBy]]}),
          target = nodeByGroup.find((node) => { if (node) return node[link.target[chartDataGroupBy]]});

        links.push(
          { source, target },
          { source: intermediate, target },
        );
      });

      return { links, nodeByGroup, nodes };
      */
      return data;
    }
    case 'table':
    case 'line':
    case 'scatterplot':
    case 'bar':
    case 'pie':
    default: {
      // Group data and return
      if (chartDataGroupBy)
        return groupBy({
          chartDataGroupBy,
          chartDataSumGroupBy,
          data,
          xScaleTime,
          xScaleTimeFormat,
          xValue,
          yValue,
        });

      // transform time and return
      if (xScaleTime && xScaleTimeFormat)
        return formatTime({
          data,
          timeProperty: xValue,
          xScaleTimeFormat,
        });

      return data;
    }
  }
};
