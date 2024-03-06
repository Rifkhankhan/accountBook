import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

const WeeklyGraph = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Balance',
        data: [],
        borderColor: 'rgba(75,192,192,1)'
      },
      {
        label: 'Income',
        data: [],
        borderColor: 'rgba(255,99,132,1)'
      },
      {
        label: 'Expense',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)'
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
			// Replace this with your actual data fetching logic
      const dataForThePastWeek = [
				{ date: '2024-03-01', balance: 1000, income: 400, expense: 200 },
				{ date: '2024-03-02', balance: 1050, income: 200, expense: 150 },
				{ date: '2024-03-03', balance: 1100, income: 300, expense: 100 },
				{ date: '2024-03-04', balance: 1080, income: 150, expense: 200 },
				{ date: '2024-03-05', balance: 1070, income: 250, expense: 200 },
				{ date: '2024-03-06', balance: 1120, income: 350, expense: 200 },
				{ date: '2024-03-07', balance: 1150, income: 400, expense: 200 }
      ];

      const labels = [];
      const balanceData = [];
      const incomeData = [];
      const expenseData = [];

      dataForThePastWeek.forEach(data => {
        const date = new Date(data.date);
        labels.push(date);
        balanceData.push(data.balance);
        incomeData.push(data.income);
        expenseData.push(data.expense);
      });

      setChartData({
        ...chartData,
        labels: labels,
        datasets: [
					{ ...chartData.datasets[0], data: balanceData, xAxisID: 'time-axis' },
					{ ...chartData.datasets[1], data: incomeData, xAxisID: 'time-axis' },
					{ ...chartData.datasets[2], data: expenseData, xAxisID: 'time-axis' }
        ]
      });

			// Destroy previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.chartInstance.destroy();
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Past Week's Balance, Income, and Expense Graph</h2>
      <Line
        ref={chartRef}
        data={chartData}``
        options={{
          scales: {
            x: {
              id: 'time-axis',
              type: 'time',
              time: {
                unit: 'day'
              }
            }
          }
        }}
			/>
    </div>
  );
};

export default WeeklyGraph;
