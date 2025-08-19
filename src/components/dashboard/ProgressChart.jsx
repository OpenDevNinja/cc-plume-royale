// src/components/dashboard/ProgressChart.jsx
import { Bar } from 'react-chartjs-2'
import PropTypes from 'prop-types'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const ProgressChart = ({ subjects }) => {
    const data = {
        labels: subjects.map(subject => subject.name),
        datasets: [
            {
                label: 'Progression',
                data: subjects.map(subject => subject.value),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(219, 39, 119, 0.7)',
                    'rgba(22, 163, 74, 0.7)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(219, 39, 119)',
                    'rgb(22, 163, 74)'
                ],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Progression par matière'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }

    return <Bar data={data} options={options} />
}

ProgressChart.propTypes = {
    subjects: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })
    ).isRequired
}

export default ProgressChart