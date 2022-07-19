
import { Field } from "formik";
import { fieldValue } from "../../../common/types";

const Select = ({uid,  label, options}:fieldValue): JSX.Element => {

    const createOptions = (options: object| undefined) => {
        if(options === undefined) return null 
        return Object.entries(options).map(([key, value]) => {
            return (
                <option key={key} value={key}>
                    {value}
                </option>
            )
        })
    }

    return (
        <div role="group" aria-labelledby="my-select-group" className={` field-inner`} >
            {label !== '' && <label className="form-label">{label}</label>}
            <Field as="select" name={uid} className={`form-input`}>
                {createOptions(options)}
            </Field>
        </div>

    )
};

export default Select;