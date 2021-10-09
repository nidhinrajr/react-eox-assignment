import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import axios from 'axios';
import { translateData } from './translateData.js';
import products from './products.json';

const DetailComponent = (props) => {
  const dataItem = props.dataItem.cities;
  const detailsArray = [];
  for (const key in dataItem) {
    detailsArray.push({
      city: key.toString(),
      zip: dataItem[key].toString(),
    });
  }
  return (
    <section>
      <Grid
        data={detailsArray}
        style={{
          height: '400px',
        }}
      >
        <Column field="city" title="City" width="300px" />
        <Column field="zip" title="Zip" width="300px" />
      </Grid>
    </section>
  );
};

const App = () => {
  const [stateData, setStatedata] = useState([]);

  useEffect(() => {
    axios('https://api.npoint.io/2c71ded6354de7428006')
      .then((res) => {
        const resData = translateData(res.data);
        console.log(resData);
        setStatedata(resData);
      })
      .catch((error) => console.log(error));
  }, []);

  const expandChange = (event) => {
    let newData = stateData.map((item) => {
      if (item.name === event.dataItem.name) {
        item.expanded = !event.dataItem.expanded;
      }

      return item;
    });
    setStatedata(newData);
  };

  return stateData.length === 0 ? (
    <span>Loading..</span>
  ) : (
    <Grid
      data={stateData}
      detail={DetailComponent}
      style={{
        height: '400px',
      }}
      expandField="expanded"
      onExpandChange={expandChange}
    >
      <Column field="name" title="State" width="300px" />
    </Grid>
  );
};

ReactDOM.render(<App />, document.querySelector('my-app'));
