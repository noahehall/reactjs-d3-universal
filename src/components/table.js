import Chart from 'reactjs-d3-universal';
import React, { PropTypes } from 'react';
import s from '../styles/exampleComponent.style';

const data = [{
  "totalPayingCustomers": 18902,
  "type": "paying",
  "date": "2016/01/28"
}, {
  "totalPayingCustomers": 11670,
  "type": "paying",
  "date": "2016/02/24"
}, {
  "totalPayingCustomers": 52383,
  "type": "paying",
  "date": "2016/03/16"
}, {
  "totalPayingCustomers": 64626,
  "type": "paying",
  "date": "2016/04/13"
}, {
  "totalPayingCustomers": 31241,
  "type": "paying",
  "date": "2016/05/11"
}, {
  "totalPayingCustomers": 36795,
  "type": "paying",
  "date": "2016/06/29"
}, {
  "totalPayingCustomers": 39544,
  "type": "paying",
  "date": "2016/07/04"
}, {
  "totalPayingCustomers": 52873,
  "type": "paying",
  "date": "2016/08/27"
}, {
  "totalPayingCustomers": 66310,
  "type": "paying",
  "date": "2016/09/31"
}, {
  "totalPayingCustomers": 20408,
  "type": "paying",
  "date": "2016/10/18"
}, {
  "totalPayingCustomers": 72197,
  "type": "paying",
  "date": "2016/11/21"
}, {
  "totalPayingCustomers": 24523,
  "type": "paying",
  "date": "2016/12/09"
},{
  "totalPayingCustomers": 18102,
  "type": "high",
  "date": "2016/01/28"
}, {
  "totalPayingCustomers": 11270,
  "type": "high",
  "date": "2016/02/24"
}, {
  "totalPayingCustomers": 59383,
  "type": "high",
  "date": "2016/03/16"
}, {
  "totalPayingCustomers": 41626,
  "type": "high",
  "date": "2016/04/13"
}, {
  "totalPayingCustomers": 3141,
  "type": "high",
  "date": "2016/05/11"
}, {
  "totalPayingCustomers": 60795,
  "type": "high",
  "date": "2016/06/29"
}, {
  "totalPayingCustomers": 32544,
  "type": "high",
  "date": "2016/07/04"
}, {
  "totalPayingCustomers": 22873,
  "type": "high",
  "date": "2016/08/27"
}, {
  "totalPayingCustomers": 46310,
  "type": "high",
  "date": "2016/09/31"
}, {
  "totalPayingCustomers": 10408,
  "type": "payhighing",
  "date": "2016/10/18"
}, {
  "totalPayingCustomers": 92197,
  "type": "high",
  "date": "2016/11/21"
}, {
  "totalPayingCustomers": 4523,
  "type": "high",
  "date": "2016/12/09"
}];

const propTypes = {
  children: PropTypes.element,
};

function Table({ children }) {
  return (
    <div style={{ maxWidth: '600px' }}>
      <Chart
        chartType='table'
        data={data}
        filterable={true}
        id='paying-customers-table'
        sortable={true}
      />
      {children || null}
    </div>
  );
}

Table.propTypes = propTypes;

export default Table;
