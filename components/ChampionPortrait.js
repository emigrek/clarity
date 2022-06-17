import Image from 'next/image';
import { useState } from 'react';
import { useGlobalState } from '../state'

function ChampionPortrait({champion}) {
    const [version] = useGlobalState("version");
    const [loading, setLoading] = useState(true);

    return (
        <div className="shadow-md group-hover:brightness-125 transition duration-150 relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-md">
            {
                loading && (
                    <div className="absolute top-0 left-0 z-50 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-black rounded-md shadow-lg"></div>
                )
            }
            <Image onLoad={() => {
                setLoading(false)
            }} layout="fill" className='rounded-md' src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${champion.image.group}/${champion.image.full}`}/>
        </div>
    )
}

export default ChampionPortrait