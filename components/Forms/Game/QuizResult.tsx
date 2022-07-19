

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SVG from 'react-inlinesvg';
import shallow from 'zustand/shallow';
import { gameStore } from "../../../store/game";
import PercentLoader from "../../component/PercentLoader";
import { animateUp, wrapperAnimationSettings } from "../../../common/framerSettings";
import { convertMsToMinutesSeconds } from "../../../common/utils";
import Loader from "../../component/Loader";
import { ResultFooter } from "../../Footer";

const QuizResult = (): JSX.Element => {

    const {startTime } = gameStore(state => ({ 
        startTime: state.startTime,
    }), shallow)

    const [endTime, setEndTime] = useState<null|string>(null)

    useEffect(() =>{

        if(endTime === null){
            let millisecondsDif = Number(Math.abs((new Date().getTime() - startTime)).toFixed(2));
            const timeDif = convertMsToMinutesSeconds(millisecondsDif)
            setEndTime(timeDif)
        }
     
    },[endTime,startTime])
    
    
  const [isLoading, setIsLoading] = useState(false)

    
    const { setMessage, results } = gameStore(state => ({ 
        setMessage: state.setMessage,
        results: state.results,
      }), shallow)


    const tickSVG = <SVG className="icon"  src={'/tick.svg'} title={'Icon of a tick'} width={10} height={10} />
    const crossSVG = <SVG className="icon"  src={'/cross.svg'} title={'Icon of a cross'} width={10} height={10} />

    const outputCorrectAnswer = (step: number) => {
        
        const {questions,isCorrect, correctAnswer,userAnswer} = results![step - 1]
        
        return(

            <div className="field-group flex flex-col gap-4 ">
                <div className="w-full flex flex-col gap-4 text-center">
                    <div className="flex p-4 lg:p-8 bg-custom-primary rounded-lg ">
                        <p className="w-full text-center lg:text-lg">{questions}</p>
                    </div>
                    <div className="flex flex-col gap-4 p-2">
                        {isCorrect ? (
                            <div className="flex flex-col gap-2">
                                <span>Your answer:</span>
                                <p className="p-4 rounded-lg bg-custom-success">{userAnswer}</p>
                            </div>
                        ) : (
                            
                        <>
                            <div className="flex flex-col gap-2">
                                <span>Your answer:</span>
                                <p className="p-4 rounded-lg bg-custom-failure">{userAnswer}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span>Correct answer:</span>
                                <p className="p-4 rounded-lg bg-custom-success">{correctAnswer}</p>
                            </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        )
    }
      
    const generateResultMessage = (results: any) => {
        const count = results.length 
        const numberCorrect = results.filter((question: { isCorrect: boolean; }) => question.isCorrect === true).length  // -> 3
        const fractionCorrect = Number((numberCorrect / count)).toFixed(2)
        const percentCorrect = Number(((numberCorrect / count) * 100).toFixed(1))

        return {
            message: conditionalMessage(percentCorrect),
            fraction: Number(fractionCorrect),
            percent: percentCorrect,
            numberCorrect:numberCorrect,
            total:count
        }
    }

    const conditionalMessage = (percent: number) => {
        // const { name  } = gameSettingStore(state => ({ 
        //     name: state.name,
        //   }), shallow)
        let message:string

        if(percent === 100){
            message = `Amazing job! 🥳`
        }else if(percent >= 80){
            message = `Great job! 🎉`
        }else if(percent >= 60){
            message = `Good effort! 🙌`
        }else if(percent >= 40){
            message = `Nice try! 👏`
        }else{
            message = `Oh no! 😓`
        }
        return message
    }

    const {message, percent, fraction, numberCorrect, total}= generateResultMessage(results)


    useEffect(()=>{
        setMessage(message)
    },[message,setMessage])

    const [reviewQuestion, setReviewQuestion] = useState<null | number>(null)


    // might not be doing anything.. come back to check later
    if(isLoading){
        return(
            <Loader/>
          )
    }


    const listAnswers = (results: any) => {

        const list = results.map((result: any, i:number)=>{
            let icon,bgColour;
            if(result.isCorrect === true){
                bgColour = 'bg-custom-success'
                icon = tickSVG
            }else{
                bgColour = 'bg-custom-failure'
                icon = crossSVG
            }

            return(
                <div key={i} className="flex flex-col gap-1 text-custom-primary text-center group cursor-pointer" onClick={()=> setReviewQuestion(i+1)}>
                    <div className={`${reviewQuestion === i+1 ? 'border-custom-accent-secondary bg-custom-accent-primary' : 'bg-custom-white'} p-1  border rounded-full `}>
                        <div className={`p-1  rounded-full ${bgColour} text-custom-white`}>
                            {icon}
                        </div>
                    </div>
                   <span className={`${reviewQuestion === i+1 ? 'text-custom-accent-secondary' : 'text-custom-white'} text-sm `}>{i+1}</span>
                </div>
            )
        })
        return list
    }
   
    return(
       <>
        <motion.div {...wrapperAnimationSettings} className={`max-w-screen-md w-full px-4 flex-1 py-6 lg:py-10 flex flex-col gap-5 lg:gap-12 justify-center items-center`}>
            <motion.div variants={animateUp} className=" w-full flex-1 flex flex-col gap-5 justify-center items-center" >
                <div className="field-group flex flex-col">
                    <p>You took {endTime}</p>

                    <div className="relative">
                        <PercentLoader amount={fraction}/>
                        <div className=" flex flex-col justify-center items-center  gap-2 text-center w-full p-8 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                            <span className="relative font-bold text-4xl">{percent}<sup className="absolute ml-1 left-full top-0 text-sm">%</sup></span>
                            <span className="text-lg">{numberCorrect} / {total}</span>
                        </div>
                    </div>

                    <p>Click to view your answers</p>
                    <div className="flex flex-flow flex-wrap gap-2">
                        {listAnswers(results)}
                    </div>
                </div>
                
                {reviewQuestion !== null && outputCorrectAnswer(reviewQuestion)}
            </motion.div>

        </motion.div>
        <ResultFooter isLoading={isLoading} setIsLoading={setIsLoading} />
       </>

    )
};

export default QuizResult;