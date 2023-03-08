import React from "react";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { FormLabel } from "@mui/material";

function Toilet({
  setWashedRegularly,
  setWaterSupply,
  setFlushWorking,
  setWaterLekage,
}) {
  return (
    <>
      <Grid item xs={12}>
        <FormLabel>Washed Regularly</FormLabel>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => {
            setWashedRegularly(e.target.value);
          }}
        >
          <FormControlLabel
            id="Yes"
            value="Yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel id="No" value="No" control={<Radio />} label="No" />
        </RadioGroup>
        <br />
        <FormLabel>Flush Working</FormLabel>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => {
            setFlushWorking(e.target.value);
          }}
        >
          <FormControlLabel
            id="Yes"
            value="Yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel id="No" value="No" control={<Radio />} label="No" />
        </RadioGroup>
        <br />
        <FormLabel>Water Supply</FormLabel>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => {
            setWaterSupply(e.target.value);
          }}
        >
          <FormControlLabel
            id="Yes"
            value="Yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel id="No" value="No" control={<Radio />} label="No" />
        </RadioGroup>
        <br />
        <FormLabel>Water Lekage</FormLabel>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => {
            setWaterLekage(e.target.value);
          }}
        >
          <FormControlLabel
            id="Yes"
            value="Yes"
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel id="No" value="No" control={<Radio />} label="No" />
        </RadioGroup>
        <br />
      </Grid>
      <br />
    </>
  );
}

export default Toilet;
