import { setGlobalState, useGlobalState } from '../state'
import Image from 'next/image'
import { average } from 'color.js'
import { useEffect } from 'react'
import chroma from "chroma-js"

function SpellImage() {
    const [spell] = useGlobalState("spell");

    useEffect(() => {
        average(spell.imageUrl, { format: 'hex' }).then(color => {
            var color = chroma(color);

            while(color.luminance() > 0.03)
                color = color.darken(0.5);

            setGlobalState('bgColor', color)
        });
    }, [spell])

    return (
        <div>
            <Image onLoad={() => {
                setGlobalState('spellLoader',false);
            }} priority layout="fill" className="rounded-t-3xl" src={spell.imageUrl}/>
        </div>
    )
}

export default SpellImage