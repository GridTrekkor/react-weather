import React from 'react';
// import './App.css';
import Weather from './components/weather';

export default function App () {
  return (
    <Weather/>
  );
}


// <div>
//     <div>Weather component</div>
//     {!!Object.keys(weather).length && 
//         <>
//         <div>Temperature: {lib.fTemp(weather.temperature.value)}</div>
//         <div>Dewpoint: {lib.fTemp(weather.dewpoint.value)}</div>
//         <div>Pressure: {lib.pressure(weather.barometricPressure.value)}</div>
//         </>
//     }

// </div>