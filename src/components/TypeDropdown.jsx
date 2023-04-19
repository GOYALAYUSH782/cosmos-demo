import React from "react";
import PropTypes from "prop-types";
import { MenuItem, Select } from "@mui/material";
import { BOOLEAN, INTEGER, OBJECT, STRING } from "../constants";

const TypeDropdown = ({ value, handleChange }) => {
  return (
    <div className="">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Type"
        onChange={handleChange}
      >
        <MenuItem value={OBJECT}>Object</MenuItem>
        <MenuItem value={BOOLEAN}>Boolean</MenuItem>
        <MenuItem value={INTEGER}>Integer</MenuItem>
        <MenuItem value={STRING}>String</MenuItem>
      </Select>
    </div>
  );
};

TypeDropdown.propTypes = {};

export default TypeDropdown;
