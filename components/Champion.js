import ChampionPortrait from './ChampionPortrait';
import Link from 'next/link'
import { useGlobalState } from '../state';
import { Line } from 'rc-progress';

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
                <div className="flex group hover:bg-opacity-80 flex-col text-center items-center space-y-2 transition-all duration-500 cursor-pointer bg-black rounded-lg px-2 py-3 bg-opacity-40 shadow-lg">
                    <ChampionPortrait champion={champion}/>
                    <span className="font-medium group-hover:opacity-100 transition-all duration-200 text-sm opacity-80">{champion.name}</span>
                    <div className='w-3/4'>
                        <Line className='rounded-sm' strokeLinecap='butt' percent={championProgressPercent()} strokeWidth={8} trailWidth={8} trailColor="#000000aa" strokeColor="rgb(252 211 77)" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Champion