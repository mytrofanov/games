import * as React from "react";
// @ts-ignore
import s from './style/Analytics.module.css'
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router";
import {Context} from "../index.js";
// @ts-ignore
import {fetchDataFromServer} from "../http/analiticsAPI.ts";
import Typography from "@material-ui/core/Typography";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
// @ts-ignore
import text from '../components/img/small_text_cr.jpg'

const Analytics: React.FC<any> = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()
    let [textFromServer, setTextFromServer] = useState([])
    let [loading, setLoading] = useState(false);
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
        let cleanupFunction = false;
        if (!user.isAuth) {
            history(LOGIN_ROUTE)
        }
        if (user.isAuth && !cleanupFunction) {
            setLoading(true)
            fetchDataFromServer().then(data => {
                    setTextFromServer(data)
                    console.log('data is fetched')
                    setLoading(false)
                }
            )
        }

        return () => {
            cleanupFunction = true
        };
    }, [user.isAuth])

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
    const breakpoints = {
        values: {
            xs: 400,
            sm: 570, // Phone
            md: 768, // Tablet/Laptop
            lg: 1500, // Desktop
            xl: 2000,
            xxl: 2600,
            xxxl: 4000,
        }
    };
    const theme = createTheme({
        breakpoints,
        typography: {
            h5: {
                fontSize: "1rem",
                [`@media screen and (max-width: ${breakpoints.values.xxxl}px)`]: {
                    fontSize: '2.5rem'
                },
                [`@media screen and (max-width: ${breakpoints.values.xxl}px)`]: {
                    fontSize: '2rem'
                },
                [`@media screen and (max-width: ${breakpoints.values.xl}px)`]: {
                    fontSize: '1.5rem'
                },
                [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
                    fontSize: '1.2rem'
                },
                [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
                    fontSize: '1.3rem'
                },
                [`@media screen and (max-width: ${breakpoints.values.sm}px)`]: {
                    fontSize: '1rem'
                },
                [`@media screen and (max-width: ${breakpoints.values.xs}px)`]: {
                    fontSize: '1rem'
                }
            }}
    });
    let renderRow = (item,index) => {
        return (
            <ListItem key={index} component="div">
                <ListItemButton>
                <ThemeProvider theme={theme}>
                <Typography  variant="h5">Item: {index+1}  text: {item}</Typography>
                </ThemeProvider>
                </ListItemButton>
            </ListItem>
        )
    }
    return (

        <div className={s.InfoBlock}>
            {user.isAuth &&
                <>
                    <div className={s.graphBlock}>
                        <Line options={options} data={data}/>
                    </div>
                    <div className={s.listBlock}>
                        {loading &&  <img
                            style={{
                                width: '70%',
                                marginLeft: '10%'
                            }}
                            alt={'analytics data'}
                            src={text}
                        /> }
                         {textFromServer.map((item,index) => renderRow(item,index))}
                    </div>
                </>
            }

        </div>
    );
});

export default Analytics;