import React from 'react';
import { Typography, Link } from '@mui/material';
import { BottomNavigation } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const Footer = () => {
    const theme = useTheme();

    return (
        <BottomNavigation 
        sx={{
            backgroundColor: theme.palette.background.paper,
        }}
        
        >
            <Typography variant="body2" color="textSecondary" align="center">
                {'Made with ❤️ by '}
                <Link color="inherit" href="https://github.com/burakack">
                    Burak Açıker
                </Link>
            </Typography>
        </BottomNavigation>
    );
};

export default Footer;