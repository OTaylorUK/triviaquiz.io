
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import shallow from 'zustand/shallow';
import { animateUp, wrapperAnimationSettings } from "../../../common/framerSettings";
import { gameStore } from "../../../store/game";
import Loader from "../../component/Loader";
import { AppFooter } from "../../Footer";
import Question from "./Question";
import QuizResult from "./QuizResult";

const _renderStepContent = (step: number, questions: any) => {
  return <Question data={questions[step]}/>
}

function _sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Quiz = (): JSX.Element => {

  const { questions, answers, initialValues,activeStep,results, setResults, updateActiveStep, quizStartTime } = gameStore(state => ({ 
    activeStep: state.activeStep,
    questions: state.questions,
    answers: state.answers,
    initialValues: state.initialValues,
    setResults: state.setResults,
    results: state.results,
    updateActiveStep: state.updateActiveStep,
    quizStartTime: state.quizStartTime,
  }), shallow)

  const [hasMounted, setHasMounted] = useState(false)


  useEffect(() =>{

    
    setHasMounted(true)

    if(activeStep === 0){
      console.log({activeStep});
      const startTime = new Date().getTime()
      quizStartTime(startTime)
    }
    
    if(window){
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

  },[activeStep,quizStartTime])

  
  if (!hasMounted || !questions) return <div>Loading....</div>

  const isLastStep = activeStep === questions.length - 1;
  
  if(results !== null && results.length !== 0 ){
    return <QuizResult  />

  }else if(!questions[activeStep]){
    return <Loader/>
  }

  const currentValidationSchema = questions[activeStep]['validationSchema'];


  const _submitForm = async (values: any, actions: any) => {
    await _sleep(1000);
    type answerProp = {
      [key: string ]: {
      uid: string,
      question: string,
      answer: string
      options: any[]
     } 
  }

  const results = Object.entries(answers as answerProp).map(([key, value]) => {
      const answer = values[key] 
      const isCorrect = value.uid === answer ? true : false
      const userAnswer: any = value.options.filter((val: { uid: any; }) => val.uid === answer);
     
      return{
        isCorrect: isCorrect,
        questions: value.question,
        correctAnswer: value.answer,
        userAnswer: userAnswer[0].label
      }
    })
    setResults(results)
  }

  const _handleSubmit = (values: any, actions: any) => {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      actions.setTouched({});
      actions.setSubmitting(false);
    }
    updateActiveStep(activeStep + 1);
  }

  const _handleBack = () => {
    updateActiveStep(activeStep - 1);
  }
  
  return (
    <>
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidationSchema}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting, errors }) => {
            const hasErrors = Object.keys(errors).length === 0 ? false : true

            return(
              <Form id={'quiz-game'} className='w-full flex-1  flex flex-col  justify-center items-center'>
                <motion.div {...wrapperAnimationSettings} className={`max-w-screen-md w-full px-4 flex-1 py-6 lg:py-10 flex flex-col gap-5 justify-center items-center`}>
                   <motion.div variants={animateUp} className=" w-full flex-1 flex flex-col gap-5 justify-center items-center" >
                   {_renderStepContent(activeStep, questions)}
                  </motion.div>
                </motion.div>

                <AppFooter submitMessage={'Finish'} handleBack={_handleBack} activeStep={activeStep} isSubmitting={isSubmitting} isLastStep={isLastStep} hasErrors={hasErrors}/>
              </Form>
            )
          }}
        </Formik>
    </>
  )
};

export default Quiz;