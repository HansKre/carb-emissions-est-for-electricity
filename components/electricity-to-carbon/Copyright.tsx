import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
    return (
        <Typography id="copyright" variant="body2" color="textSecondary" align="center">
            {'Copyright 2021 © '}
            <Link color="inherit" href="https://github.com/HansKre">
                https://github.com/HansKre
            </Link>
        </Typography>
    );
}
