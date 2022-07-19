import { FormFieldsProps } from "../../common/types";
import FormField from "./Fields/FormField";

const FormFields = ({data,dynamicData, formikFunc}:FormFieldsProps): JSX.Element => {
  const {fields} = data
  return (
    <>
      {fields?.map((field)=> {
        return(
          <FormField key={field.uid} {...field} dynamicData={dynamicData} formikFunc={formikFunc} />
        )
      })}
    </>
  )
};

export default FormFields;