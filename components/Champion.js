import { useGlobalState } from '../state'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { average } from 'color.js'
import chroma from "chroma-js"
import SpellMini from './SpellMini';
import ChampionLoader from './ChampionLoader';

function Champion({champion}) {
    const [version] = useGlobalState("version");
    const [accent, setAccent] = useState("#171717");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        average(`https://ddragon.leagueoflegends.com/cdn/${version}/img/${champion.image.group}/${champion.image.full}`, { format: 'hex' }).then(color => {
            var color = chroma(color).alpha(0.8);

            setAccent(color)
            setLoading(false)
        });
    }, [])

    return (
        <div className='relative'>
            { loading && <ChampionLoader/> }
            <div style={{ backgroundColor: accent }} className='px-8 py-6 shadow-lg rounded-lg flex flex-col select-none space-y-4 transition duration-100 ease-in-out'>
                <div className='flex items-center justify-between px-4 space-x-6'>
                    <div className='font-medium'>
                        {champion.name}
                    </div>
                    <div className="relative w-14 h-14 rounded-md shadow-lg shadow-black">
                        <Image layout="fill" className='rounded-md' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${champion.image.group}/${champion.image.full}`}/>
                    </div>
                </div>
                <div className='flex flex-row items-center shadow-black shadow-2xl justify-center space-x-1 rounded-xl px-2 py-6 bg-black bg-opacity-50'>
                    <SpellMini key={champion.passive.id} spell={champion.passive}/>
                    {
                        champion.spells.map((spell) => ( <SpellMini key={spell.id} spell={spell}/> ))
                    }
                </div>
            </div>
        </div>    
    )
}

export default Champion