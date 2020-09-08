import React from 'react'
import Victory, { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, VictoryLine, VictoryTheme, VictoryGroup } from 'victory'
import ReactDOM from 'react-dom'

function Weather() {

  const days = [
    { x: "1.1" },
    { x: "2.1" },
    { x: "3.1" },
    { x: "4.1" },
    { x: "5.1" },
    { x: "6.1" },
  ]

  const Temperature = [
    { x: new Date(1, 1), y: 10 },
    { x: new Date(2, 1), y: -6 },
    { x: new Date(3, 1), y: 13 },
    { x: new Date(4, 1), y: 6 },
    { x: new Date(5, 1), y: 10 },
    { x: new Date(6, 1), y: -10 },
    { x: new Date(7, 1), y: 3 },
    { x: new Date(8, 1), y: 10 },
    { x: new Date(9, 1), y: 20 },
  ]

  const Humidity = [
    { x: new Date(1, 1), y: 10 },
    { x: new Date(2, 1), y: 6 },
    { x: new Date(3, 1), y: 13 },
    { x: new Date(4, 1), y: 5 },
    { x: new Date(5, 1), y: 15 },
    { x: new Date(6, 1), y: 45 },
    { x: new Date(7, 1), y: 35 },
    { x: new Date(8, 1), y: 20 },
    { x: new Date(9, 1), y: 80 },

  
  ]


  return (

    <VictoryChart
      theme={VictoryTheme.material}
      height={500} width={1000}
      domainPadding={{ x: 30, y: 5 }}
    >
    {/* <VictoryAxis
        scale="time"
        standalone={false}
        style={}
        tickValues={days}
        tickFormat={}
     /> */}


      <VictoryAxis dependentAxis //oikea data puolisko
        domain={[0, 100]}
        orientation="right"
        offsetX={50}
        standalone={false}
        style={{ fill: "#458ca8" }}
      />

      <VictoryBar //seuraa oikeaa data puoliskoa
        style={{ data: { fill: "#458ca8" } }}
        data={Humidity}
        domain={{
          x: [new Date(1, 1), new Date(10, 1)],
          y: [0, 100]
        }}
        scale={{x: "time", y: "linear"}}
        standalone={false}
      />

      <VictoryAxis dependentAxis
        domain={[-20, 30]}
        offsetX={50}
        orientation="left"
        standalone={false}
        style={{ fill: "#458ca8" }}
      />

      <VictoryLine
        style={{
          data: { stroke: "#f01616" },
          parent: { border: "1px solid #ccc" }
        }}
        domain={{
          x: [new Date(1, 1), new Date(10, 1)],
          y: [-20, 30]
        }}
        scale={{x: "time", y: "linear"}}
        standalone={false}
        data={Temperature}
        interpolation="monotoneX"
      />
      <VictoryLine // Keskilinja kummallekkin data linjalle
        data={[
          { x: new Date(1, 1), y: 0 },
          { x: new Date(10, 1), y: 0 }
        ]}
        domain={{
          x: [new Date(1, 1), new Date(10, 1)],
          y: [-20, 30]
        }}
        scale={{ x: "time", y: "linear" }}
        standalone={false}
        style={{ data: { fill: "#999999" } }}

      />


    </VictoryChart>
  )
}



export default Weather 