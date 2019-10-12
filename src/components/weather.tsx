import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import { Button, Grid, Table } from 'semantic-ui-react';
import * as lib from '../library';
import DraggableTableRow from '../library/Draggable';

export default function Weather() {

  const [weatherArray, setWeatherArray] = useState<any>({});
  const stations = [
    { name: 'Minneapolis', station: 'KMSP' },
    { name: 'Eau Claire', station: 'KEAU' },
    { name: 'Las Vegas', station: 'KLAS' },
    { name: 'Chicago', station: 'KORD' },
    { name: 'Los Angeles', station: 'KLAX' },
    { name: 'San Diego', station: 'KSAN' }
  ];
  const tempWeatherArray: any[] = [];

  function buildWeatherObj (station: string, data: any) {
    return {
      City: stations.filter(item => item.station === station)[0].name,
      Timestamp: data.timestamp,
      Conditions: data.textDescription,
      Temperature: lib.fTemp(data.temperature.value),
      Dewpoint: lib.fTemp(data.dewpoint.value),
      Pressure: lib.pressure(data.barometricPressure.value)
    };
  }

  const [items, setItems] = useState<any>();

  function reposition (newPos: any, oldPos: any): any { // a = new, b = old
    const newArray = _.cloneDeep(weatherArray);
    const element = newArray[oldPos];
    newArray.splice(oldPos, 1);
    newArray.splice(newPos, 0, element);
    setWeatherArray(newArray);
  }

  async function getWeather (station: string) {
    return await axios({
      method: 'GET',
      url: `https://api.weather.gov/stations/${station}/observations/latest`,
    }).then((res: any) => {
      tempWeatherArray.push(buildWeatherObj(station, res.data.properties));
      // console.log(tempWeatherArray);
      // const weather = res.data.properties;
      // console.log(weather);
      // setWeather(weather);
    });
  }

  useEffect(() => {

    (async () => {
      const fetchArray = stations.map(async item => {
        await getWeather(item.station);
      });
      await Promise.all(fetchArray);
      setWeatherArray(tempWeatherArray);
    })();

    // !Object.keys(weather).length && getWeather(locations[0]);
  }, []);

  return (
    <>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Temp</Table.HeaderCell>
            <Table.HeaderCell>Dewpoint</Table.HeaderCell>
            <Table.HeaderCell>Pressure</Table.HeaderCell>
            <Table.HeaderCell>Wind</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!!weatherArray.length && 
            weatherArray.map((item: any, i: number) => {
              return (
                <DraggableTableRow key={item.City} i={i} action={reposition}>
                  <Table.Cell>{item.City}</Table.Cell>
                  <Table.Cell>{item.Temperature}&deg;</Table.Cell>
                  <Table.Cell>{item.Dewpoint}&deg;</Table.Cell>
                  <Table.Cell>{item.Pressure !== '0.00' && `${item.Pressure + ' in'}`}</Table.Cell>
                  <Table.Cell></Table.Cell>
                </DraggableTableRow>
              );
            })
          }
        </Table.Body>
      </Table>

    </>
  );

}