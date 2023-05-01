import React from 'react';
import Button from '@/components/common/button';
// import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Options(props: any) {
  const { actions } = props;
  const options = [
    {
      text: 'I want to book table',
      handler: actions.handleReservation,
      id: 0,
    },
    {
      text: 'I want to see the menu',
      handler: actions.handleOrder,
      id: 2,
    },
  ];
  return (
    <div className="flex flex-col gap-2 justify-end items-end">
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outlined"
          onClick={option.handler}
          className="bg-white/20 hover:bg-white/30 p-3 text-white rounded-lg normal-case border-none hover:border-none">
          {option.text}
        </Button>
      ))}
    </div>
  );
}
