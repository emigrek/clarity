import Image from 'next/image';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useGlobalState, setGlobalState } from '../../state';
import { average } from 'color.js'
import { stripHtml } from "string-strip-html";
import chroma from "chroma-js"
import { SparklesIcon } from '@heroicons/react/solid'

import SpellMini from '../../components/SpellMini';
import SpellVideo from '../../components/SpellVideo';

const ChampionPage = () => {
  const router = useRouter()
  const [champions] = useGlobalState('champions');
  const [discovered] = useGlobalState('discovered');
  const [spellVideo] = useGlobalState('spellVideo');
  const [version] = useGlobalState('version');
  const { championKey } = router.query;
  const [champion, setChampion] = useState(null);

  const spellLetter = (spell) => {
    var letters = ['p', 'q', 'w', 'e', 'r'];
    
    switch(spell.image.group) {
        case 'passive':
            return 'p';
        case 'spell':
            return letters[spell.owner.spells.indexOf(spell)+1];
    }
  }

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
    const found = champions.find(x => x.key == championKey);
    
    if(!found) {
        router.push('/collection');
        return;
    }

    setChampion(found);
    setGlobalState("spellVideo", found.passive);
  }, [champions]);
  
  if(champion)
    return (
        <div className='mt-28 lg:mt-36 xl:mt-40 flex flex-col justify-center lg:flex-row lg:space-x-4'>
            <div className='flex w-full flex-col align-middle'>
                <div className='relative w-full aspect-video shadow-lg rounded-md'>
                    <Image layout='fill' className='rounded-lg' objectPosition={'center'} src={`https://cdn.communitydragon.org/${version}/champion/${champion.key}/splash-art`}/>
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
            <div className='flex flex-col space-y-4 my-5 lg:mt-0'>
                <div>
                    { 
                        spellVideo && (
                            <div className='flex items-center justify-between flex-row px-4 py-5 bg-black bg-opacity-50 rounded-lg'>
                                <div className='flex space-x-4 items-center text-center font-medium'>
                                    <div className='p-1 px-2 bg-black rounded-full'>
                                        <span className='opacity-80'>{ spellLetter(spellVideo).toUpperCase()}</span>
                                    </div>
                                    <div className='text-xl'>
                                        {spellVideo.name}
                                    </div>
                                </div>
                                {
                                    discovered.includes(spellVideo.image.full.slice(0, -4)) ? (
                                        <div className='flex items-center space-x-1 justify-center text-amber-400'>
                                            <div>Seen</div>
                                            <div className='relative h-5 w-5'><SparklesIcon/></div>
                                        </div>
                                    ) : (
                                        <div className='flex items-center space-x-1 justify-center opacity-20'>
                                            <div>Seen</div>
                                            <div className='relative h-5 w-5'><SparklesIcon/></div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
                <div>
                    <SpellVideo champion={champion} />
                </div>
                <div>
                    { spellVideo && (
                        <div className='flex justify-center items-center py-4 bg-black bg-opacity-20 rounded-lg'>
                            <div className='text-sm max-w-lg text-justify bg-black bg-opacity-80 p-2 rounded-md opacity-80'>
                                {stripHtml(spellVideo.description).result}
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}

export default ChampionPage