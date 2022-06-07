import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header';
import { useGlobalState, setGlobalState } from '../state'
import { useEffect } from 'react'; 
import ddragon from '../modules/ddragon';

function MyApp({ Component, pageProps }) {
  const [bgColor] = useGlobalState("bgColor");
  const [locales] = useGlobalState("locales");
  const [version] = useGlobalState("version");
  const [locale] = useGlobalState("locale");

  useEffect(() => {
    ddragon.getVersion();
    ddragon.getLocales();
  }, []);

  useEffect(() => {
    if(!version) return;
    ddragon.getChampions(version, locale);
  }, [version, locale]);

  useEffect(() => {
    if(!locales) return;
    const browser = navigator.language.replace("-", "_");
    const user = locales.find(x => x.code === browser);
    setGlobalState("locale", user);
  }, [locales]);

  return (
    <div className="text-white transition-all ease-in-out duration-1000" style={{backgroundColor: bgColor}}>
      <Head>
        <title>Spellz</title>
        <meta name="description" content="Train your spell knowledge" />
        <link rel="icon" href="/ico.ico" />
      </Head>
      <Header/>
      <div className='flex justify-center w-screen h-screen'>
      <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
