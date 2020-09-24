import React, { useState } from 'react'
import Victory, { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, VictoryLine, VictoryTheme, VictoryGroup, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import ReactDOM from 'react-dom'


function Weather() {

  const today = new Date();
  const date = today.getDate() + "." + parseInt(today.getMonth() + 1) + "." + today.getFullYear();

  const initWeather = [];
  const [weather,setWeather] = useState(initWeather);

  fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50')
    .then(response => response.json())
    .then(json => setWeather([...json]))

  let humtempkey = 1;
  let chartTempData = [];
  let chartHumData = [];
  const rows = () => Weather.slice(0, 25).reverse().map(temphum => {
    const measurementDate = temphum.PublishedAt.split('T')[0].split('-')[2] + '.' + temphum.PublishedAt.split('T')[0].split('-')[1] + '.' + temphum.PublishedAt.split('T')[0].split('-')[0];
    const measurementTime = temphum.PublishedAt.split('T')[1].split(':')[0] + ':' + temphum.PublishedAt.split('T')[1].split(':')[1];
    chartTempData.push ({ x: String(measurementTime), y: parseInt(temphum.Temp) });
    chartHumData.push({ experiment: String(measurementTime), actual: parseInt(temphum.Hum), label: String(temphum.Hum.Split('.')[0])+"%"});
    return <div key={humtempkey++}><b>Pvm: </b>{measurementDate}, <b>klo: </b> {measurementDate} <b>ilmankosteus: </b> {temphum.Hum.split('.')[0]}% <b>Lämpötila:</b> {temphum.Temp.split('.')[0]}°C</div>
  }) // etsii koko ajan tietoa ja sitten konstruktoi sen luettavampaan muotoon.

  
  const Temperature = chartTempData /* [ // lämpötilan data table
    { x: new Date(2020, 1, 1), y: 4 },
    { x: new Date(2020, 1, 2), y: 10 },
    { x: new Date(2020, 1, 3), y: 14 },
    { x: new Date(2020, 1, 4), y: 17 },
    { x: new Date(2020, 1, 5), y: 10 },
    { x: new Date(2020, 1, 6), y: 15 },
    { x: new Date(2020, 1, 7), y: 26 },
    { x: new Date(2020, 1, 8), y: 20 },
    { x: new Date(2020, 1, 9), y: 25 },
    { x: new Date(2020, 1, 10), y: 20 },
  ] */

  const Humidity = chartHumData  /* [  // kosteuden data table
    { x: new Date(2020, 1, 1), y: 10 },
    { x: new Date(2020, 1, 2), y: 27 },
    { x: new Date(2020, 1, 3), y: 16 },
    { x: new Date(2020, 1, 4), y: 6 },
    { x: new Date(2020, 1, 5), y: 12 },
    { x: new Date(2020, 1, 6), y: 20 },
    { x: new Date(2020, 1, 7), y: 60 },
    { x: new Date(2020, 1, 8), y: 76 },
    { x: new Date(2020, 1, 9), y: 52 },
    { x: new Date(2020, 1, 10), y: 80 },
  ]     */

return (
  <div>
    <VictoryChart
      containerComponent={<VictoryVoronoiContainer />}
      theme={VictoryTheme.material}
      height={300} width={600}
      domainPadding={{ x: 0, y: 0 }}
      style={{
        parent: {
          border: "0px solid #ccc"

        },
        background: {
          fill: "#00000"
        }
      }}

    >

      {/* <VictoryAxis dependentAxis
              domain={[-20, 30]}
              offsetX={50}
              orientation="left"
              standalone={false}
              tickValues={[30, 20, 10, 0, -10, -20]}
              style={{ ticklabels: { fill: "#7fe5f0" } }} />
          */}

      <VictoryLine // lisää lämpötila viivan
        style={{
          data: { stroke: "#1d99bb" }, // määrittää linjan värin
          parent: { border: "1000px solid #ccc" } 
        }}
        domain={{
          x: [new Date(2020, 1, 1), new Date(2020, 1, 10)], // kertoo mitä aikajanaa seuraa
          y: [-20, 30] // kertoo minimin ja maksimin y akselille
        }}
        scale={{ x: "time", y: "linear" }} 
        standalone={false}
        data={Temperature}
        interpolation="monotoneX" />                   
      <VictoryScatter // lisää pienet pallot joista näkee tarkemmin lämpotilan
        style={{
          data: { fill: "#d2491b" }, labels: { fill: "tomato" }
        }}
        size={({ active }) => active ? 5 : 3} // pallojen koko
        labels={({ datum }) => ` ${datum.y}°C`} //pallojen teksti
        labelComponent={<VictoryTooltip />}   //lisää tooltipin pieniin palloihin 
        data={Temperature}
      />
    </VictoryChart>

    <VictoryChart // ilman kosteuden chart
      theme={VictoryTheme.material} // chartin teema voi olla custom teema 
      height={400} width={700} // kuinka suuri chart on
      domainPadding={{ x: 0, y: 0 }}

    >
      <VictoryBar //ilman kosteuden bar chart
        cornerRadius={{ top: 5 }} // tekee barin kulmista pyöreitä
        style={{ data: { fill: "#0067ce", width: 25 } }} // kertoo värin ja barin paksuuden
        labels={({ datum }) => ` ${datum.y}%`} // lisää % joka tulee barin päälle joka kertoo sitten kosteuden tarkasti
        labelComponent={
          <VictoryLabel //tämä päättää missä kohtaa bar charttia teksti tulee näkyviin
            dx={1.2}
            dy={0.5}
            textAnchor="start"
            VerticalAnchor="middle"
            style={[
              { fill: "#02ffff " }
            ]}
          />
        }
        alignment="start"
        data={Humidity}
        domain={{
          x: [new Date(2020, 1, 1), new Date(2020, 1, 10)],
          y: [0, 100]
        }}
        scale={{ x: "time", y: "linear" }}
        standalone={false}
      />
    </VictoryChart>
  </div>
)

}

export default Weather
