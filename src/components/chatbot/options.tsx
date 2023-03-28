import React from 'react';
import Button from '@/components/common/button';

// import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Options(props: any) {
  const { actions } = props;
  const options = [
    {
      text: 'Booking table',
      handler: actions.handleReservation,
      id: 0,
      // icon: <TableRestaurantIcon />
    },
    // {
    //   text: 'Dine in',
    //   handler: props.actions.handleDineIn,
    //   id: 1,
    //   icon: <RestaurantMenuIcon />,
    // },
    {
      text: 'Order',
      handler: actions.navigateToMenu,
      id: 2,
    },
  ];
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outlined"
          onClick={option.handler}
          className="bg-white hover:bg-white/70 rounded-full border-none normal-case hover:border-none text-black">
          {option.text}
        </Button>
      ))}
    </div>
  );
}
