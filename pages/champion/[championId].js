import Image from 'next/image';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useGlobalState, setGlobalState } from '../../state';
import { average } from 'color.js'
import { stripHtml } from "string-strip-html";
import chroma from "chroma-js"

import SpellMini from '../../components/SpellMini';
import SpellVideo from '../../components/SpellVideo';

const ChampionPage = () => {
  const router = useRouter()
  const [champions] = useGlobalState('champions');
  const [spellVideo] = useGlobalState('spellVideo');
  const [version] = useGlobalState('version');
  const { championId } = router.query;
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    if(!champion) return;
    average(`https://cdn.communitydragon.org/${version}/champion/${champion.key}/splash-art/centered`, { format: 'hex' }).then(color => {
        var color = chroma(color);

        while(color.luminance() > 0.03)
            color = color.darken(0.5);

        setGlobalState('bgColor', color)
    });
  }, [champion])


  useEffect(() => {
    if(!champions) return;
    const found = champions.find(x => x.id == championId);
    
    if(!found) {
        router.push('/collection');
        return;
    }

    setChampion(found);
    setGlobalState("spellVideo", found.passive);
  }, [champions]);
  
  if(champion)
    return (
        <div className='mt-56 lg:mt-28 flex flex-col justify-center lg:flex-row lg:space-x-4'>
            <div className='flex w-full flex-col align-middle'>
                <div className='relative w-full aspect-video mx-auto shadow-lg rounded-md z-0'>
                    <Image priority layout='fill' className='z-0 rounded-lg' objectPosition={'center'} src={`https://cdn.communitydragon.org/${version}/champion/${champion.key}/splash-art/centered`}/>
                </div>
                <div className='flex flex-col text-center -mt-6'>
                    <span className='text-5xl font-medium z-50'>{ champion.name }</span>
                    <span className='text-md opacity-50 z-50'>{ champion.title }</span>
                </div>
                <div className='flex mt-5 flex-row justify-center items-center space-x-1'>
                    <SpellMini key={champion.passive.id} spell={champion.passive}/>
                    {
                        champion.spells.map((spell) =>(
                            <SpellMini key={spell.id} spell={spell}/>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col my-5 lg:mt-0'>
                <div>
                    <SpellVideo champion={champion} />
                </div>
                <div>
                    { spellVideo && (
                        <div className='flex flex-col'>
                            <div className='flex items-center justify-center flex-row mt-5 px-2 py-4 bg-black bg-opacity-20 rounded-lg'>
                                <div className='text-3xl text-center'>
                                    {spellVideo.name}
                                </div>
                            </div>
                            <div className='flex justify-center items-center mt-2 px-2 py-4 bg-black bg-opacity-20 rounded-lg'>
                                <div className='text-sm max-w-lg text-justify bg-black bg-opacity-80 p-2 rounded-lg opacity-80'>
                                    {stripHtml(spellVideo.description).result}
                                </div>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}

export default ChampionPage