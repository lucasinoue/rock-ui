import React, { useEffect, useState } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import TemplateInputDatepicker from './template-input-datepicker';
import TemplateHeaderDatepicker from './template-header-datepicker';
import ContainerDatepicker from './container-datepicker';
import { StyledBaseReactDatePicker } from './styled';

export enum DatePickerMode {
  year,
  month,
  day,
}

const Datepicker = React.forwardRef<
  ReactDatePicker | null,
  ReactDatePickerProps
>((props, ref) => {
  const {
    showYearPicker = false,
    shouldCloseOnSelect = false,
    showMonthYearPicker = false,
  } = props;

  const modeLocked = showMonthYearPicker || showYearPicker;

  const [mode, setMode] = useState<DatePickerMode>(DatePickerMode.day);
  const [date, setDate] = useState(props.selected);

  useEffect(() => {
    if (!showYearPicker && !showMonthYearPicker) {
      setMode(DatePickerMode.day);
    }

    if (showMonthYearPicker) {
      setMode(DatePickerMode.month);
    }

    if (showYearPicker) {
      setMode(DatePickerMode.year);
    }
  }, [showMonthYearPicker, showYearPicker]);

  const onSelect = (newDate: Date) => {
    setDate(newDate);
    if (!modeLocked) {
      toPrevMode();
    }
  };

  const toPrevMode = () => {
    if (mode === DatePickerMode.day) return;
    if (mode === DatePickerMode.month) setMode(DatePickerMode.day);
    if (mode === DatePickerMode.year) setMode(DatePickerMode.month);
  };

  const closeOnSelect =
    shouldCloseOnSelect || modeLocked || mode === DatePickerMode.day;

  return (
    <StyledBaseReactDatePicker>
      <ReactDatePicker
        {...props}
        ref={ref}
        customInput={<TemplateInputDatepicker />}
        tabIndex={1}
        fixedHeight
        onSelect={onSelect}
        selected={date}
        shouldCloseOnSelect={closeOnSelect}
        renderCustomHeader={props => (
          <TemplateHeaderDatepicker
            {...props}
            mode={mode}
            onChangeMode={setMode}
          />
        )}
        showMonthYearPicker={mode === DatePickerMode.month}
        showYearPicker={mode === DatePickerMode.year}
        clearButtonTitle="Clear"
        calendarContainer={props => (
          <ContainerDatepicker {...props} setDate={setDate} mode={mode} />
        )}
      />
    </StyledBaseReactDatePicker>
  );
});

export { Datepicker, ReactDatePickerProps };
