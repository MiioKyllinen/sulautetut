import React from 'react'
import Victory, { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, VictoryLine, VictoryTheme, VictoryGroup } from 'victory'
import ReactDOM from 'react-dom'


function Weather() {


  const days = [
    {new: Date(2020, 1, 1) },
    { new: Date(2020, 2, 1) },
    { new: Date(2020, 3, 1) },
    { new: Date(2020, 4, 1) },
    { new: Date(2020, 5, 1) },
    { new: Date(2020, 6, 1) },
    { new: Date(2020, 7, 1) },
    { new: Date(2020, 8, 1) },
    { new: Date(2020, 9, 1) },
    { new: Date(2020, 10, 1) }
  ]

  const Temperature = [
    { x: new Date(2020, 1, 1), y: 10 },
    { x: new Date(2020, 2, 1), y: -6 },
    { x: new Date(2020, 3, 1), y: 13 },
    { x: new Date(2020, 4, 1), y: 15 },
    { x: new Date(2020, 5, 1), y: 30 },
    { x: new Date(2020, 6, 1), y: -10 },
    { x: new Date(2020, 7, 1), y: 3 },
    { x: new Date(2020, 8, 1), y: 10 },
    { x: new Date(2020, 9, 1), y: 5 },
  ]

  const Humidity = [
    { x: new Date(2020, 1, 1), y: 10 },
    { x: new Date(2020, 2, 1), y: 6 },
    { x: new Date(2020, 3, 1), y: 13 },
    { x: new Date(2020, 4, 1), y: 5 },
    { x: new Date(2020, 5, 1), y: 15 },
    { x: new Date(2020, 6, 1), y: 45 },
    { x: new Date(2020, 7, 1), y: 35 },
    { x: new Date(2020, 8, 1), y: 20 },
    { x: new Date(2020, 9, 1), y: 80 },


  ]


  return (

    

    <VictoryChart
      theme={VictoryTheme.material}
      height={500} width={800}
      domainPadding={{ x: 30, y: 5 }}
    >

     {/* <VictoryAxis
        scale="time"
        standalone={false}
        tickValues={days}
        tickCount= {10}
           tickFormat={
          (x) => {
            return 'Day'
             if (x.getFullYear() === 2000) {
              return x.getFullYear();
            }
            if (x.getFullYear() % 5 === 0) {
              return x.getFullYear().toString().slice(2);
            } 
          }
        } 

      /> */}

      < VictoryAxis dependentAxis
        domain={[-20, 30]}
        offsetX={50}
        orientation="left"
        standalone={false}
        tickValues={[30,20,10,0,-10,-20]}
        style={{ticklabels: {fill: "#FFFFFF" }}}
        
      />

      <VictoryLine
        style={{
          data: { stroke: "#f01616" },
          parent: { border: "1px solid #ccc" }
        }}
        domain={{
          x: [new Date(2020, 1, 1), new Date(2020, 10, 1)],
          y: [-20, 30]
        }}
        scale={{ x: "time", y: "linear" }}
        standalone={false}
        data={Temperature}
        interpolation="natural"
      />
      <VictoryLine // Keskilinja kummallekkin data linjalle
        data={[
          { x: new Date(2020, 1, 1,), y: 0 },
          { x: new Date(2020, 20, 1,), y: 0 }
        ]}
        domain={{
          x: [new Date(2020, 1, 1), new Date(2020, 10, 1)],
        }}
        scale={{ x: "time", y: "linear" }}
        tickValues={[new Date(2020, 1, 1), new Date(2020, 10, 1)]}
        standalone={false}
        style={{ data: { fill: "#999999" } }}

      />

      <VictoryAxis dependentAxis //oikea data puolisko
        domain={[0, 100]}
        orientation="right"
        offsetX={50}
        tickValues={[100,80,60,40,20,0]}
        standalone={false}
        style={{tickLabels: { fill: "#32CD32" }}}
        />

      <VictoryBar //seuraa oikeaa data puoliskoa
        style={{ data: { fill: "#458ca8" } }}
        data={Humidity}
        domain={{
          x: [new Date(2020, 1, 1), new Date(2020, 10, 1)],
          y: [0, 100]
        }}
        standalone={false}
      />




    </VictoryChart>
  )

}



export default Weather 