import type { NextPage } from 'next';
import { PageProps } from '../common/types';
import { fetchGlobalComponents, formatFormFields } from '../common/utils';
import Dashboard from "../components/Forms/Dashboard";
import { App } from '../components/Layout';
import { createClient } from "../prismicio";


const Home: NextPage<PageProps> = ({slices, seo, colourPalette,header, footer, dynamicFields}) => {
  const {initialValues, numOfGroups, uniqueGroups, groupObjects} = formatFormFields(slices, dynamicFields)
  return (
    <>
      <App seo={seo} header={header} footer={footer} colourPalette={colourPalette} backLink={'/'}>
        <Dashboard initialValues={initialValues} numOfGroups={numOfGroups} uniqueGroups={uniqueGroups} groupObjects={groupObjects} />
      </App>
    </>
  )
}

export async function getStaticProps({ previewData }: {previewData: any}) {
  const client = createClient({ previewData });

  // GLOBAL
  const{header, footer, colourPalette} = await fetchGlobalComponents(client)

  // PAGE SPECIFIC
  const page = await client.getByUID('site-page', 'dashboard')

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
