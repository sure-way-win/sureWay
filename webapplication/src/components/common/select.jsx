import React from "react";

const Select = ({ name, label, value, options, onChange, error, ...rest }) => {
  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{label}</label> */}
      <select
        name={name}
        id={name}
        {...rest}
        onChange={onChange}
        value={value}
        className="form-control"
      >
        <option value="" disabled selected>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.vehicleID} value={option.vehicleID}>
            {option.vehicleID}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
