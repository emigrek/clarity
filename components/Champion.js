import { useGlobalState } from '../state'
import { useEffect, useState } from 'react';
import { average } from 'color.js'
import chroma from "chroma-js"
import SpellMini from './SpellMini';
import ChampionPortrait from './ChampionPortrait';
import { motion, AnimatePresence } from "framer-motion"

function Champion({champion}) {
    const [version] = useGlobalState("version");
    const [accent, setAccent] = useState("#27272A");

    useEffect(() => {
        average(`https://ddragon.leagueoflegends.com/cdn/${version}/img/${champion.image.group}/${champion.image.full}`, { format: 'hex' }).then(color => {
            var color = chroma(color).alpha(0.8);

            setAccent(color)
        });
    }, [])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.2 }}
                className='relative'
            >
                    <div style={{ backgroundColor: accent }} className='px-8 py-6 shadow-lg rounded-lg flex flex-col select-none space-y-4'>
                        <div className='flex items-center justify-between px-4 space-x-6'>
                            <div className='font-medium'>
                                {champion.name}
                            </div>
                            <ChampionPortrait champion={champion}/>
                        </div>
                        <div className='flex flex-row items-center shadow-black shadow-2xl justify-center space-x-1 rounded-xl px-2 py-6 bg-black bg-opacity-50'>
                            <SpellMini key={champion.passive.id} spell={champion.passive}/>
                            {
                                champion.spells.map((spell) =>(
                                    <SpellMini key={spell.id} spell={spell}/>
                                ))
                            }
                        </div>
                    </div>
            </motion.div>    
        </AnimatePresence>
    )
}

export default Champion