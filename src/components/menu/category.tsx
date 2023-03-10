import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import FoodCard from './food-card';
// import styles from './styles.module.scss';

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

const datas = [
  {
    id: 1001,
    name: 'Pizza',
    include: [
      {
        id: 'MA1001',
        name: 'Shrred Chicken Salad',
        price: 4.14,
        image:
          'https://res.cloudinary.com/kogleo/image/upload/v1674442327/hamburger_m1l0gx.png',
      },
      {
        id: 'MA1002',
        name: 'Roasted chicken with chili salt',
        price: 5.24,
        image:
          'https://res.cloudinary.com/kogleo/image/upload/v1674442328/salad_qgebex.png',
        info: 'good',
      },
      {
        id: 'MA1001',
        name: 'Hamburger beef',
        price: 3.6,
        image:
          'https://res.cloudinary.com/kogleo/image/upload/v1674442327/fryfish_nst5ao.png',
        info: 'good',
      },
      {
        id: 'MA1002',
        name: 'Beef rice paper',
        price: 2.12,
        image:
          'https://res.cloudinary.com/kogleo/image/upload/v1674442327/fryfish_nst5ao.png',
        info: 'good',
      },
    ],
  },
  {
    id: 1002,
    name: 'HotPot',
    include: [
      {
        id: 'MA1001',
        name: 'IPizza',
        price: 20000,
        image:
          'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
        info: 'good',
      },
      {
        id: 'MA1002',
        name: 'BPizza',
        price: 20000,
        image:
          'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
        info: 'good',
      },
    ],
  },
  {
    id: 1003,
    name: 'Noodle',

    include: [
      {
        id: 'MA1001',
        name: 'IPizza',
        price: 20000,
        image:
          'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
        info: 'good',
      },
      {
        id: 'MA1002',
        name: 'CPizza',
        price: 20000,
        image:
          'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
        info: 'good',
      },
    ],
  },
  {
    id: 1004,
    name: 'Buffet',
    include: [
      {
        id: 'MA1001',
        name: 'IPizza',
        price: 20000,
        image:
          'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
        info: 'good',
      },
      {
        id: 'MA1002',
        name: 'DPizza',
        price: 20000,
        image:
          'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
        info: 'good',
      },
    ],
  },
];

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}>
//       {value === index && <Box sx={{ p: datas.length }}>{children}</Box>}
//     </div>
//   );
// }

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: 'white' } }}
          aria-label="basic tabs example"
          centered>
          {datas.map((data, index) => {
            return (
              <Tab
                key={index}
                style={{ color: 'white', fontFamily: 'Playfair Display' }}
                label={data.name}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
}
