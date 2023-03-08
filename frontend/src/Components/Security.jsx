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
import { FormLabel, InputAdornment } from "@mui/material";


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
      <Link color="inherit" href="https://www.annauniv.edu/">
        Anna University
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Security() {
  // const queryParameters = new URLSearchParams(window.location.search);
  // const building = queryParameters.get("building");
  // const floor = queryParameters.get("floor");

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [isError, setIsError] = useState(false);
  const [Type, setType] = useState("");
  const [Feedback, setFeedback] = useState("");
  const [SecurityAvailability, setSecurityAvailability] = useState(0);
  const [SecurityMisbehaving, setSecurityMisbehaving] = useState(0);
  const [SecurityDrunk, setSecurityDrunk] = useState(0);
  const [SecurityAlertness, setSecurityAlertness] = useState(5);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {
      Name,
      Phone,
      Type,
      Feedback,
      SecurityAvailability,
      SecurityAlertness,
      SecurityDrunk,
      SecurityMisbehaving,
      
    };
    console.log(data);
    const res= await fetch("http://localhost:5000/feedback",{
      method:'POST',
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then(()=>{
      console.log(res);
      window.location='/thankyou'
    }).catch(error=>{
      console.log(error);
      window.location='/thankyou'
    })
  
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
          <Avatar variant="square" sx={{ m: 1, bgcolor: "powderblue", width:"80px", height:"80px" }} alt="Anna Univ Logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYIT9DIpbpoNHlF_sikxAN_ujCgKAYm_Iy97Ufwdmg8s0hMN1YtYgR0mI0XuhOsGFwR5o&usqp=CAU">
            
            </Avatar>
          <Typography component="h1" variant="h5">
            Security Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                    e.target.value.length > 10 ? setIsError(true):setIsError(false)
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                       +91
                       </InputAdornment>,
                  }}
                />
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

              <Grid item xs={12}>

                <FormLabel>Is the Security available ?</FormLabel>
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

                <FormLabel>Is the Security Misbehaving</FormLabel>
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
                <FormLabel>Is the Security Drunk</FormLabel>
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
                  Rate the Securitys' Alertness
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
