import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const card = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                Anna University Feedback Form
            </Typography>
            <Typography variant="h5" component="div">
                Thank you
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                for taking your time to fill the form
            </Typography>
            <Typography variant="body2">
                Form Submitted Successfully
            </Typography>
        </CardContent>
        <CardActions>
            {/* <Button size="small">Learn More</Button> */}
        </CardActions>
    </React.Fragment>
);


export default function Thankyou() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            style={{ minHeight: '100vh' }}
        >
            <Card variant="elevation"  style={{backgroundColor:'#CAD5E2'}} >{card}</Card>
        </Grid>
    );
}