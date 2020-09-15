import React from 'react'
import Victory, { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, VictoryLine, VictoryTheme, VictoryGroup, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import ReactDOM from 'react-dom'


function Weather() {


  const days = [
    { new: Date(2020, 1, 1) },
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
  ]

  const Humidity = [
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
  ]

  const CustomBackground = props => {
    return (
      <image
        href={"https://cdn.wallpapersafari.com/0/10/L2YR4V.jpg"}
        {...props}
      />
    );
  };





return (
  <div>
    <VictoryChart
      containerComponent={<VictoryVoronoiContainer />}
      backgroundComponent={<CustomBackground />}
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

      <VictoryLine
        style={{
          data: { stroke: "#1d99bb" },
          parent: { border: "1000px solid #ccc" }
        }}
        domain={{
          x: [new Date(2020, 1, 1), new Date(2020, 1, 10)],
          y: [-20, 30]
        }}
        scale={{ x: "time", y: "linear" }}
        standalone={false}
        data={Temperature}
        interpolation="monotoneX" />
      <VictoryScatter
        style={{
          data: { fill: "#d2491b" }, labels: { fill: "tomato" }
        }}
        size={({ active }) => active ? 5 : 3}
        labels={({ datum }) => ` ${datum.y}°C`}
        labelComponent={<VictoryTooltip />}
        data={Temperature}
      />
    </VictoryChart>

    <VictoryChart
      theme={VictoryTheme.material}
      height={400} width={700}
      domainPadding={{ x: 0, y: 0 }}

    >
      <VictoryBar
        cornerRadius={{ top: 5 }}
        style={{ data: { fill: "#0067ce", width: 25 } }}
        labels={({ datum }) => ` ${datum.y}%`}
        labelComponent={
          <VictoryLabel
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
