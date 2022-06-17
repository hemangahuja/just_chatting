import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (<>
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/kimeiga/bahunya/dist/bahunya.min.css"
  />
  <Component {...pageProps} />
  </>
  )
}

export default MyApp
