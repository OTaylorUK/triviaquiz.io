import {Field} from "formik";
import React from "react";
import { fieldValue } from "../../../common/types";

const CheckboxBasic = ({uid,  label='', options, dynamicData}:fieldValue): JSX.Element => {

    const finalData: any[] = dynamicData !== undefined ? dynamicData : options

    return (
        <div role="group" aria-labelledby="my-radio-group" className={`field-inner`} >
            {label !== '' && <label className="form-label">{label}</label>}
            {finalData?.map(({uid: optionUID,label,img})=>{
                return(
                    <label key={optionUID} className="radio-option-group  field-wrapper cursor-pointer">
                        <Field
                            className={`p-4 border`}
                            name={uid}
                            type="checkbox"
                            value={optionUID}
                        />

                        <span>{label}</span>
                    </label>
                )
            })}
        </div>
    )
};

export default CheckboxBasic;