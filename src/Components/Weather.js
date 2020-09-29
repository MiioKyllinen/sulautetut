import React, { useState } from 'react'
import Victory, { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, VictoryLine, VictoryTheme, VictoryGroup, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import ReactDOM from 'react-dom'


function Weather() {

  function convertUTCDateToLocalDate(date) {
    new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    return date;
  }

  const initWeather = [];
  const [weather, setWeather] = useState(initWeather);

  fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50')
    .then(response => response.json())
    .then(json => setWeather([...json]))

  let humtempkey = 1;
  let chartDataTemp = [];
  let chartDataHum = [];
  weather.slice(0, 25).reverse().map(temphum => {
    const fixedTime = String(convertUTCDateToLocalDate(new Date(temphum.PublishedAt)));
    const measurementDate = temphum.PublishedAt.split('T')[0].split('-')[2] + "+" + temphum.PublishedAt.split('T')[0].split('-')[1] + "."
    const time = fixedTime.split(' ')[4].split(':')[0] + '.' + fixedTime.split(' ')[4].split(':')[1];
    chartDataTemp.push({ x: String(time), y: parseInt(temphum.Temp) });
    chartDataHum.push({ experiment: String(time), actual: parseInt(temphum.Hum.split('.')[0]), label: String(temphum.Hum.split('.')[0]) + "%" });
    return <div key={humtempkey++}>{measurementDate}<b>Pvm: </b>{time}, <b>klo: </b> {time} <b>ilmankosteus: </b> {temphum.Hum.split('.')[0]}% <b>Lämpötila:</b> {temphum.Temp.split('.')[0]}°C</div>
  }) // etsii koko ajan tietoa ja sitten konstruktoi sen luettavampaan muotoon.

  const WeatherBackground = {
    background: '#4f4f4f',
    color: '#4f4f4f'
  }


  const Temperature = chartDataTemp
  //lämpötila taulukko
  const Humidity = chartDataHum
  //kosteus taulukko
  return (
    <div>
      <body style={WeatherBackground}>
      <VictoryChart
        containerComponent={<VictoryVoronoiContainer />}
        height={300} width={1200}
        domainPadding={{ x: 0, y: 0 }}
        style={{
          parent: {
            border: "0px solid #FFFFFF"},
          background: { fill: "#8a8a8a"}}}>

        <VictoryLine // lisää lämpötila viivan
          style={{
            data: { stroke: "#FFFFFF", strokeWidth: 3 }, // määrittää linjan värin
            parent: { border: "1000px solid #FFFFFF" }}}
          domain={{}}
          scale={{ x: "time", y: "linear" }}
          standalone={false}
          data={Temperature}
          interpolation="linear" />
        <VictoryScatter // lisää pienet pallot joista näkee tarkemmin lämpotilan
          style={{
            data: { fill: "#A9A9A9" }, labels: { fill: "#696969" }
          }}
          size={({ active }) => active ? 5 : 3} // pallojen koko
          labels={({ datum }) => ` ${datum.y}°C`} //pallojen teksti
          labelComponent={<VictoryTooltip />}   //lisää tooltipin pieniin palloihin 
          data={Temperature}
        />
      </VictoryChart>

      <VictoryChart // ilman kosteuden chart
        theme={VictoryTheme.material} // chartin teema voi olla custom teema 
        height={450} width={1000} // kuinka suuri chart on
        domainPadding={{ x: 0, y: 0 }}
        style={{
          parent: {
            border: "0px solid #FFFFFF"},
          background: { fill: "#8a8a8a"}}}

      >
        <VictoryBar //ilman kosteuden bar chart
          cornerRadius={{ top: 5 }} // tekee barin kulmista pyöreitä
          style={{ data: { fill: "#001EFF", width: 25 } }} // kertoo värin ja barin paksuuden
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
            y: [0, 100]
          }}
          standalone={false}
        />
      </VictoryChart>
      </body>
    </div>
  )

}

export default Weather
