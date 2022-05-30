import Head from 'next/head'
import { useEffect } from 'react';
import { setGlobalState, useGlobalState } from "../state";
import Header from '../components/Header';
import App from '../components/App';

export default function Home() {
  async function getVersion() {
    const url = "https://ddragon.leagueoflegends.com/api/versions.json";
    const response = await fetch(url);
    const data = await response.json();

    var lastest = data[0];
    setGlobalState("version", lastest);
  }

  async function getLocales() {
    const url = "https://ddragon.leagueoflegends.com/cdn/languages.json";
    const response = await fetch(url);
    const data = await response.json();
    setGlobalState("locales", data);
  }

  useEffect(() => {
    getVersion();
    getLocales();
  }, []);

  return (
    <div className="bg-neutral-900 text-white">
      <Head>
        <title>Clarity</title>
        <meta name="description" content="Train your spell knowledge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className='flex justify-center w-screen h-screen'>
        <App/>
      </div>
    </div>
  )
}
