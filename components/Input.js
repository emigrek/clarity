import React from 'react'
import { setGlobalState, useGlobalState } from '../state'

function Input() {
    const [input] = useGlobalState("input");
    const [spell] = useGlobalState("spell");

    const handleInputChange = (e) => {
        setGlobalState("input", e.target.value);
    }

    if(spell)
        return (
            <input 
                placeholder="✨ your guess ✨" 
                className='placeholder:opacity-40 bg-black bg-opacity-20 outline-none p-4 text-center rounded-b-2xl text-gray-200 border-2 border-black border-opacity-30 shadow-lg' 
                value={input} 
                onChange={handleInputChange}
            />
        )
}

export default Input