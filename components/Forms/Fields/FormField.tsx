
import { ErrorMessage } from "formik";
import { fieldValue } from "../../../common/types";
import CheckboxBasic from "./CheckboxBasic";
import CheckboxStyled from "./CheckboxStyled";
import Number from "./Number";
import RadioBasic from "./RadioBasic";
import RadioStyled from "./RadioStyled";
import Select from "./Select";
import TextInput from "./TextInput";


const renderError = (message:string) => <p className="form-helper">{message}</p>;

const FormField = (props:fieldValue): JSX.Element => {

    const {type, uid, wrapContent = true} = props
    let field;

    switch (type) {
        case 'textInput':
            field = <TextInput {...props} />
            break;

        case 'radioStyled':
            field = <RadioStyled {...props} />
            break;

        case 'radioBasic':
            field = <RadioBasic {...props} />
            break;

        case 'checkboxStyled':
            field = <CheckboxStyled {...props} />
            break;

        case 'checkboxBasic':
            field = <CheckboxBasic {...props} />
            break;

        case 'number':
            field = <Number {...props} />
            break;

        case 'select':
            field = <Select {...props} />
            break;
        default:
            break;
    }

    return (
        <>
        <div className={`${wrapContent ? 'field-group' : 'flex w-full px-4 flex-1 flex-col gap-5'} ${type === 'checkboxStyled' || type === 'radioStyled' ? ' ' : ''} text-center`}>
            {field}
            <ErrorMessage name={uid} render={renderError} />
        </div>
        </>
    )
};

export default FormField;