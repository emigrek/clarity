import Head from 'next/head'
import { useEffect } from 'react';
import { setGlobalState } from "../state";
import Header from '../components/Header';
import App from '../components/App';

export default function Home() {
  useEffect(() => {
    async function getVersion() {
      const url = "https://ddragon.leagueoflegends.com/api/versions.json";
      const response = await fetch(url);
      const data = await response.json();

      var lastest = null;

      if(data) {
        lastest = data[0];
        setGlobalState("version", lastest);
      }
    }

    async function getLocales() {
      const url = "https://ddragon.leagueoflegends.com/cdn/languages.json";
      const response = await fetch(url);
      const data = await response.json();
      setGlobalState("locales", data);
    }

    getVersion();
    getLocales();
  }, []);

  return (
    <div style={{
      background: `linear-gradient(
        rgba(0, 0, 0, 0.9), 
        rgba(0, 0, 0, 0.9)
      ), url('/favicon.ico')`,
      backgroundPosition: `center`,
      backgroundSize: 'cover',
      WebkitBackdropFilter: `blur(50px)`,
      backdropFilter: `blur(50px)`
    }} className="bg-black text-white">
      <Head>
        <title>Clarity</title>
        <meta name="description" content="Train your spell knowledge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className='flex flex-col align-middle justify-center w-screen h-screen text-center'>
        <App/>
      </div>
    </div>
  )
}
