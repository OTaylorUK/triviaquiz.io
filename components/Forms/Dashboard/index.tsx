import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { animateUp, wrapperAnimationSettings } from "../../../common/framerSettings";
import { FormWrapperProps } from "../../../common/types";
import Loader from "../../component/Loader";
import { AppFooter } from "../../Footer";
import FormFields from "../FormFields";


const _renderStepContent = (step: any, uniqueGroups: { [x: string]: any; }, groupObjects: { [x: string]: any; }, formikFunc?: any) => {
  const curSelection = uniqueGroups[step]
  const currentSlide = groupObjects[curSelection]
  return (
    <>
      <FormFields data={currentSlide} formikFunc={formikFunc} />
    </>
  )
}

const Dashboard = ({ initialValues, numOfGroups, uniqueGroups, groupObjects }: FormWrapperProps): JSX.Element => {
  const router = useRouter()
  const [hasMounted, setHasMounted] = useState(false)
  const [isCreatingGame, setCreatingGame] = useState<boolean>(false)
  const activeStep = 0

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (isCreatingGame || !hasMounted) {
    return (
      <Loader />
    )
  }

  const isLastStep = activeStep === numOfGroups - 1;
  const curSelection = uniqueGroups[activeStep]
  const currentSlide = groupObjects[curSelection]
  const currentValidationSchema = Yup.object().shape(currentSlide['validationSchema']);


  const _handleSubmit = (values: any, actions: any) => {

    const selection = values.dashboard;

    switch (selection) {
      case 'play-game':
        router.push('/play/create')
        break;
      case 'sign-in':
        router.push('/login')
        break;
      case 'sign-up':
        router.push('/signup')
        break;
      default:
        break;
    }
  }

  const _handleBack = () => { }

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
              <Form id={'dashboard'} className='w-full p-0  flex-1 flex flex-col justify-center items-center'>

                <motion.div {...wrapperAnimationSettings} className={`max-w-screen-md w-full px-4 flex-1 py-6 lg:py-10 flex flex-col gap-5 justify-center items-center`}>
                  <motion.div variants={animateUp} className=" w-full flex-1 flex flex-col gap-5 justify-center items-center" >
                    {_renderStepContent(activeStep, uniqueGroups, groupObjects, formikFunc)}
                  </motion.div>
                </motion.div>


                <AppFooter submitMessage={'Proceed'} handleBack={_handleBack} activeStep={activeStep} isSubmitting={isSubmitting} isLastStep={isLastStep} hasErrors={hasErrors} cancelLink={'/'} />

              </Form>
            </>
          )
        }}
      </Formik>
    </>
  )
};

export default Dashboard;