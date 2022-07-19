import type { NextPage } from 'next';
import ISOCountryCode from '../../common/ISOCountryCode.json';
import { PageProps } from '../../common/types';
import { fetchGlobalComponents, formatFormFields, getQuizCategories } from '../../common/utils';
import Create from '../../components/Forms/Create';
import { App } from '../../components/Layout';
import { createClient } from "../../prismicio";


const CreateGame: NextPage<PageProps> = ({slices, seo, colourPalette,header, footer, dynamicFields}) => {
  const {initialValues, numOfGroups, uniqueGroups, groupObjects} = formatFormFields(slices, dynamicFields)
  return (
    <>
      <App seo={seo} header={header} footer={footer} colourPalette={colourPalette} limit={numOfGroups}>
        <Create initialValues={initialValues} numOfGroups={numOfGroups} uniqueGroups={uniqueGroups} groupObjects={groupObjects} />
      </App>
    </>
  )
}



export async function getStaticProps({ previewData }: {previewData: any}) {
  const client = createClient({ previewData });

  // GLOBAL
  const{header, footer, colourPalette} = await fetchGlobalComponents(client)

  // PAGE SPECIFIC
  const page = await client.getByUID('site-page', 'create')
  const quizCategories = await getQuizCategories()


  const avatarCount = 32

  const avatars = []

  for (let i = 0; i < avatarCount; i++) {
      const filename = `adventurerNeutral-${i}`
      const avatar = {
          uid: filename,
          label: filename,
          img: `/avatars/${filename}`
      }
      avatars.push(avatar)
  } 



  const dynamicFields = {
    categories:quizCategories,
    avatar: avatars,
    userLocation: ISOCountryCode
  }


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
      dynamicFields: dynamicFields,
    },
  };
}

export default CreateGame
