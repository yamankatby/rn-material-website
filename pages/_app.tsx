import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../layout"

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.statusCode) return <Component {...pageProps} />
  return (
    <Layout {...pageProps}>
      <Component />
    </Layout>
  )
}

export default MyApp
