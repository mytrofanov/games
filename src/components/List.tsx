import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

function renderRow(props: ListChildComponentProps) {
    const {index, style} = props;
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

    return (

            <ListItem key={index} component="div">
                <ListItemButton>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h5">{`Lot ${index + 1}: Company index: ${index + 1 * Math.floor(Math.random() * 100)},   
                   Stock rate Buy: ${index + 1 * Math.floor(Math.random() * 1000)} Stock rate Sell:
                    ${index + 1 * Math.floor(Math.random() * 1000)} 
                    Description: Lorem Ipsum is simply text of the printing`}</Typography>
                    </ThemeProvider>
                </ListItemButton>
            </ListItem>

    );
}

export default function VirtualizedList() {


    return (
        <Box
            sx={{width: '100%', height: '95%', minWidth: 300, bgcolor: 'background.paper'}}
        >
            <FixedSizeList
                height={350}
                itemSize={44}
                itemCount={1000}
                overscanCount={7}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}
