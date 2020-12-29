import StoryblokClient from 'storyblok-js-client'

const Storyblok = new StoryblokClient({
    accessToken: 'vJMM43mnqNbmpXmxgBALqAtt',
    cache: {
        clear: 'auto',
        type: 'memory'
    }
})

export default Storyblok