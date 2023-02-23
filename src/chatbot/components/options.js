import React from "react";
import Button from '@mui/material/Button';
import { Typography, Grid, Tab } from "@material-ui/core";


import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';


export default function Optons(props){
    const listIcon =  [<RestaurantMenuIcon/>, <TableRestaurantIcon/>, <MenuBookIcon/>]
    const options = [
        {
            text: "dine in", 
            handler: props.actionProvider.handleDineIn, 
            id: 0
        },
        {
            text: "booking table", 
            handler: props.actionProvider.handleDineIn, 
            id: 1 
        },
        {
            text: "get menu", 
            handler: props.actionProvider.handleDineIn, 
            id: 2
        }
    ]
    return (
        <div className="options-container ml-8">
            <Grid container >
            { options.map((option, index)=> (  
                <Grid item xs={12} style={{marginBottom: "1vh"}}>
                    <Button startIcon={listIcon[index]} variant="outlined" key={option.id} onClick={option.handler} className="text-black option-button rounded border-slate-300">
                        <Typography variant="body1">{option.text}</Typography>
                    </Button>
                </Grid> 
                ))}
            </Grid>
        </div>
    )

}