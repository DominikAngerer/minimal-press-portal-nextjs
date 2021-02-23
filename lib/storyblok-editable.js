
// usage {...StoryblokEditable(blok)}
const StoryblokEditable = (blok) => {

    if (typeof blok._editable === 'undefined' || elem === null) {
        return
    }

    let options = JSON.parse(blok._editable.replace(/^<!--#storyblok#/, '').replace(/-->$/, ''))

    return {
        'data-blok-c': JSON.stringify(options),
        'data-blok-uid': options.id + '-' + options.uid
    }
}

export default StoryblokEditable
