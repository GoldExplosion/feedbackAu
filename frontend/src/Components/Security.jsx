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
import { Divider, FormLabel, InputAdornment } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

import React, { useState } from "react";

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

export default function Security() {
  const queryParameters = new URLSearchParams(window.location.search);
  const gate = queryParameters.get("gate");
  const booth = queryParameters.get("booth");

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [isError, setIsError] = useState(false);
  const [Type, setType] = useState("");
  const [Feedback, setFeedback] = useState("");
  const [SecurityAvailability, setSecurityAvailability] = useState(0);
  const [SecurityAvailabilityReason, setSecurityAvailabilityReason] = useState(0);
  const [SecurityMisbehaving, setSecurityMisbehaving] = useState(0);
  const [SecurityDrunk, setSecurityDrunk] = useState(0);
  const [SecurityAlertness, setSecurityAlertness] = useState(5);
  const [open, setOpen] = useState(false);

  // const [Sleeping, setSleeping] = useState(0);
  // const [Talking, setTalking] = useState(0);
  // const [Chatting, setChatting] = useState(0);
  // const [Other, setOther] = useState(0);
  var PhoneReg = /^[1-9][0-9]{9}$/;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = async (event) => {
    if(isError === false){
    event.preventDefault();
    const data = {
      Name,
      Phone,
      Type,
      gate,
      booth,
      Feedback,
      SecurityAvailability,
      SecurityAlertness,
      SecurityDrunk,
      SecurityMisbehaving,
      SecurityAvailabilityReason
    };
    console.log(data);
    const res = await fetch("http://localhost:5000/feedback", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
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
          <Avatar variant="square" sx={{ m: 1, bgcolor: "powderblue", width: "80px", height: "80px" }} alt="Anna Univ Logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYIT9DIpbpoNHlF_sikxAN_ujCgKAYm_Iy97Ufwdmg8s0hMN1YtYgR0mI0XuhOsGFwR5o&usqp=CAU">

          </Avatar>
          <Typography component="h1" variant="h5">
            Campus Security Form
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
                  value={Phone}
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
                <br/><br/>
                <Divider variant="fullWidth" sx={{ borderBottomWidth: 2 }} style={{backgroundColor:"black"}}/><br />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e)=>{
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

              <Grid item xs={12}>

                <FormLabel>Is the Security Personnel available ?</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setSecurityAvailability(e.target.value);
                  }}
                >
                  <FormControlLabel
                    id="Yes"
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    id="No"
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
                <br />

                {
                  SecurityAvailability === "Yes" || SecurityAvailability=== 0 ? <></> :
                    <>
                      <FormLabel>Reason</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e) => {
                          setSecurityAvailabilityReason(e.target.value);
                        }}
                      >
                        <FormControlLabel
                          id="Sleeping"
                          value="Sleeping"
                          control={<Radio />}
                          label="Sleeping"
                          
                        />
                        <FormControlLabel
                          id="Talking on Phone"
                          value="Talking on Phone"
                          control={<Radio />}
                          label="Talking on Phone"
                          
                        />
                        <FormControlLabel
                          id="Chatting with others"
                          value="Chatting with others"
                          control={<Radio />}
                          label="Chatting with others"
                          
                        />
                        <FormControlLabel
                          id="Other"
                          value="Other"
                          control={<Radio />}
                          label="Other"
                          
                        />
                      </RadioGroup>
                      <br></br>
                    </>
                }

                <FormLabel>Is the Security Personnel Misbehaving ?</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setSecurityMisbehaving(e.target.value);
                  }}
                >
                  <FormControlLabel
                    id="Yes"
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    id="No"
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
                <br />
                <FormLabel>Is the Security Personnel Under the Influence of Alchohol ? </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setSecurityDrunk(e.target.value);
                  }}
                >
                  <FormControlLabel
                    id="Yes"
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    id="No"
                    value="No"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
                <br />

              </Grid>
              <Typography variant="h6" component="h1">
                Rate the Security Personnel Alertness
              </Typography>
              <Slider
                onChange={(e) => {
                  setSecurityAlertness(e.target.value);
                }}
                valueLabelDisplay="auto"
                defaultValue={5}
                step={1}
                marks
                min={0}
                max={10}
              />




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