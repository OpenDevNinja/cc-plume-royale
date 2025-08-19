import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
)

export const BarChart = ({ data, title }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: !!title,
                text: title
            }
        }
    }

    return <Bar options={options} data={data} />
}

export const PieChart = ({ data, title }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: !!title,
                text: title
            }
        }
    }

    return <Pie options={options} data={data} />
}