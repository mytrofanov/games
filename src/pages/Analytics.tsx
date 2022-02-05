import * as React from "react";
import s from './style/Analytics.module.css'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import VirtualizedList from "../components/List.tsx";
import {useState} from "react";


const Analytics: React.FC<any> = () => {
    let [data, setData] = useState([])
    ChartJS.register(
        CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
    );
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Dynamics in January',
            },
        },
    };
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Max not included, min included
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    data = {
        labels,
        datasets: [
            {
                label: 'Stocks',
                data: labels.map(() => getRandomInt(-50, 300)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className={s.InfoBlock}>
            <div className={s.graphBlock}>
                <Line options={options} data={data}/>
            </div>
            <div className={s.listBlock}>
                <VirtualizedList/>
            </div>
        </div>
    );
};

export default Analytics;