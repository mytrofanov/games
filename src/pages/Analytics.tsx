import * as React from "react";
// @ts-ignore
import s from './style/Analytics.module.css'
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';
// @ts-ignore
import VirtualizedList from "../components/List.tsx";
// @ts-ignore
import AlertDialogSlide from "../components/modals/AlertDialogSlide.tsx";
import {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router";
import {Context} from "../index.js";

const Analytics: React.FC<any> = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

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

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Max not included, min included
    }

    useEffect(() => {
        if (!user.isAuth) {
            history(LOGIN_ROUTE)
        }

    }, [])

    const labels: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    let data = {
        labels,
        datasets: [
            {
                label: 'Stocks',
                data: labels.map(() => getRandomInt(-50, 300)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }


    return (

        <div className={s.InfoBlock}>
            {user.isAuth &&
                <>
                    <div className={s.graphBlock}>
                        <Line options={options} data={data}/>
                    </div>
                    <div className={s.listBlock}>
                        <VirtualizedList/>
                    </div>
                </>
            }

        </div>
    );
});

export default Analytics;