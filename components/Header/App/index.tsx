import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import SVG from 'react-inlinesvg';
import shallow from 'zustand/shallow';
import { animateDown, wrapperAnimationSettings } from "../../../common/framerSettings";
import { AppHeaderProps } from "../../../common/types";
import { gameSettingStore } from "../../../store/user";
import ProgressBar from "../ProgressBar";


const App = React.forwardRef<HTMLDivElement, AppHeaderProps>(({title, limit = 0, backLink = '/dashboard'}, ref) => {

  const router = useRouter()

  const {  activeStep, updateActiveStep} = gameSettingStore(state => ({ 
    activeStep: state.activeStep,
    updateActiveStep: state.updateActiveStep,
  }), shallow) 


  const questionNumber = activeStep + 1
  const percentCompleted:any = (questionNumber / limit) * 100

  const goHome = () =>{
    router.push(backLink)
    setTimeout(() => {
      updateActiveStep(0)
    }, 600);
  }

  wrapperAnimationSettings['viewport']  = { once: true, amount: 0 }

  
  return (
    <motion.div ref={ref} {...wrapperAnimationSettings} className={`w-full flex  flex-row flex-wrap fixed top-0 left-0 text-custom-white  z-10`}>

      <motion.div variants={animateDown} className="flex flex-col   bg-custom-secondary overflow-hidden w-full" >
        <div className="p-6 lg:p-4 lg:px-[5vw] flex flex-row gap-2 bg-custom-secondary   w-full justify-between">
          <div className="  flex-1 "   onClick={()=>  goHome()} >
            <button className="btn-primary">
              <SVG className="" src={`/back.svg`} width={20} height={20}  title={'SVG icon inside a button' } />
                Back 
            </button>
          </div>

          <div className="hidden lg:flex flex-1  justify-center items-center">
            <Link href={"/"}>
              <a className="">
              <SVG className="" src={`/TriviaQuizLogoPublic.svg`}  height={20}  title={'Trivia quiz logo' } />
              </a>
            </Link>
          </div>
          <div className=" flex-1 text-right flex justify-end items-center" >
              <p className="font-semibold">{title}</p>
          </div>
        </div>
        {limit !== 0 &&  <ProgressBar translateAmount={100 - percentCompleted} />}
      </motion.div>

    </motion.div>
  )
});

App.displayName = "App";


export default App;