import React from 'react';
import Chart from 'react-apexcharts';

interface Props {
	chartsTemp: number[];
	chartsDate;
}

const Charts = ({ chartsTemp, chartsDate }: Props) => {
	const options = {
		series: [
			{
				name: 'Temp',
				data: chartsTemp
			}
		],
		options: {
			chart: {
				type: 'area',
				height: 'auto'
			}
		},
		xaxis: {
			categories: chartsDate,
			max: 5
		}
	};

	return (
		<div>
			<Chart
				options={options}
				series={options.series}
				type="area"
				height={350}></Chart>
		</div>
	);
};

export default Charts;
