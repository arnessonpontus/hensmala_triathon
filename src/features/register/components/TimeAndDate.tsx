import React, { useMemo } from "react";
import { Input } from "reactstrap";

interface Props {
  required: boolean,
  elemName: string,
  kidsMode?: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const YearPicker = (props: Props) => {
  const ageLimit = 16;
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const minAdultYear = currentYear - ageLimit;

  const years = useMemo(() => {
    const result: number[] = [];

    if (props.kidsMode) {
      for (let i = 0; i < ageLimit; i++) {
        result.push(i);
      }
    } else {
      for (let i = minAdultYear; i >= 1940; i--) {
        result.push(i);
      }
    }

    return result;
  }, [props.kidsMode, currentYear, minAdultYear]);

  return (
    <Input
      className="mr-2"
      required={props.required}
      type="select"
      name={props.elemName}
      onChange={props.handleChange}
      defaultValue={""}
    >
      <option disabled value="">
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

export const MonthPicker = (props: Props) => {
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
      defaultValue={""}
    >
      <option disabled value="">
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

export const DayPicker = (props: Props) => {
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
      defaultValue={""}
    >
      <option disabled value="">
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

export const TimePicker = (props: Props) => {
  const choises = [...Array(60).keys()];

  return (
    <Input
      className="mr-2"
      required={true}
      type="select"
      name={props.elemName}
      onChange={props.handleChange}
      defaultValue={""}
    >
      <option disabled value="">
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
