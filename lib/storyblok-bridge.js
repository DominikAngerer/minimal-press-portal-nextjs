const loadStoryblokBridge = (callback) => {
    const existingScript = document.getElementById('storyblokBridge')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://app.storyblok.com/f/storyblok-latest.js?t=vJMM43mnqNbmpXmxgBALqAtt'
      script.id = 'storyblokBridge'
      document.body.appendChild(script)
      script.onload = () => { 
        if (callback) callback()
      }
    }
    if (existingScript && callback) callback()
  }
  export default loadStoryblokBridge