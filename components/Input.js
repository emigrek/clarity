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
            <div>
                <input placeholder="Guess ✨" className='bg-black bg-opacity-50 outline-none p-4 text-center rounded-2xl shadow-2xl text-gray-400' value={input} onChange={handleInputChange}/>
            </div>
        )
}

export default Input