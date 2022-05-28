import React from 'react'
import { setGlobalState, useGlobalState } from '../state'

function Input() {
    const [input] = useGlobalState("input");

    const handleInputChange = (e) => {
        setGlobalState("input", e.target.value);
    }

    return (
        <div>
            <input className='bg-white bg-opacity-5 border-0 outline-none p-4 text-center rounded-lg' value={input} onChange={handleInputChange}/>
        </div>
    )
}

export default Input