import Head from 'next/head'

import StoryblokEditable from '../lib/storyblok-editable'

import Storyblok from '../lib/storyblok'
import EditMode from '../lib/storyblok-editmode'
import React, { useState, useEffect } from 'react';

import DynamicComponent from '../components/DynamicComponent'

export default function Home({ story, preview }) {

    if(preview) {
        useEffect(() => {
            if (window.storyblok) {
                console.log('init', window.storyblok)
                window.storyblok.init()
                
                // reload on Next.js page on save or publish event in Storyblok Visual Editor
                window.storyblok.on(['change', 'published'], () => location.reload(true))
                
                // Update story in State on input in Visual Editor
                // this will alter the state and replaces the current story with a current raw story object and resolve relations
                window.storyblok.on('input', (event) => {
                    if (event.story.content._uid === story.content._uid) {
                        event.story.content = window.storyblok.addComments(event.story.content, event.story.id)
                        story = event.story
                    }
                })
            }
        }, [])
    }

  return (
    <>
        <Head>
            <title>{story.name}</title>
            <link rel="icon" href="/favicon.ico" />
            {preview ? <script src={'//app.storyblok.com/f/storyblok-latest.js?t=vJMM43mnqNbmpXmxgBALqAtt'}></script> : ''}
        </Head>

        <header className="py-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-secondary">
              {story.name}
            </h1>
          </div>
        </header>

        <main>
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
        if(!data.links[linkKey].is_folder) {
            paths.push({ params: { slug: data.links[linkKey].slug }})
        } 
    })

    return {
        paths: paths,
        fallback: true 
    }
  }

export async function getStaticProps(context) {
    console.log('Page Context', context)
    let params = {
        // version: 'published'
        version: 'draft'
    }
    if(context.preview) {
        params.version = 'draft'
    }

    let { data } = await Storyblok.get('cdn/stories/' + context.params.slug, params)

    return {
        props: { story: data.story, preview: context.preview || false },
    }
}