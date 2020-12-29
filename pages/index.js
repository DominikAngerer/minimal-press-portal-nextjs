import Head from 'next/head'
import SbEditable from 'storyblok-react'

import Storyblok from '../lib/storyblok'
import EditMode from '../lib/storyblok-editmode'

import DynamicComponent from '../components/DynamicComponent'

export default function Home({ story, preview }) {
  preview ? EditMode(): false;

  return (
    <>
      <Head>
        <title>{story.name}</title>
        <link rel="icon" href="/favicon.ico" />
        {preview ? <script src={'//app.storyblok.com/f/storyblok-latest.js?t=vJMM43mnqNbmpXmxgBALqAtt'}></script> : ''}
      </Head>

      <SbEditable content={story.content}>
        <header className="py-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-secondary">
              {story.name}
            </h1>
          </div>
        </header>
      </SbEditable>

      <SbEditable content={story.content}>
        <main>
          {story.content.body.map((blok) => (
            <DynamicComponent blok={blok} key={blok._uid} />
          ))}
        </main>
      </SbEditable>
    </>
  )
}

export async function getStaticProps(context) {
  let params = {
    // version: 'published'
    version: 'draft'
  }
  if(context.preview) {
    params.version = 'draft'
  }

  let { data } = await Storyblok.get('cdn/stories/home', params)

  return {
    props: { story: data.story, preview: context.preview || false },
  }
}