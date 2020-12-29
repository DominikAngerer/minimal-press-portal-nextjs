export default async (req, res) => {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  
    // We will fetch the data in setStaticProps later, so here we only return an empty object to set the cookie
    res.setPreviewData({ })
  
    // Redirect to the path from the fetched entry
    let slug = req.query.slug

    // handle 'home' slug
    if(slug === 'home') {
        slug = ''
    }

    // redirect to page we actually want to visit with the set cookie
    res.redirect('/' + slug + '?_storyblok=1&cv='+ Date.now())
  }