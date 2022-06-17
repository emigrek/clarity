import { motion, AnimatePresence } from "framer-motion"
import { useGlobalState, setGlobalState } from '../state'

import Image from 'next/image';

function SpellDetails({visible, showRandomSpell}) {
    const [spell] = useGlobalState("spell");
    const [version] = useGlobalState("version");
    const [spellDetailsTimeout] = useGlobalState("spellDetailsTimeout");

    const spellLetter = (spell) => {
        var letters = ['p', 'q', 'w', 'e', 'r'];
        
        switch(spell.image.group) {
            case 'passive':
                return 'p';
            case 'spell':
                return letters[spell.owner.spells.indexOf(spell)+1];
        }
    }

    return (
        <AnimatePresence>
            { visible &&
                <motion.div 
                    onClick={() => {
                        clearTimeout(spellDetailsTimeout);
                        setGlobalState('spellDetailsTimeout', null);
                        showRandomSpell();
                    }}
                    className="cursor-pointer pointer-events-auto absolute bg-black rounded-t-3xl z-20 bg-opacity-70 backdrop-blur-md w-72 h-72 lg:w-80 lg:h-80 transition-all"
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.2 }}
                    exit={{ opacity: 0 }}
                >
                    <div className='flex flex-col justify-evenly items-center p-5 space-y-2 w-72 h-72 lg:w-80 lg:h-80'>
                        <div className="flex space-x-4 items-center justify-between">
                            <div className='text-xl'>
                                {spell.owner.name}  
                            </div>
                            <div className="relative h-8 w-8 rounded-md">
                                <Image className="rounded-md" layout="fill" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/${spell.image.group}/${spell.image.full}`}/>
                            </div>
                            <div className="font-bold bg-black px-2 rounded">
                                {spellLetter(spell).toUpperCase()}
                            </div>
                        </div>       
                        <div>
                            <video controls playsInline muted autoPlay loop className="aspect-video object-cover object-center rounded-md bg-black">
                                <source type="video/webm" 
                                    src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${String(spell.owner.key).padStart(4, '0')}/ability_${String(spell.owner.key).padStart(4, '0')}_${spellLetter(spell).toUpperCase()}1.webm`}
                                />
                            </video>
                        </div>
                        <div className='text-xs opacity-20'>
                            tap or press enter to skip
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default SpellDetails