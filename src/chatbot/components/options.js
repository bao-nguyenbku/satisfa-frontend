import React from "react";
import Button from '@mui/material/Button';
import { Typography } from "@material-ui/core";

export default function Optons(props){
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
    const buttonMarkup = options.map((option)=> (
        <Button variant="contained" key={option.id} onClick={option.handler} className="option-button bg-green-600 rounded-xl">
            <Typography variant="body1 ">{option.text}</Typography>
        </Button>
    ))
    return <div className="options-container">{buttonMarkup}</div>;
}