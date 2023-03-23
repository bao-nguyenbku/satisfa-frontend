import { Button, Grid, Typography, IconButton } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import bgImage from '../../assets/images/contact-background.jpg'
// type Props = {};

const FooterSection = () => {
  return (
    <div className={styles.footer} id="footer">
        <Image className={styles.bgImage}
            src={bgImage}
            alt="contact"
            fill
            sizes='100vh'
        />
        <Grid container alignItems={"center"} className={styles.footerContent}>
            <Grid item xs={12} className="mt-56">
                <Typography variant='h6' textAlign={"center"} className='text-primary-yellow text-8xl font-passions-conflict'>
                    Questions
                </Typography>
                <br/>
                <Typography variant='body1' textAlign={"center"} className='text-white text-6xl font-playfair-display'>
                    Get in touch
                </Typography>
            </Grid>
            <Grid item xs={12} className="mt-8">
                <Grid container justifyContent={"center"}>
                    <Button variant='outlined' className='h-16 w-52'>
                        <Typography className='text-white font-playfair-display text-2xl' variant='body1'>
                            Contact us
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} className="mt-32">
                <Grid container justifyContent={"center"} >
                    <Grid item xs={2} className='text-center'>
                        <Grid container>
                            <Grid item xs={4}>
                                <IconButton>
                                    <FacebookRoundedIcon className='text-white'/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton>
                                    <YouTubeIcon className='text-white'/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton>
                                    <InstagramIcon className='text-white'/>
                                </IconButton>
                            </Grid>
                        </Grid>                  
                    </Grid>
                    
                </Grid>
            </Grid>
            <Grid item xs={12} className="mt-8">
                <Grid container justifyContent={"center"}>
                    <Grid item xs={5}>
                        <Grid container justifyContent={"center"}>
                            <Grid item xs={3}>
                                <Link href="/">
                                    <Typography className='uppercase font-playfair-display text-center text-white text-2xl'>
                                        Home
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link href="/menu">
                                    <Typography className='uppercase font-playfair-display text-center text-white text-2xl'>
                                        Our menu
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link href="#about-us">
                                    <Typography className='uppercase font-playfair-display text-center text-white text-2xl'>
                                        About us
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={3} marginBottom={2}>
                                <Link href="#contact">
                                    <Typography className='uppercase font-playfair-display text-center text-white text-2xl'>
                                        Contact
                                    </Typography>
                                </Link>
                            </Grid>
                            <hr className='border-solid border-1 border-white w-full'/>     
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className="mt-8" >
                <Typography className='text-white font-playfair-display text-2xl text-center'>
                    ©2023 Satisfa
                </Typography>
            </Grid>
            
        </Grid>
        
    </div>
  );
};

export default FooterSection;
