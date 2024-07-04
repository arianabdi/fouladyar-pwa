import React, { useEffect, useState } from "react";
import Select from "react-select";
import {useTranslation} from "react-i18next";
import {DropdownFileUploader} from "../DropdownFileUploader/DropdownFileUploader";
import DatePicker from "react-datepicker";

import { MultiSelect } from "react-multi-select-component";
import TimePicker from 'react-times';
import { ChromePicker, SketchPicker } from "react-color";
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import { BsCheckLg } from "react-icons/bs";
import { makeStyles } from "@material-ui/styles";
// import DatePicker from "react-datepicker";
import fr from 'date-fns/locale/fr';
import { registerLocale } from 'react-datepicker';
import MultiDatePicker from "react-multi-date-picker";
registerLocale('fr', fr);

export const Field = ({
    id,
    ref,
    name,
    type,
    label,
    value,
    fileUploadType,
    fileUploadAcceptedFiles,
    multiple,
    accept,
    format,
    sources ,
    disabled,
    isRequired,
    isJalali,
    defaultValue,
    options,
    style,
    className,
    errors,
    validation,
    showSuccessValidation,
    placeholder,
    labelClassName,
    onChange,
    onBlur,
    onFocus,
    onCancel,
    ...props
}) => {
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    let invalid = {
        color: "#e85347",
        fontSize: "11px",
        fontStyle: "italic"
    }



  // useEffect(()=>{
  //   onChange(color)
  // },[color])


    function FieldLabel(){
        return(
            <>
                {
                    !label ? '' :
                        <div className={`form-label-group ${labelClassName || ''}`}>
                            <label style={{opacity: `${disabled ? '0.5': "1"}`}} >
                                {label} <span className="text-danger">{isRequired ? "*" : ''}</span>
                            </label>
                        </div>
                }
            </>
        )
    }


    if(type === "number"){
        return (
            <div className="form-group w-100 mb-1">
                <FieldLabel/>
                <div className="form-control-group">
                    <input
                        style={style}
                        key={name}
                        type={"text"}
                        pattern="[0-9]*"
                        placeholder={placeholder}
                        className={`form-control form-control-lg ${className}`}
                        ref={ref}
                        disabled={disabled}
                        name={name}
                        // defaultValue={value}
                        value={value}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}

                        onBlur={(e)=>{
                          if(onBlur)
                            onBlur(parseFloat(e.target.value))
                        }}
                        onFocus={(e)=>{
                          if(onFocus)
                            onFocus(parseFloat(e.target.value))
                        }}
                        onChange={(e)=> {onChange(parseFloat(e.target.value))}}
                    />

                    {
                        validation ? (!validation.isValid ? (<span className="invalid">{t(validation.message)}</span>) : (showSuccessValidation === true ? <span className="valid">{t(validation.message)}</span> : '')  ) : ''
                    }
                </div>
            </div>
        )
    }

    if(type === "text" || type === "password"){
        return (
            <div className="form-group w-100 mb-1">
                <FieldLabel/>
                <div className="form-control-group form-group">
                    <input
                        style={style}
                        key={name}
                        type={type}
                        className={`form-control form-control-lg ${className}`}
                        ref={ref}
                        name={name}
                        placeholder={placeholder}
                        disabled={disabled}
                        // defaultValue={value}
                        value={value}
                        onChange={(e)=> {
                          e.preventDefault()
                          onChange(e.target.value)
                        }}
                        onBlur={(e)=>{
                          if(onBlur)
                            onBlur(e.target.value)
                        }}
                        onFocus={(e)=>{
                          if(onFocus)
                            onFocus(e.target.value)
                        }}
                        // required={isRequired}
                    />
                    {
                        validation ? (!validation.isValid ? (<span className="invalid">{t(validation.message)}</span>) : (showSuccessValidation === true ? <span className="text-success">{t(validation.message)}</span> : '')  ) : ''
                    }
                </div>
            </div>
        )
    }

    if(type === 'checkbox'){
        return (
          <>
              <div className="form-group">
                <div className="d-flex flex-row justify-center align-start pe-3">
                  <div className={`col-sm-auto w-auto custom-checkbox ${value === true ? 'custom-checkbox-active' : ''}`} onClick={()=>{onChange(!value)}}>
                    <label htmlFor="myCheckbox"></label>
                  </div>
                  <div className="col checkbox-label" style={{paddingLeft: 0}}>
                    <label style={{opacity: `${disabled ? '0.5': "1"}`}} >
                      {label}
                    </label>
                  </div>
                </div>
              </div>
          </>

        )
    }
    if(type === 'switch'){
        return (
          <>
            <div className="custom-control custom-switch">
              <input
                style={style}
                key={name}
                name={name}
                className={`custom-control-input ${className}`}
                ref={ref}
                disabled={disabled}
                checked={value}
                onChange={(e) => {
                  onChange(!(value || false))
                }}
                type="checkbox"
                id="name"
              />
              <label className="custom-control-label" htmlFor="site-off">
                {label}
              </label>
            </div>
          </>

        )
    }

    if(type === 'date'){

        let date = value === '' || value === null ? null : new Date(value);

        return (
            <div className="form-group w-100 mb-1">
                <FieldLabel/>
                <div className="form-control-group datepicker">

                    <MultiDatePicker
                      placeholder={placeholder}
                      className={`form-control form-control-lg ${className}`}
                      value={date}

                      locale={"fr"}
                      disabled={disabled}
                      name={name}
                      id={id}
                      format={format}
                      onChange={event=> onChange(new Date(event?.toDate?.().toString()))}
                    />

                  {/*<DatePicker*/}
                  {/*  style={{zIndex: 10}}*/}
                  {/*  className={`form-control form-control-lg ${className}`}*/}
                  {/*  selected={date}*/}
                  {/*  locale={"fr"}*/}
                  {/*  showYearDropdown*/}
                  {/*  showMonthDropdown*/}
                  {/*  scrollableYearDropdown*/}
                  {/*  yearDropdownItemNumber={100} // Number of years shown in the dropdown*/}
                  {/*  // onSelect={handleDateSelect} //when day is clicked*/}
                  {/*  onChange={event=> onChange(event)} //only when value has changed*/}
                  {/*/>*/}

                </div>

            </div>
        )
    }

    if(type === 'time'){

        let date = value === '' || value === null ? null : new Date(value);


        return (
            <div className="form-group w-100 mb-1">
                <FieldLabel/>
                <div className="form-control-group datepicker">

                  <TimePicker
                    // showTimezone // show the timezone, default false
                    // focused // whether to show timepicker modal after rendered. default false
                    withoutIcon // whether to has time icon on button, default false
                    colorPalette="light" // main color, default "light"
                    time={value || "13:05"} // initial time, default current time
                    timeConfig={{
                      from: 0,
                      to: 24,
                      step: 15,
                      unit: 'minutes'
                    }}
                    // theme="material"
                    // or
                    theme="classic"
                    onTimeChange={onChange}
                    // timeMode="12" // use 24 or 12 hours mode, default 24
                    // timezone="America/New_York" // what timezone to use, detects the user's local timezone by d
                  />
                </div>

            </div>
        )
    }

    if(type === "file-upload"){
        return (
            <DropdownFileUploader
                className={className}
                multiple={multiple}
                fileUploadAcceptedFiles={fileUploadAcceptedFiles}
                fileUploadType={fileUploadType}
                placeholder={placeholder}
                onChange={onChange}
                onCancel={onCancel}
            />
        )
    }


    if(type === "color"){

      const [isOpen, setIsOpen] = useState(false)
      // const [color, setColor] = useState(value || "#9f9f9f")
      function handleClick(){
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
      }
      const cover = {
        position: 'fixed',
        inset: "unset !important"
      }



      return (
          <div className={classes.colorItem} key={name}>
            <div className={classes.ColorItemText}>{label}</div>
            <div className={classes.ColorItemBoxOuter} >
              <div
                style={{ backgroundColor: value || "#ccc" }}
                className={classes.ColorItemBoxInner}
                onClick={()=>{
                  setIsOpen(!isOpen);

                }}
              >
                <BsCheckLg size={19} color={"#ffff"} />
              </div>
            </div>
            {
              !isOpen ? null :
                <div style={ cover } onClick={ () => {}}>
                  <ChromePicker
                    color={value}
                    onChange={(e)=>{
                      onChange(e.hex)
                      // onChange(e.hex)
                    }}
                  />
                </div>
            }

          </div>
        )
    }

    if(type === "radiobox"){
        return (
          <div className="form-group d-flex">
              <FieldLabel/>
              <ul className="custom-control-group g-3 align-center flex-wrap"

              >
                  {
                      options.map(item => {
                          return(
                            <li className="d-flex">
                                <div className="custom-control custom-radio"
                                     onClick={(event)=>{
                                         onChange(item.value)
                                     }}>
                                    <input
                                      type="radio"
                                      className="custom-control-input"
                                      checked={value === item.value}
                                      name={name}
                                      value={item.value}
                                      onChange={(e)=>{onChange(e)}}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={name}
                                    >
                                        {item.label}
                                    </label>
                                </div>
                            </li>
                          )
                      })
                  }

              </ul>
          </div>
        )
    }

    if(type === "textarea"){
        return (
            <div className="form-group w-100 mb-1">
                <FieldLabel/>
                <div className="form-control-group">
                    <textarea
                        key={name}
                        className="form-control form-control-lg no-resize ex-large"
                        placeholder={placeholder}
                        defaultValue={value}
                        // value={value}
                        ref={ref}
                        disabled={disabled}
                        id={id}
                        name={name}
                        onBlur={(e)=>{
                          if(onBlur)
                            onBlur(e.target.value)
                        }}
                        onFocus={(e)=>{
                          if(onFocus)
                            onFocus(e.target.value)
                        }}
                        onChange={(e)=> {onChange(e.target.value)}}
                    ></textarea>
                    {
                        validation ? (!validation.isValid ? (<span className="invalid">{t(validation.message)}</span>) : (showSuccessValidation === true ? <span className="text-success">{t(validation.message)}</span> : '')  ) : ''
                    }
                </div>
            </div>

        )
    }

    if(type === 'select'){

        const selectOptions = options.map(item => {return {value: item.value, label: t(item.label)}});
        return (
            <div className="form-group w-100 mb-1">
                <FieldLabel/>
                <div className="form-control-group form-group">
                    <div className="form-control-select">
                        <Select
                            key={name}
                            id={id}
                            name={name}
                            isDisabled={disabled}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            defaultValue={selectOptions.find(item => item.value === value)}
                            value={selectOptions.find(item => item.value === value)}
                            options={selectOptions}
                            noOptionsMessage={({inputValue}) => !inputValue ? "Pas d’option" : "Pas d’option"}
                            onChange={(e)=>{onChange(e.value)}}
                            placeholder={placeholder}
                        />
                    </div>
                </div>
            </div>
        )
    }


    if(type === 'multiselect'){

      const selectOptions = options.map(item => {return {value: item.value, label: t(item.label)}});
      return (
        <div className="form-group w-100 mb-1">
          <FieldLabel/>
          <div className="form-control-group form-group">
            <div className="form-control-select multiselect">
              <MultiSelect

                hasSelectAll={false}
                options={options}
                value={value}
                onChange={onChange}
                labelledBy={name}
              />
            </div>
          </div>
        </div>
      )
    }

};



const useStyles = makeStyles((theme) => ({
    ColorItemBoxOuter: {
      width: 40,
      height: 40,
      borderRadius: 40,
      alignItems: "center",
      justifyContent: "center",
      display: 'flex',
      border: "1px solid #979797",

    },
    ColorItemBoxInner: {
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      borderRadius: 40
    },
    colorItem: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column"
    },
    ColorItemText: {
      fontFamily: 'Nunito',
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      color: "#555555",
      padding: '10px 0px',
      paddingTop: "20px",
      lineHeight: "14px",
      textAlign: "center",
    },
  })
);
