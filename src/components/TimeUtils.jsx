import React from "react";
import { Input } from "reactstrap";

export const YearPicker = (props) => {
  let years = [];
  for (let i = 2008; i > 1930; i--) {
    years.push(i);
  }
  return (
    <Input
      className="mr-2"
      required={props.required}
      type="select"
      name={props.elemName}
      onChange={props.handleChange}
    >
      <option disabled selected value>
        År
      </option>
      {years.map((year) => {
        return (
          <option value={year} key={year}>
            {year}
          </option>
        );
      })}
    </Input>
  );
};

export const MonthPicker = (props) => {
  let months = [];
  months.push("Januari");
  months.push("Februari");
  months.push("Mars");
  months.push("April");
  months.push("Maj");
  months.push("Juni");
  months.push("Juli");
  months.push("Augusti");
  months.push("September");
  months.push("Oktober");
  months.push("November");
  months.push("December");

  return (
    <Input
      className="ml-2 mr-2"
      required={props.required}
      type="select"
      name={props.elemName}
      onChange={props.handleChange}
    >
      <option disabled selected value>
        Månad
      </option>
      {months.map((month, i) => {
        return (
          <option value={i + 1} key={i}>
            {month}
          </option>
        );
      })}
    </Input>
  );
};

export const DayPicker = (props) => {
  let days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return (
    <Input
      className="ml-2"
      required={props.required}
      type="select"
      name={props.elemName}
      onChange={props.handleChange}
    >
      <option disabled selected value>
        Dag
      </option>
      {days.map((day) => {
        return (
          <option value={day} key={day}>
            {day}
          </option>
        );
      })}
    </Input>
  );
};

export const TimePicker = (props) => {
  const choises = [...Array(60).keys()];

  return (
    <Input
      className="mr-2"
      required={true}
      type="select"
      name={props.elemName}
      onChange={props.handleChange}
    >
      <option disabled selected value>
        {props.elemName}
      </option>
      {choises.map((choise) => {
        return (
          <option value={choise} key={choise}>
            {choise}
          </option>
        );
      })}
    </Input>
  );
};

export const secToHMS = (value) => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds

  return hours + "h " + minutes + "m " + seconds + "s"; // Return is HH : MM : SS
};
