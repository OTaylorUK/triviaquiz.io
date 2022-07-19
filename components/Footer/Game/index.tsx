
import { useRouter } from "next/router";
import SVG from 'react-inlinesvg';
import shallow from 'zustand/shallow';
import { ResultFooterProps } from "../../../common/types";
import { gameStore } from '../../../store/game';
import { gameSettingStore } from "../../../store/user";


const Results = ({isLoading,setIsLoading }:ResultFooterProps): JSX.Element => {

  const { createNewGame, setupQuiz, updateActiveStep,setResults  } = gameStore(state => ({ 
    createNewGame: state.createNewGame,
    setupQuiz: state.setupQuiz,
    updateActiveStep: state.updateActiveStep,
    setResults: state.setResults,
  }), shallow)

  const currentSettings = gameSettingStore(state => ({ 
    avatar: state.avatar,
    name: state.name,
    categories: state.categories,
    difficulty: state.difficulty,
    limit: state.limit,
    userLocation: state.userLocation,
  }), shallow)

  const router = useRouter()

  const resetGame = () => {
    setIsLoading(true)
    setResults(null)
    updateActiveStep(0)
    setupQuiz(currentSettings)
    setIsLoading(false)
  }

  const backToSettings = () => {
    setIsLoading(true)

    router.push('/play/create')

    setTimeout(() => {
     createNewGame([])
    }, 600);

  }


  return (
    <div className=" w-full flex   flex-row flex-wrap text-custom-white bg-custom-secondary px-6 py-4 z-10">
      <div className="flex flex-row gap-4  rounded-lg  w-full justify-between">
          <button disabled={isLoading} className='flex-1 btn-default bg-custom-white text-custom-primary' onClick={() => resetGame()}>{isLoading ? 'Restarting...' : 'Restart'} <SVG className="" src={`/restart.svg`} width={20} height={20}  title={'SVG icon inside a button' } /></button>
          <button className='flex-1 btn-default bg-custom-primary' onClick={() => backToSettings()}>New quiz</button>
      </div>
    </div>
  )
};


export default Results;