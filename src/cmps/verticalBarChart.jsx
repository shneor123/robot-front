import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { utilService } from '../services/util.service';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const VerticalBarChart = ({ title, labels, labelsData, hoverTitle, color, isPercentage }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: title,
                font: { size: 27 },
                color: "rgb(33,33,33)",
            },
            datalabels: {
                display: true,
                color: 'white',
                formatter: (num) => utilService.numberWithCommas(num, 0),
                anchor: "end",
                offset: 10,
                align: "start"
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "rgb(33,33,33)",
                },
            },
            x: {
                ticks: {
                    color: "rgb(33,33,33)",
                }
            },
        },
    }

    if (isPercentage) {
        options.scales.y.max = 100
        options.plugins.datalabels.formatter = (num) => utilService.numberWithCommas(num, 0) + '%'
    }

    const data = {
        labels,
        datasets: [
            {
                label: hoverTitle,
                data: labelsData,
                backgroundColor: color,
            },
        ],
    }

    return <section className='vertical-bar-chart'>
        <div className='chart-container'>
            <Bar options={options} data={data} plugins={[ChartDataLabels]} />
        </div>
    </section>
}