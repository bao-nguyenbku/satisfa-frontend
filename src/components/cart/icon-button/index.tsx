import React, { useState } from 'react';
import { useAppSelector } from '@/hooks';
import { Badge, Popover, IconButton } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CartDetail from '../cart-detail';
import styles from './styles.module.scss';



const CartIconButton = () => {
    const cartItems = useAppSelector(state => state.cart)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    return(
        <>
            <Popover
            open={open}
            anchorEl={anchorEl}
            className={styles.popover}
            onClose={handleClose}
            style={{
              background: 'rgba(0,0,0,0.75)'

            }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
                <CartDetail />
            </Popover>
            <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            badgeContent={
                <div className='text-white bg-yellow-600 w-4 h-4 p-1 rounded-xl flex items-center'>
                    {cartItems.totalQty}
                </div>
            }
            >
                <IconButton onClick={handleClick}>
                    <LocalMallOutlinedIcon className='text-white'/>
                </IconButton>
            </Badge>
        </>
        
    )
}

export default CartIconButton;