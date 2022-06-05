import Head from 'next/head'
import { useEffect } from 'react';
import Header from '../components/Header';
import App from '../components/App';
import { useGlobalState } from '../state'
import ddragon from '../modules/ddragon';

export default function Home() {
  const [bgColor] = useGlobalState("bgColor");

  useEffect(() => {
    ddragon.getVersion();
    ddragon.getLocales();
  }, []);

  return (
    <div className="text-white transition-all ease-in-out duration-1000" style={{backgroundColor: bgColor}}>
      <Head>
        <title>Spellz</title>
        <meta name="description" content="Train your spell knowledge" />
        <link rel="icon" href="/ico.ico" />
      </Head>
      <Header/>
      <div className='flex justify-center w-screen h-screen'>
        <App/>
      </div>
    </div>
  )
}
