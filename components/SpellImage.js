import { setGlobalState, useGlobalState } from '../state'
import Image from 'next/image'
import { average } from 'color.js'
import { useEffect } from 'react'
import chroma from "chroma-js"

function SpellImage() {
    const [spell] = useGlobalState("spell");
    const [version] = useGlobalState("version");

    useEffect(() => {
        average(`https://ddragon.leagueoflegends.com/cdn/${version}/img/${spell.image.group}/${spell.image.full}`, { format: 'hex' }).then(color => {
            var color = chroma(color);

            while(color.luminance() > 0.03)
                color = color.darken(0.5);

            setGlobalState('bgColor', color)
        });
    }, [spell])

    return (
        <Image onLoad={() => {
            setGlobalState('spellLoader',false);
        }} priority layout="fill" className="rounded-t-3xl" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${spell.image.group}/${spell.image.full}`}/>
    )
}

export default SpellImage