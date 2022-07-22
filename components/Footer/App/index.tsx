
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import { useState } from 'react';
import SVG from 'react-inlinesvg';
import shallow from 'zustand/shallow';
import { animateUp, wrapperAnimationSettings } from '../../../common/framerSettings';
import { AppFooterProps } from '../../../common/types';
import { gameStore } from '../../../store/game';

const App = ({submitMessage = 'Play', handleBack, activeStep, isSubmitting, isLastStep, hasErrors, cancelLink = '/play/create'}:AppFooterProps): JSX.Element => {
  const router = useRouter()

  const disableButton = hasErrors || isSubmitting
  let nextBtn

  if(isSubmitting){
    nextBtn = <>Loading...</>
  }else if(isLastStep){
    nextBtn = <>{submitMessage}</>
  }else{
    nextBtn = <>Next<SVG className="" src={`/forward.svg`} width={20} height={20}  title={'SVG icon inside a button' } /></>
  }


  const { createNewGame } = gameStore(state => ({ 
    createNewGame: state.createNewGame,
  }), shallow)


  const [isLoading, setIsloading] = useState(false)

  const backToSettings = () => {
    setIsloading(true)
    console.log(cancelLink);
    
    router.push(cancelLink)

    setTimeout(() => {
     createNewGame([])
    }, 600);

  }

  wrapperAnimationSettings['viewport']  = { once: true, amount: 0 }

  
  return (

    <motion.div  {...wrapperAnimationSettings} className={`w-full flex   flex-row flex-wrap text-custom-white justify-center z-10`}>
        <motion.div variants={animateUp} className=" rounded-lg  w-full bg-custom-secondary flex justify-center" >
          <div className="w-full lg:max-w-screen-md flex flex-row gap-4   px-6 py-4 justify-between ">
            {activeStep !== 0 ? (
              <button className="flex-1 btn-default bg-custom-white text-custom-primary"  onClick={handleBack} type="button">
                  <SVG className="" src={`/back.svg`} width={20} height={20}  title={'SVG icon inside a button' } />
                  Back
              </button>
            ):
            <button className="flex-1 btn-default bg-custom-white text-custom-primary"  onClick={() => backToSettings()} type="button">
              <SVG className="" src={`/restart.svg`} width={20} height={20}  title={'SVG icon inside a button' } />
              {isLoading? 'Loading...' :'Cancel'}
            </button>
            }
              <button
                className="flex-1 btn-default bg-custom-primary "
                disabled={disableButton}
                type="submit"
              >
                  {nextBtn}
          </button>
          </div>
          
        </motion.div>
      </motion.div>
  )
};


export default App;