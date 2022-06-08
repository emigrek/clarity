import { useGlobalState } from '../state'
import Image from 'next/image'

function SpellMini({spell}) {
    const [version] = useGlobalState("version");

    return (
        <div className="relative h-8 w-8 shadow-lg rounded-lg">
            <Image className={`${spell.seen ? 'rounded-lg' : 'grayscale rounded-lg opacity-50'}`} layout="fill" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${spell.image.group}/${spell.image.full}`}/>
        </div>
    )
}

export default SpellMini