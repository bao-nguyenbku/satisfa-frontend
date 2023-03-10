import React from 'react';
// import { useGetAllReservationQuery } from '@/service/reseravation';

import { Grid, Typography, Button } from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

// type Table = {};

/*
    We use this function to show a list of available tables
    then booking a table
*/

export default function CheckEmptyTable() {
  // console.log(props);
  // const [currentTables, setCurrentTables] = useState<Table[]>([]);
  // const [bookingStatus, setBookingStatus] = useState(false);
  // const { data, error, isLoading } = useGetAllReservationQuery();
  // useEffect(()=> {
  //     getTable(fromTime, toTime, customerAmount)
  //     .then(res => {

  //     })
  // }), [fromTime, toTime, customerAmount]

  return (
    <Grid container className="mt-8" alignContent={'center'}>
      <Grid item xs={12}>
        <Typography textAlign={'center'} variant="h6" fontWeight="bold">
          Available tables
        </Typography>
      </Grid>
      <Grid item xs={12} className="mt-4">
        <Grid
          rowGap={2}
          alignContent="center"
          container
          justifyContent={'space-around'}>
          <Grid item xs={5}>
            <Button
              variant="outlined"
              startIcon={<TableRestaurantIcon fontSize="large" />}
              className="text-black border-slate-300">
              <Typography variant="h5" fontWeight={'bold'}>
                #12
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="outlined"
              startIcon={<TableRestaurantIcon fontSize="large" />}
              className="text-black border-slate-300">
              <Typography variant="h5" fontWeight={'bold'}>
                #12
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="outlined"
              startIcon={<TableRestaurantIcon fontSize="large" />}
              className="text-black border-slate-300">
              <Typography variant="h5" fontWeight={'bold'}>
                #12
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="outlined"
              startIcon={<TableRestaurantIcon fontSize="large" />}
              className="text-black border-slate-300">
              <Typography variant="h5" fontWeight={'bold'}>
                #12
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {
        // this part need to be checked to display
        // if user booking we need to wait for the result to display
        // that means if the status is loading we will disable the button
        <Grid item xs={12} className="mt-4">
          <Grid container alignContent={'center'}>
            <Button
              variant="contained"
              disabled
              className="mx-auto bg-teal-600 text-white">
              <Typography variant="body2">Continue with chatbot!!</Typography>
            </Button>
          </Grid>
        </Grid>
      }
    </Grid>
  );
}
