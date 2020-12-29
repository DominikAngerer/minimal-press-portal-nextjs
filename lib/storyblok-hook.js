import { useState, useEffect } from 'react'
import StoryblokBridge from '../lib/storyblok-bridge'

export default function useStoryblok(originalStory) {
    let [story, setStory] = useState(originalStory)

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

    return story
}