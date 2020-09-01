import React from 'react'
import Victory, { VictoryChart, VictoryBar, VictoryAxis } from 'victory'

function Weather() {
    return (
        <React.Fragment>
            <VictoryChart
            domainPadding={{x: 45, t:10}}
                width={500}
                height={300}>
            <VictoryBar
                data={[

                    {experiment: '1.1.', actual: 100},
                    {experiment: '1.2.', actual: 5},
                    {experiment: '1.3.', actual: 1}


                ]} 
                style={{data:
                        {   stroke : "green", strokeWidth: 5}

                }}
                x='experiment'                
                y='actual'
                />  
                <VictoryAxis
              label="experiment"
                style={{
        axisLabel: { padding: 30 }
      }}
    />
    <VictoryAxis dependentAxis
      label="Kosteuden %"
      style={{
        axisLabel: { padding: 40 }
      }}
    />
        


            </VictoryChart>

        </React.Fragment>
    )
}

export default Weather;
