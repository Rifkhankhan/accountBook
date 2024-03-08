import React, { useEffect, useRef } from 'react'
import styles from './PieChart.module.css'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
Chart.register(ArcElement, Tooltip, Legend)
const PieChart = ({ headDatas }) => {
	const data = {
		labels: [
			'Expenses',
			'Income',
			'Got Advance',
			'Paid Advance',
			'Got Loans',
			'Paid Loans'
		],
		datasets: [
			{
				data: [
					headDatas[0],
					headDatas[1],
					headDatas[2],
					headDatas[3],
					headDatas[4],
					headDatas[5]
				],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'red',
					'blue',
					'rgb(255, 205, 86)',
					'aqua'
				]
			}
		]
	}

	const options = {
		plugins: {
			legend: {
				position: 'right'
			}
		},
		layout: {
			padding: {
				left: 20,
				right: 20,
				top: 20,
				bottom: 20
			}
		},
		maintainAspectRatio: true, // This will allow you to set custom width and height
		responsive: true,
		width: 400, // Set your desired width
		height: 300, // Set your desired height]
		minWidth: 400,
		minHeight: 300,
		maxHeight: 450,
		maxWidth: 400
	}
	return (
		<div className="container">
			<Pie data={data} options={options} width={100} height={100}></Pie>
		</div>
	)
}

export default PieChart
