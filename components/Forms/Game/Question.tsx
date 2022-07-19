import { GameQuestionProps } from "../../../common/types";
import FormField from "../Fields/FormField";

const Question = ({data}:GameQuestionProps): JSX.Element => {
  const {type, uid, options, question} = data
  return (
    <>
      <div className="field-group flex-1 justify-center">
        <p className="lg:text-xl">{question}</p>
      </div>

       <FormField uid={uid} type={type} label={""} wrapContent={false} options={options} />
    </>
  )
};

export default Question;