
import { motion } from "framer-motion";
import React from "react";
import SVG from 'react-inlinesvg';
import shallow from 'zustand/shallow';
import { animateDown, wrapperAnimationSettings } from "../../../common/framerSettings";
import { gameStore } from "../../../store/game";
import { gameSettingStore } from "../../../store/user";
import ProgressBar from "../ProgressBar";

const Game = React.forwardRef<HTMLDivElement>(({}, ref) => {
  const {activeStep,resultMessage} = gameStore(state => ({ 
    activeStep: state.activeStep,
    resultMessage: state.resultMessage,
  }), shallow)

  const {avatar,name,limit} = gameSettingStore(state => ({ 
    avatar: state.avatar,
    name: state.name,
    limit: state.limit,
  }), shallow)

  
  const questionNumber = activeStep + 1
  const percentCompleted:any = (questionNumber / limit) * 100
  const isCompleted = questionNumber > limit ? true : false
  const currentQuestion = `Question ${questionNumber} /`
  wrapperAnimationSettings['viewport']  = { once: true, amount: 0 }
  
  return (

    <motion.div ref={ref} {...wrapperAnimationSettings} className={`w-full flex fixed top-0 left-0 text-custom-white z-10 bg-custom-primary flex-row flex-wrap`}>
      <motion.div variants={animateDown} className="flex flex-col gap-2  bg-custom-secondary overflow-hidden w-full" >  
        <div className="flex flex-flow justify-center items-center flex-1 p-4 pb-2 " >
          <div className="flex flex-row gap-2 items-center">
            <div className="rounded-full overflow-hidden">
              <SVG className="" src={`/avatars/${avatar}.svg`} width={40} height={40}  title={'SVG icon inside a button' } />
            </div>
            <span>{name}</span>
          </div>

          <div className="flex-1 flex justify-end">
            {isCompleted ? <div>{resultMessage}</div> :  <div className="flex justify-center items-center gap-2"><p className="">{currentQuestion}</p><p className="text-sm">{limit}</p></div>}
          </div>
        </div>
        <ProgressBar translateAmount={100 - percentCompleted} />
      </motion.div>

    </motion.div>
  )
});

Game.displayName = "Game";

export default Game;