import React from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid } from '@material-ui/core';

import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Optons(props: any) {
  const options = [
    {
      text: 'dine in',
      handler: props.actionProvider.handleDineIn,
      id: 0,
      icon: <RestaurantMenuIcon />,
    },
    {
      text: 'booking table',
      handler: props.actionProvider.handleDineIn,
      id: 1,
      icon: <TableRestaurantIcon />,
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
      <Grid container>
        {options.map((option) => (
          <Grid item xs={12} style={{ marginBottom: '1vh' }} key={option.id}>
            <Button
              startIcon={option.icon}
              variant="outlined"
              onClick={option.handler}
              className="text-black option-button rounded border-slate-300">
              <Typography variant="body1">{option.text}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
