import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="prose">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
