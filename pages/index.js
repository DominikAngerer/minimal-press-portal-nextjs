import Head from 'next/head'

import StoryblokEditable from '../lib/storyblok-editable'
import useStoryblok from '../lib/storyblok-hook'
import Storyblok from '../lib/storyblok'

import DynamicComponent from '../components/DynamicComponent'

export default function Home(props) {

    let story = useStoryblok(props.story)

    return (
        <>
            <Head>
                <title>{story.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="py-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-secondary">
                        {story.name}
                    </h1>
                </div>
            </header>

            <main ref={elem => StoryblokEditable(story.content, elem)}>
                {story.content.body.map((blok) => (
                    <DynamicComponent blok={blok} key={blok._uid} />
                ))}
            </main>
        </>
    )
}

export async function getStaticProps(context) {
    let slug = 'home'
    let params = {
        version: 'draft'
    }

    if (context.preview) {
        params.version = 'draft'
        params.cv = Date.now()
    }

    let { data } = await Storyblok.get('cdn/stories/' + slug, params)

    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { story: data.story, preview: context.preview || false },
    }
}