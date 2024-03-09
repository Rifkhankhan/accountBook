import React, { useEffect, useRef, useState } from 'react'
import {
	Chart,
	LineElement,
	CategoryScale,
	LinearScale, //y
	PointElement,
	Tooltip,
	Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend
)

const LineChart = ({ expenses, receipts, requestList }) => {
	// Get today's date
	const today = new Date()

	// Initialize an array to store the labels
	const labels = []

	// Loop to generate labels for the past 7 days
	for (let i = 6; i >= 0; i--) {
		// Calculate the date for each day
		const date = new Date(today)
		date.setDate(today.getDate() - i)

		// Format the date as 'YYYY-MM-DD'
		const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

		// Push the formatted date into the labels array
		labels.push(formattedDate)
	}

	// for expense

	const [amountByDate, setAmountByDate] = useState({})
	const [receiptByDate, setReceiptByDate] = useState({})
	const [listByDate, setListByDate] = useState({})

	useEffect(() => {
		const expensesamounts = {}
		expenses.forEach(expense => {
			if (!expensesamounts[expense.date]) {
				expensesamounts[expense.date] = 0
			}
			expensesamounts[expense.date] += expense.amount
		})
		setAmountByDate(expensesamounts)

		const receiptsamounts = {}
		receipts.forEach(expense => {
			if (!receiptsamounts[expense.date]) {
				receiptsamounts[expense.date] = 0
			}
			receiptsamounts[expense.date] += expense.amount
		})
		setReceiptByDate(receiptsamounts)

		const balances = {}
		requestList.forEach(expense => {
			if (!balances[expense.date]) {
				balances[expense.date] = 0
			}
			balances[expense.date] += expense.amount
		})
		setListByDate(balances)
	}, [expenses, receipts, requestList])

	// Convert object to array of values
	const amounts = Object.values(amountByDate)
	const receiptsLists = Object.values(receiptByDate)
	const balanceList = Object.values(listByDate)

	const data = {
		labels: [...labels],
		datasets: [
			{
				label: 'Income',
				data: receiptsLists,
				backgroundColor: 'yellow',
				borderColor: 'aqua',
				pointBorderColor: 'yellow'
			},
			{
				label: 'Expense',
				data: amounts,
				backgroundColor: 'red',
				borderColor: 'yellow',
				pointBorderColor: 'red'
			},
			{
				label: 'Balance',
				data: balanceList,
				backgroundColor: 'orange',
				borderColor: 'white',
				pointBorderColor: 'orange'
			}
		]
	}

	const options = {
		plugins: {
			legend: true
		},
		scale: {
			y: {}
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
		height: 300 // Set your desired height]
	}
	return (
		<div className="">
			<Line data={data} options={options} />
		</div>
	)
}

export default LineChart
