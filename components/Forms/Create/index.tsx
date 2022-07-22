import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import shallow from 'zustand/shallow';
import { animateUp, wrapperAnimationSettings } from "../../../common/framerSettings";
import { FormWrapperProps } from "../../../common/types";
import { getGeoInfo } from "../../../common/utils";
import { gameStore } from "../../../store/game";
import { gameSettingStore } from "../../../store/user";
import Loader from "../../component/Loader";
import { AppFooter } from "../../Footer";
import FormFields from "../FormFields";

const _renderStepContent = (step: any,  uniqueGroups: { [x: string]: any; }, groupObjects: { [x: string]: any; }, formikFunc?:any) => {
  const curSelection = uniqueGroups[step]
  const currentSlide = groupObjects[curSelection]
  return (
    <>
      <FormFields data={currentSlide} formikFunc={formikFunc}/>
    </>
  )
}


const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Create = ({initialValues, numOfGroups, uniqueGroups, groupObjects}:FormWrapperProps): JSX.Element => {
  const router = useRouter()
 
  const [hasMounted, setHasMounted] = useState(false)
  const [isCreatingGame, setCreatingGame] = useState<boolean>(false)

  const {avatar, name, categories, difficulty, limit, userLocation, createNewSettings, setInitialRegion,activeStep, updateActiveStep: setActiveStep }: (any) = gameSettingStore(state => ({ 
    avatar: state.avatar,
    name: state.name,
    categories: state.categories,
    difficulty: state.difficulty,
    limit: state.limit,
    userLocation: state.userLocation,
    activeStep: state.activeStep,
    createNewSettings: state.createNewSettings,
    setInitialRegion: state.setInitialRegion,
    updateActiveStep: state.updateActiveStep,
    
  }), shallow)


  const { setupQuiz,setResults,updateActiveStep } = gameStore(state => ({ 
    setupQuiz: state.setupQuiz,
    setResults: state.setResults,
    updateActiveStep: state.updateActiveStep,

  }), shallow)


  useEffect(() =>{
    // automatically selects question location based on user geolocation
    const getLocationData = async () => {
      const result = await getGeoInfo()
      setInitialRegion(result.data.country_code)
    }
    
    getLocationData()
    setHasMounted(true)

  },[setInitialRegion])

  // merge local store settings with default values
  const settingStore: any =  {
    avatar,
    name,
    categories,
    difficulty,
    limit,
    userLocation,
  }
  Object.keys(initialValues).forEach(function(key) {
    initialValues[key] = settingStore?.[key] ? settingStore[key] :  initialValues[key]
  })


  if(isCreatingGame || !hasMounted || userLocation === ""){
    return(
      <Loader/>
    )
  }
  const isLastStep = activeStep === numOfGroups - 1;
  const curSelection = uniqueGroups[activeStep]
  const currentSlide = groupObjects[curSelection]
  const currentValidationSchema =  Yup.object().shape(currentSlide['validationSchema']);

  


  const _handleSubmit = (values: any, actions: any) => {
    createNewSettings(values)

    if (isLastStep) {
      // create quiz -> redirect to the quiz
      submitForm(values, actions)
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  const submitForm = async (values: any, actions: any) => {
    await sleep(1000);
    actions.setSubmitting(false);
    setResults(null)
    updateActiveStep(0)
    setupQuiz(values)
    createNewSettings(values)
    setCreatingGame(true);
    router.push('/play')
  }



  const _handleBack = () => {
    console.log('go back');
    setActiveStep(activeStep - 1);
  }

  
  return (
    <>
     <Formik
        initialValues={initialValues}
        validationSchema={currentValidationSchema}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting, setFieldValue, setFieldTouched, errors }) => {
          const hasErrors = Object.keys(errors).length === 0 ? false : true

          const formikFunc = {
            setFieldValue,
            setFieldTouched
          }
          
          return (
            <>
              <Form id={'create-game'} className='w-full p-0  flex-1 flex flex-col justify-center items-center'>
                <motion.div {...wrapperAnimationSettings} className={`max-w-screen-md w-full px-4 flex-1 py-6 lg:py-10 flex flex-col gap-5 justify-center items-center`}>
                   <motion.div variants={animateUp} className=" w-full flex-1 flex flex-col gap-5 justify-center items-center" >
                    {_renderStepContent(activeStep,uniqueGroups, groupObjects, formikFunc)}
                  </motion.div>
                </motion.div>


                <AppFooter  handleBack={_handleBack} activeStep={activeStep} isSubmitting={isSubmitting} isLastStep={isLastStep} hasErrors={hasErrors} cancelLink={'/dashboard'}/>

              </Form>
            </>
          )
        }}
        </Formik>
    </>
  )
};

export default Create;