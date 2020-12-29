import Head from 'next/head'

import StoryblokEditable from '../lib/storyblok-editable'
import useStoryblok from '../lib/storyblok-hook'
import Storyblok from '../lib/storyblok'

import DynamicComponent from '../components/DynamicComponent'

export default function DynamicRoute(props) {

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

export async function getStaticPaths() {
    let { data } = await Storyblok.get('cdn/links/', {})

    let paths = []
    Object.keys(data.links).forEach(linkKey => {
        if (!data.links[linkKey].is_folder) {
            if (data.links[linkKey].slug !== 'home') {
                paths.push({ params: { slug: data.links[linkKey].slug } })
            }
        }
    })

    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    let slug = context.params.slug
    let params = {
        version: 'draft'
    }
    
    if (context.preview) {
        params.version = 'draft'
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