import { motion, AnimatePresence } from "framer-motion"

function SpellLoader({visible}) {
    return (
        <AnimatePresence>
            { visible &&
                <motion.div className="absolute bg-black rounded-t-2xl z-10 bg-opacity-70 backdrop-blur-md w-72 h-72 lg:w-80 lg:h-80 transition-all"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.2 }}
                    exit={{ opacity: 0 }}
                >
                    <div className='flex align-center items-center justify-center w-72 h-72 lg:w-80 lg:h-80'>
                        <div className='text-8xl animate-pulse'>✨</div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default SpellLoader