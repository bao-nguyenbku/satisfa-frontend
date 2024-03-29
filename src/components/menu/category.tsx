import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import { useGetAllCategoryServiceQuery } from '@/services/category';
import Loading from '../common/loading';
import { Product } from '@/types';
// import Grid from '@mui/material/Grid';
import FoodCard from './food-card';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  data: Product[];
}

type Props = {
  data: Product[];
};
function TabPanel(props: TabPanelProps) {
  const { data, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={`${
        value !== index
          ? 'hidden'
          : 'flex lg:gap-12 gap-4 flex-wrap w-full items-center justify-center'
      } mt-12`}>
      {data.map((item) => {
        return (
          <motion.div
            key={item.id}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{
              duration: Math.random() * 0.3 + 0.3,
            }}>
            <FoodCard data={item} />
          </motion.div>
        );
      })}
    </div>
  );
}


const getProductsByCategory = (products: Product[], category: string) => {
  return products.filter((item) => item.category === category);
};
export default function CategoryTab(props: Props) {
  const { data: products } = props;
  const [activeIndex, setAactiveIndex] = useState(0);
  const { data: categories, isLoading } = useGetAllCategoryServiceQuery();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setAactiveIndex(newValue);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="max-w-screen-1400 w-screen">
      <Tabs
        value={activeIndex}
        onChange={handleChange}
        TabIndicatorProps={{ sx: { display: 'none' } }}
        scrollButtons={false}
        className={styles.tabs}
        >
        {categories &&
          categories.map((category) => {
            return (
              <Tab
                key={category.id}
                label={category.name}
              />
            );
          })}
      </Tabs>
      {categories &&
        categories.map((category, index) => {
          return (
            <TabPanel
              key={category.id}
              value={activeIndex}
              index={index}
              data={getProductsByCategory(products, category.name)}
            />
          );
        })}
    </div>
  );
}
