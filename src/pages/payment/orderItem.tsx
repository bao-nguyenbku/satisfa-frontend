import { Button, Typography, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import styles from './styles.module.scss'

type Props = {};
const sampleImage = "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600"
export default function OrderItem (props: Props) {
    return (
        <div className={styles.orderItem}>
            <Box style={{width: "90%"}} className="mx-auto">
                <Grid container className="bg-item-background" justifyContent="space-between">
                    <Grid item xs={2} padding={0}>
                        <Image
                            src={sampleImage}
                            alt="Cake"
                            width={100}
                            height={100}
                        />
                    </Grid>
                    <Grid item xs={7} className="mx-0 my-auto">
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h5' style={{color: "white"}}>American food</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h6' style={{color: "#CA8A04"}}>680.000 VND</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} className="mx-0 my-auto">
                        <Typography style={{fontSize: "40px", color: "white"}}>3</Typography>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
  };