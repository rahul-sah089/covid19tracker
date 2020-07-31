import React, { useEffect, useState } from 'react'
/*import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';*/
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, Scatter
} from 'recharts';

function LineGraph({ casesType }) {
    const [data, setData] = useState({});
    const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120';

    const buildChartData2 = (data, casesType) => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data[casesType]) {
            if (data[casesType].hasOwnProperty(date)) {
                if (lastDataPoint) {
                    var obj = { name: date, y: data[casesType][date] - lastDataPoint };
                    chartData.push(obj);
                }
                lastDataPoint = data[casesType][date];
            }
        }
        return chartData;
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((response) => response.json())
                .then((data) => {
                    let chartData = buildChartData2(data, casesType);
                    setData(chartData);
                });
        };
        fetchData();
    }, [casesType])

    return (
        <div>
            {/*}
            <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="y" fill="#8884d8" />
            </BarChart>*/}
            <ComposedChart width={500} height={400} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="y" barSize={20} fill="#413ea0" />
                {/* <Scatter dataKey="cnt" fill="red" /> */}
            </ComposedChart>
        </div>
    )
}

export default LineGraph
