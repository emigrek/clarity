import ChampionPortrait from './ChampionPortrait';
import Link from 'next/link'
import { useGlobalState } from '../state';

function Champion({champion}) {
    const [recent] = useGlobalState('recent');

    const isRecent = (spell) => {
        return recent.includes(spell.image.full.slice(0, -4));
    }
    
    return (
        <Link href={`/champion/${champion.key}`}>
            <div className='relative'>
                {
                    (isRecent(champion.passive) || champion.spells.map(x => isRecent(x)).filter(y => y > 0).length) > 0 && ( 
                        <div className='absolute right-2 top-0 z-50 w-3 h-3 rounded-full animate-pulse bg-amber-400 shadow-lg'/>
                    )
                }
                <div className="flex group flex-col text-center items-center space-y-1 transition-all duration-500 cursor-pointer">
                    <ChampionPortrait champion={champion}/>
                    <span className="group-hover:opacity-100 transition-all duration-200 text-sm opacity-50">{champion.name}</span>
                </div>
            </div>
        </Link>
    )
}

export default Champion