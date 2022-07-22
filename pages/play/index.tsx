import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { PageProps } from '../../common/types';
import { fetchGlobalComponents } from '../../common/utils';
import Loader from '../../components/component/Loader';
// import Quiz from '../../components/Forms/Game/Quiz';
import Game from '../../components/Layout/Game';
import { createClient } from "../../prismicio";
import { gameStore } from '../../store/game';
import { gameSettingStore } from '../../store/user';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Quiz = dynamic<any>(() => import('../../components/Forms/Game/Quiz'), {
  suspense: true,
})


const Home: NextPage<PageProps> = ({seo, colourPalette,header, footer}) => {

  const { questions } = gameStore(state => ({ 
    questions: state.questions,
  }), shallow)

  const {updateActiveStep} = gameSettingStore(state => ({ 
    updateActiveStep: state.updateActiveStep,
  }), shallow)



  const router = useRouter()

  useEffect(() => {
    if (questions?.length === 0) {
      updateActiveStep(0)
      router.push('/play/create')
    }
  }, [questions, router, updateActiveStep])

  
   // might not be doing anything.. come back to check later
   if(questions?.length === 0){
    return(
        <Loader/>
      )
    }
  
  return (
    <>
      <Game seo={seo} header={header} footer={footer} colourPalette={colourPalette}>
        <Suspense fallback={<Loader />}>
          <Quiz />
        </Suspense>
      </Game>
    </>
  )
}

export async function getStaticProps({ previewData }: {previewData: any}) {
  const client = createClient({ previewData });

   // GLOBAL
   const{header, footer, colourPalette} = await fetchGlobalComponents(client)

   // PAGE SPECIFIC
  const page = await client.getByUID('site-page', 'play')

  return {
    props: {
      slices: page.data?.slices,
      colourPalette: colourPalette,
      header: header,
      footer: footer,
      seo: {
        title: page.data?.title ? page.data?.title : 'Trivia quiz',
        description: page.data?.description ? page.data?.description : 'Trivia quiz is a completely free quiz generator where you can test your knowledge in 10 categories',
        ogImage: page.data?.ogImage,
      },
    },
  };
}

export default Home
