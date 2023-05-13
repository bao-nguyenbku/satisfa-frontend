import React from 'react';
import DiningOutlinedIcon from '@mui/icons-material/DiningOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import { formatCurrency } from '@/utils';


type Props = {
  data: number | string;
  name: string;
};


const StatCard = (props: Props) => {
  const { data, name } = props;
  const getStylesByName = (name: string) => {
    switch (name) {
      case 'orders': {
        return {
          bg: 'bg-gradient-to-tr from-teal-800 to-teal-500',
          title: 'Orders',
          icon: <AttachMoneyIcon fontSize="large" />,
        };
      }
      case 'spent': {
        return {
          bg: 'bg-gradient-to-tr from-violet-900 to-violet-600',
          title: 'Spent',
          icon: <DiningOutlinedIcon fontSize="large" />,
        };
      }
      case 'reservations': {
        return {
          bg: 'bg-gradient-to-tr from-sky-800 to-sky-500',
          title: 'Reservations',
          icon: <TableRestaurantIcon fontSize="large" />,
        };
      }
      case 'join': {
        return {
          bg: 'bg-gradient-to-tr from-orange-600 to-orange-400',
          title: 'Join In',
          icon: <HourglassEmptyRoundedIcon fontSize="large" />,
        };
      }
    }
  };
  
  return (
    <div
      className={`card-props flex flex-col gap-4 cursor-pointer ${
        '' || getStylesByName(name)?.bg
      } rounded-none min-w-[350px] w-80 p-4 text-white`}>
      <h1 className="font-bold text-3xl">{getStylesByName(name)?.title}</h1>
      <div className="flex gap-4 items-center">
        {getStylesByName(name)?.icon}
        <p className="font-bold text-xl">{name == 'spent' ? formatCurrency(data as number) : data}</p>
      </div>
    </div>
  );
};

export default StatCard;
