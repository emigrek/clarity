import React from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion"
import { useGlobalState } from '../state'
import { stripHtml } from "string-strip-html";

function SpellDetails({visible}) {
    const [spell] = useGlobalState("spell");

    return (
        <AnimatePresence>
            { visible &&
                <motion.div className="absolute bg-black rounded-t-2xl z-20 bg-opacity-70 backdrop-blur-md w-64 h-64 lg:w-80 lg:h-80 transition-all"
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.2 }}
                    exit={{ opacity: 0 }}
                >
                    <div className='flex flex-col align-center items-center justify-center w-64 h-64 lg:w-80 lg:h-80 p-4 gap-3'>
                        <div className='relative w-16 h-16 lg:w-24 lg:h-24 shadow-md'>
                            <Image priority layout="fill" className="rounded-md" src={spell.imageUrl}/>
                        </div>
                        <div className="bg-black bg-opacity-50 rounded-md p-2 text-slate-200 text-xs xl:text-sm">
                            {stripHtml(spell.description).result}
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default SpellDetails