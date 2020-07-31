import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import { Card, CardContent } from '@material-ui/core';
import Tables from './Tables';
import { sortData, prettyPrintStat } from './utils';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState();
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    //The code inside here will run once when the component loads and not again
    //async -> send a request to server, waut for the response m do somnehing with it
    const getContriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, //United Kingdom.USA, France
              value: country.countryInfo.iso2 //UK,USA,FR
            }));
          const sortedData = sortData(data);
          console.log("********countries data********");
          console.log(data);
          console.log("********countries data********");
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        })
    }
    getContriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === 'worldwide' ?
      'https://disease.sh/v3/covid-19/all'
      : 'https://disease.sh/v3/covid-19/countries/' + countryCode;

    await fetch(url).then(response => response.json()).then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      if (countryCode === 'worldwide') {
        setMapCenter([20.5937, 78.9629]);
        setMapZoom(3);
      } else {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(5);
      }
    });
  }

  return (
    <div className="App">
      <div className="app__main">
        <div className="app__left">
          <div className="app__header">
            <h1>COVID 19 Tracker</h1>
            <FormControl className="app__dropdown">
              <Select variant="outlined" value={country} onChange={onCountryChange}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {
                  countries.map(country => (
                    <MenuItem key={Math.random} value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="app__stats">
            {/* InforBoxes*/}
            {/* InforBoxes*/}
            {/* InforBoxes*/}
            <InfoBox onClick={e => setCasesType('cases')} title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
            <InfoBox onClick={e => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
            <InfoBox onClick={e => setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
          </div>
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom} />

        </div>
        <div className="app__right">
          <Card>
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Tables countries={tableData} />
              <h3>Worldwide new {casesType}</h3>
              <LineGraph casesType={casesType} />
              {/*<h3>Worldwide Deaths Cases</h3>
              <LineGraph casesType="deaths" />
              <h3>Worldwide Recovered Cases</h3>
              <LineGraph casesType="recovered" />*/}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
