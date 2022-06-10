import { useGlobalState } from '../state'
import Image from 'next/image'
import { useState } from 'react';

function SpellMini({spell}) {
    const [version] = useGlobalState("version");
    const [discovered] = useGlobalState("discovered");
    const [recent] = useGlobalState("recent");
    const [loading, setLoading] = useState(true);

    const isDiscovered = (spell) => {
        return discovered.includes(spell.image.full.slice(0, -4));
    }

    const isRecent = (spell) => {
        return recent.includes(spell.image.full.slice(0, -4));
    }

    return (
        <div className={`
            ${isRecent(spell) ? 'z-20 relative h-8 w-8 rounded-md ring-offset-1 ring-offset-black ring-2 ring-amber-500 shadow-lg shadow-amber-500/40' : 'relative h-8 w-8 shadow-lg rounded-lg'}
        `}>
            { loading && (
                <div className='absolute z-40 top-0 left-0 h-8 w-8 shadow-lg rounded-lg bg-black bg-opacity-50'></div>
            ) }
            <Image onLoad={() => {
                setLoading(false);
            }}  className={`
                ${isDiscovered(spell) ? 'rounded-md bg-black bg-opacity-50' : 'grayscale rounded-md opacity-30 bg-black bg-opacity-50'}
            `} loading="lazy" layout="fill" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${spell.image.group}/${spell.image.full}`}/>
        </div>
    )
}

export default SpellMini