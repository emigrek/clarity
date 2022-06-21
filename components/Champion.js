import ChampionPortrait from './ChampionPortrait';
import Link from 'next/link'
import { useGlobalState } from '../state';
import { Line } from 'rc-progress';
import { SparklesIcon } from '@heroicons/react/solid'

function Champion({champion}) {
    const [recent] = useGlobalState('recent');

    const isRecent = (spell) => {
        return recent.includes(spell.image.full.slice(0, -4));
    }
    
    const championProgressPercent = () => {
        var score = 0;
        champion.passive.seen && score++;
        champion.spells.forEach(spell => spell.seen && score++ );
        
        return (score/5)*100;
    }
    
    return (
        <Link href={`/champion/${champion.key}`}>
            <div className='relative'>
                {
                    (isRecent(champion.passive) || champion.spells.map(x => isRecent(x)).filter(y => y > 0).length) > 0 && ( 
                        <div className='absolute right-0 top-0 z-50 w-4 h-4 rounded-full animate-pulse bg-amber-400 shadow-lg shadow-amber-400'/>
                    )
                }
                <div className={championProgressPercent() == 100 ? `border-[2px] border-amber-200 flex group hover:bg-opacity-20 flex-col text-center items-center space-y-2 transition-all duration-500 cursor-pointer bg-black rounded-lg px-2 py-3 bg-opacity-40 shadow-lg` 
                 : `border-[2px] border-black flex group hover:bg-opacity-20 flex-col text-center items-center space-y-2 transition-all duration-500 cursor-pointer bg-black rounded-lg px-2 py-3 bg-opacity-40 shadow-lg
                `}>
                    <ChampionPortrait champion={champion}/>
                    <span className="font-medium group-hover:opacity-100 transition-all duration-200 text-sm opacity-80">{champion.name}</span>
                    <div className='flex w-full space-x-2 px-3 items-center'>
                        <div className='w-3/4'>
                            <Line className='rounded-sm' strokeLinecap='butt' percent={championProgressPercent()} strokeWidth={10} trailWidth={10} trailColor="#ffffff11" strokeColor="rgb(252 211 77)" />
                        </div>
                        <div className={championProgressPercent() == 100 ? `relative w-4 h-4 text-amber-400` : `relative w-4 h-4 text-[#ffffff11]`}>
                            <SparklesIcon/>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Champion