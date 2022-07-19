
import {Field } from "formik";
import React from "react";
import { fieldValue } from "../../../common/types";

const Number = ({uid,  label='', placeholder}:fieldValue): JSX.Element => {
    return (
        <div className={`field-inner`} >
          {label !== '' && <label className="form-label">{label}</label>}
             <Field
                className={`form-input`}
                id={uid}
                name={uid}
                placeholder={placeholder}
                type="number"
                aria-label={uid}
             />
        </div>
    )
};

export default Number;