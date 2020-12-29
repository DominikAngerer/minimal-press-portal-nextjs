const StoryblokEditable = (blok, elem) => {

    if (typeof blok._editable === 'undefined' || elem === null) {
        return 
    }

    console.log(elem)
    
    let options = JSON.parse(blok._editable.replace(/^<!--#storyblok#/, '').replace(/-->$/, ''))

    elem.setAttribute('data-blok-c', JSON.stringify(options))
    elem.setAttribute('data-blok-uid', options.id + '-' + options.uid)
    
    let className = 'storyblok__outline'
    if (elem.classList) {
        elem.classList.add(className)
    } else if (!new RegExp('\\b'+ className+'\\b').test(elem.className)) {
        elem.className += ' ' + className
    }
  }
  
  export default StoryblokEditable