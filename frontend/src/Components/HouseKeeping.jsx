import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import { Divider, InputAdornment } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import logo from '../Assets/logo.png'

import React, { useState } from "react";
import Toilet from "./Toilet";
const nodeUrl = `http://localhost:5000/feedback`;
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://estateoffice.annauniv.edu/estateoffice/">
        Estate Office Anna University
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function HouseKeeping() {
  const queryParameters = new URLSearchParams(window.location.search);
  const building = queryParameters.get("building");
  const floor = queryParameters.get("floor");
  const toilet = queryParameters.get("toilet");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState(0);
  const [isError, setIsError] = useState(false);

  const [Type, setType] = useState("");
  const [Feedback, setFeedback] = useState("");
  const [Cleanliness, setCleanliness] = useState(5);
  const [WashedRegularly, setWashedRegularly] = useState(0);
  const [WaterSupply, setWaterSupply] = useState(0);
  const [FlushWorking, setFlushWorking] = useState(0);
  const [WaterLeakage, setWaterLeakage] = useState(0);
  const [open, setOpen] = useState(false);

  var PhoneReg = /^[1-9][0-9]{9}$/;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isError === false){
    const data = {
      Name,
      Phone,
      Type,
      Feedback,
      Cleanliness,
      WashedRegularly,
      WaterLeakage,
      WaterSupply,
      FlushWorking,
      building,
      floor,
      toilet
    };
    console.log(data);
    const res = await fetch(nodeUrl, {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then(() => {
      console.log(res);
      window.location = '/thankyou'
    }).catch(error => {
      console.log(error);
      window.location = '/error'
    })

  }
  else{
    setOpen(true);
  }
};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar variant="square" sx={{ m: 1, bgcolor: "powderblue", width: "80px", height: "80px" }} alt="Anna Univ Logo" src={logo}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Toilet Feedback Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <p>Confidential</p>
                <Divider variant="fullWidth" sx={{ borderBottomWidth: 2 }} style={{backgroundColor:"black"}}/><br />
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  autoFocus
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="tel"
                  error={isError}
                  id="Phone"
                  label="Phone"
                  name="Phone"
                  autoComplete="phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                    PhoneReg.test(e.target.value) ? setIsError(false) : setIsError(true)
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      +91
                    </InputAdornment>,
                  }}
                />
                <br/> <br />
                <Divider variant="fullWidth" sx={{ borderBottomWidth: 2 }} style={{backgroundColor:"black"}}/><br />

              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <FormControlLabel
                    id="student"
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    id="teacher"
                    value="staff"
                    control={<Radio />}
                    label="Staff"
                  />
                  <FormControlLabel
                    id="guest"
                    value="guest"
                    control={<Radio />}
                    label="Guest"
                  />
                </RadioGroup>
              </Grid>
              <br />

              
                <Toilet
                  setWashedRegularly={setWashedRegularly}
                  setWaterSupply={setWaterSupply}
                  setFlushWorking={setFlushWorking}
                  setWaterLeakage={setWaterLeakage}
                />
              
               

              <Grid item xs={12}>
                <Typography variant="h6" component="h1">
                  Rate our Overall Cleanliness
                </Typography>
                <Slider
                  onChange={(e) => {
                    setCleanliness(e.target.value);
                  }}
                  valueLabelDisplay="auto"
                  defaultValue={5}
                  step={1}
                  marks
                  min={0}
                  max={10}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-textarea"
                  label="Suggestions"
                  placeholder="Suggestions"
                  multiline
                  fullWidth
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            {
            isError === false ? <></> :
            <Snackbar
            // anchorOrigin={{vertical,  horizontal}}
            open={open}
        autoHideDuration={1000}
        message="Invalid Phone No."
        onClose={handleClose}
        // key={'bottom center'}
      />
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
