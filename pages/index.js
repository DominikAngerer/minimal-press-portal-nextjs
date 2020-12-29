import Head from 'next/head'

import StoryblokEditable from '../lib/storyblok-editable'
import StoryblokBridge from '../lib/storyblok-bridge'
import Storyblok from '../lib/storyblok'

import React, { useState, useEffect } from 'react';

import DynamicComponent from '../components/DynamicComponent'

export default function Home(props) {
    let [story, setStory] = useState(props.story)

    useEffect(() => {
        StoryblokBridge(() => {
            if (window.storyblok) {
                window.storyblok.init({
                    accessToken: 'vJMM43mnqNbmpXmxgBALqAtt'
                })

                // reload on Next.js page on save or publish event in Storyblok Visual Editor
                window.storyblok.on(['change', 'published'], () => location.reload())

                // Update story in State on input in Visual Editor
                // this will alter the state and replaces the current story with a current raw story object and resolve relations
                window.storyblok.on('input', (event) => {
                    console.log(event, story)
                    if (event.story.content._uid === story.content._uid) {
                        event.story.content = window.storyblok.addComments(event.story.content, event.story.id)
                        setStory(event.story)
                    }
                })
            }
        })
    })

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