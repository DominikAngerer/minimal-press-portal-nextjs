import '../styles/globals.css'
import SiteLayout from '../components/SiteLayout'

function MyApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  )
}

export default MyApp
