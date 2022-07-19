
import { Field } from "formik";
import { fieldValue } from "../../../common/types";

const TextInput = ({uid, type="textInput", label='', placeholder}:fieldValue): JSX.Element => {
    return (
        <div className={`field-inner  `} >
          {label !== '' && <label className="form-label">{label}</label>}
             <Field
                className={`form-input`}
                id={uid}
                name={uid}
                placeholder={placeholder}
                type={type}
                aria-label={uid} 
             />
        </div>
    )
};

export default TextInput;