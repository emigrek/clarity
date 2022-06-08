import { useRef, useEffect } from 'react'
import { setGlobalState, useGlobalState } from '../state'
import utils from '../modules/utils';

function Input() {
    const [input] = useGlobalState("input");
    const [champions] = useGlobalState("champions");
    const [spell] = useGlobalState("spell");
    const [spellDetailsTimeout] = useGlobalState("spellDetailsTimeout");

    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setGlobalState("input", e.target.value);
    }

    const handleKeyDown = (e) => {
        if(e.key !== 'Enter') return;
        
        clearTimeout(spellDetailsTimeout);

        setGlobalState('spellDetailsTimeout', null);
        setGlobalState("spellLoader", true);
        setGlobalState("spellDetails", false);
        setGlobalState("input", '');
        
        const spells = utils.getSpells(champions);
        const notseen = spells.filter(spell => !spell.seen);
        const spell = _.shuffle(notseen).pop();
        setGlobalState("spell", spell);
    }

    useEffect(() => {
        if(!spell) return;
        inputRef.current.focus();
    }, [spell]);

    if(spell)
        return (
            <div className='flex justify-center items-center flex-col bg-black bg-opacity-50 rounded-b-3xl'>
                <div className='py-5 w-10/12 flex justify-center flex-col border-t border-white border-opacity-10'>
                    <input
                        ref={inputRef}
                        placeholder="Champion (enter to skip)" 
                        className='placeholder:opacity-40 bg-black bg-opacity-60 rounded-full outline-none p-4 text-center text-gray-200' 
                        value={input} 
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        )   
}

export default Input