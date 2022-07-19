import { SliceZone } from "@prismicio/react";
import type { NextPage } from 'next';
import { PageProps } from "../common/types";
import { fetchGlobalComponents } from '../common/utils';
import { Page } from '../components/Layout';
import { createClient } from "../prismicio";
import { components } from "../slices/index.js";

const About: NextPage<PageProps> = ({slices, seo, colourPalette,header, footer}) => {
  return (
    <>
      <Page seo={seo} header={header} footer={footer} colourPalette={colourPalette}>
        <SliceZone 
          slices={slices} 
          components={components}
        />
      </Page>
    </>
  )
}

export async function getStaticProps({ previewData }: {previewData: any}) {
  const client = createClient({ previewData });

  // GLOBAL
  const{header, footer, colourPalette} = await fetchGlobalComponents(client)

  // PAGE SPECIFIC
  const page = await client.getByUID('site-page', 'about')

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

export default About
