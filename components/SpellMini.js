import { useGlobalState, setGlobalState } from '../state'
import Image from 'next/image'
import { useState } from 'react';
import { EyeIcon } from '@heroicons/react/solid'

function SpellMini({spell}) {
    const [version] = useGlobalState("version");
    const [discovered] = useGlobalState("discovered");
    const [spellVideo] = useGlobalState("spellVideo");
    const [recent] = useGlobalState("recent");
    const [loading, setLoading] = useState(true);

    const isDiscovered = () => {
        return discovered.includes(spell.image.full.slice(0, -4));
    }

    const isRecent = () => {
        return recent.includes(spell.image.full.slice(0, -4));
    }

    return (
        <div className='rounded-lg relative'>
            {
                spellVideo == spell && (
                    <div className='absolute bg-black rounded-lg m-1 w-5 h-5 opacity-50 left-0 bottom-0 z-40'>
                        <EyeIcon/>
                    </div>
                )
            }
            <div 
                onClick={() => { 
                    setGlobalState('spellVideo', spell);
                    if(isRecent()) {
                        setGlobalState('recent', recent.filter(x => x !== spell.image.full.slice(0, -4)));
                    } 
                }}
                className={`
                    ${isRecent() ? 'rounded-lg cursor-pointer z-20 relative h-16 w-16 ring-offset-1 ring-offset-black ring-2 ring-amber-500 shadow-lg shadow-amber-500/40' : 'cursor-pointer relative h-16 w-16 shadow-lg rounded-lg'}
                `}
            >
                <Image alt="spell" onLoad={() => {
                    setLoading(false);
                }}  className={`
                    ${isDiscovered() ? 'rounded-lg bg-black bg-opacity-50' : 'bg-black bg-opacity-50 grayscale rounded-lg opacity-20'}
                `} loading="lazy" layout="fill" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${spell.image.group}/${spell.image.full}`}/>
            </div>
        </div>
    )
}

export default SpellMini