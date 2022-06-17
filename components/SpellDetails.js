import { motion, AnimatePresence } from "framer-motion"
import { useGlobalState, setGlobalState } from '../state'
import { stripHtml } from "string-strip-html";

function SpellDetails({visible, showRandomSpell}) {
    const [spell] = useGlobalState("spell");
    const [version] = useGlobalState("version");
    const [spellDetailsTimeout] = useGlobalState("spellDetailsTimeout");

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
                        <div className="flex items-center font-medium text-lg">
                            {spell.owner.name}
                        </div>       
                        <div>
                            <div className="bg-black bg-opacity-60 rounded-md p-2 text-slate-200 text-xs xl:text-sm shadow-lg">
                                {stripHtml(spell.description).result}
                            </div>
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