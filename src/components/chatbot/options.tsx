import React from 'react';
import { Typography, Grid, Button } from '@mui/material';

import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import Link from 'next/link';


export default function Optons(props: any) {
  const options = [
    {
      text: 'booking table',
      handler: props.actionProvider.handleShowDatePicker,
      id: 0,
      icon: <TableRestaurantIcon />
    },
    {
      text: 'dine in',
      handler: props.actionProvider.handleDineIn,
      id: 1,
      icon: <RestaurantMenuIcon />,
    },
    {
      text: 'get menu',
      handler: props.actionProvider.handleDineIn,
      id: 2,
      icon: <MenuBookIcon />,
    },
  ];
  return (
    <div className="options-container ml-8">
      <Grid container columnGap={1}>
        {options.map((option) => (
            <Grid item xs={12} style={{ marginBottom: '1vh' }} key={option.id}>
              <Button
                startIcon={option.icon}
                variant="outlined"
                onClick={option.handler}
                className="text-black option-button rounded border-slate-300 hover:border-slate-600 hover:bg-white bg-white">
                <Typography variant="body1">{option.text}</Typography>
              </Button>
            </Grid>
        ))}
      </Grid>
    </div>
  );
}
