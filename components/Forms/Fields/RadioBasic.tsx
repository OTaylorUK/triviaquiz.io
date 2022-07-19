
import {Field} from "formik";
import React from "react";
import { fieldValue } from "../../../common/types";

const RadioBasic = ({uid,  label='', options}:fieldValue): JSX.Element => {
    return (
        <div role="group" aria-labelledby="my-radio-group" className={`field-inner`} >
            {label !== '' && <label className="form-label">{label}</label>}
            <div className="field-col">
                {options?.map(({uid: optionUID,label,img})=>{
                    return(
                        <label key={optionUID} className="  field-wrapper flex flex-col cursor-pointer  ">
                            <Field
                                className={`peer visually-hidden `}
                                name={uid}
                                type="radio"
                                value={optionUID}
                            />

                            <div className="border-2  border-transparent h-full w-full   form-input border-solid peer-checked:bg-custom-accent-primary peer-checked:border-custom-accent-secondary">{label}</div>
                        </label>
                    )
                })}
            </div>
        </div>
    )
};

export default RadioBasic;