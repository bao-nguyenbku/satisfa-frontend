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
          bg: 'bg-teal-800 border-teal-800 border text-white',
          title: 'Orders',
          icon: <AttachMoneyIcon fontSize="medium" />,
        };
      }
      case 'spent': {
        return {
          bg: 'bg-gradient-to-tr from-violet-900 to-violet-600',
          title: 'Spent',
          icon: <DiningOutlinedIcon fontSize="medium" />,
        };
      }
      case 'reservations': {
        return {
          bg: 'bg-sky-800 border border-sky-800 text-white',
          title: 'Reservations',
          icon: <TableRestaurantIcon fontSize="medium" />,
        };
      }
      case 'join': {
        return {
          bg: 'bg-orange-800 border border-orange-800 text-white',
          title: 'Join In',
          icon: <HourglassEmptyRoundedIcon fontSize="medium" />,
        };
      }
    }
  };
  
  return (
    <div
      className={`card-props flex flex-col gap-4 ${
        '' || getStylesByName(name)?.bg
      } rounded-none min-w-[200px] flex-1 p-4`}>
      <h1 className="font-bold text-xl">{getStylesByName(name)?.title}</h1>
      <div className="flex gap-4 items-center">
        {getStylesByName(name)?.icon}
        <p className="font-bold text-xl">{name == 'spent' ? formatCurrency(data as number) : data}</p>
      </div>
    </div>
  );
};

export default StatCard;
