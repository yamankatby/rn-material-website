import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout {...pageProps}>
      <Component />
    </Layout>
  )
}

export default MyApp
