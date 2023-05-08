import React, { useEffect } from 'react';

import { Grid, Typography, Button } from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { useGetAllTableQuery } from '@/services/table';
import { useCreateReservationMutation } from '@/services/reservation';
import { useAppSelector } from '@/hooks';
import { ReservationType, TableStatus } from '@/types';
import { toast } from 'react-toastify';

// type Table = {};

/*
    We use this function to show a list of available tables
    then booking a table
*/

export default function FreeTables(props: any) {
  const { data: tables } = useGetAllTableQuery();
  const freeTables = tables?.filter(
    (table) => table.status == TableStatus.FREE,
  );
  const [createReservation, response] = useCreateReservationMutation();
  const data = useAppSelector((state) => state.reservation);
  const reserveData: ReservationType = {
    tableId: '63fb319e765710c5bae252f0',
    date: new Date().toString(),
    note: 'tran chau duong den',
    numberOfGuests: 0,
    customerId: '63d8a95cf26dede7b8ee5030',
  };

  const handleBookingTable = (id: string) => {
    reserveData.date = data.date;
    reserveData.numberOfGuests = data.numberOfGuests;
    reserveData.tableId = id;
    createReservation(reserveData);
  };
  useEffect(() => {
    if (response && !response.isLoading && response.isSuccess) {
      toast.success('Thank you for using our service!');
    }
  }, [response]);

  return (
    <Grid container className="mt-8" alignContent={'center'}>
      <Grid item xs={12}>
        <Typography
          className="text-white"
          textAlign={'center'}
          variant="h6"
          fontWeight="bold">
          Available tables
        </Typography>
      </Grid>
      <Grid item xs={12} className="mt-4">
        <Grid
          rowGap={2}
          alignContent="center"
          container
          justifyContent={'space-around'}>
          {freeTables?.map((freeTable) => (
            <Grid item xs={5} key={freeTable.code}>
              <Button
                onClick={() => handleBookingTable(freeTable.id)}
                disabled={response.isLoading}
                variant="outlined"
                startIcon={<TableRestaurantIcon fontSize="large" />}
                className="text-black border-slate-300 hover:border-slate-600 bg-green-500 hover:bg-green-400">
                <Typography variant="h5" fontWeight={'bold'}>
                  #{freeTable.code}
                </Typography>
              </Button>
            </Grid>
          ))}
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
              onClick={props.actionProvider.handleContinueWithChatbot}
              disabled={response.isSuccess}
              className="mx-auto bg-teal-500 hover:bg-teal-400 text-white">
              <Typography variant="body2">Continue with chatbot!!</Typography>
            </Button>
          </Grid>
        </Grid>
      }
    </Grid>
  );
}
