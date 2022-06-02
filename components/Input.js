import { useRef, useEffect } from 'react'
import { setGlobalState, useGlobalState } from '../state'

function Input() {
    const [input] = useGlobalState("input");
    const [inputDisabled] = useGlobalState("inputDisabled");
    const [spell] = useGlobalState("spell");
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setGlobalState("input", e.target.value);
    }

    useEffect(() => {
        if(!spell) return;
        inputRef.current.focus();
    }, [spell]);

    if(spell)
        return (
            <input
                ref={inputRef}
                placeholder="Champion" 
                className='placeholder:opacity-40 bg-black bg-opacity-20 outline-none p-4 text-center rounded-b-2xl text-gray-200 border-b-2 border-black border-opacity-25 shadow-lg' 
                value={input} 
                disabled={inputDisabled}
                onChange={handleInputChange}
            />
        )   
}

export default Input