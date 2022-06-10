import Image from 'next/image';
import { useState } from 'react';
import { useGlobalState } from '../state'

function ChampionPortrait({champion}) {
    const [version] = useGlobalState("version");
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-14 h-14 rounded-md shadow-lg shadow-black">
            {
                loading && (
                    <div className="absolute top-0 left-0 z-50 w-14 h-14 bg-black bg-opacity-60 rounded-md shadow-lg"></div>
                )
            }
            <Image onLoad={() => {
                setLoading(false)
            }} loading="lazy" layout="fill" className='rounded-md bg-black bg-opacity-60' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${champion.image.group}/${champion.image.full}`}/>
        </div>
    )
}

export default ChampionPortrait