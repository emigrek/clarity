import React from 'react'
import { setGlobalState, useGlobalState } from '../state'
import Input from './Input';
import Spell from './Spell';

function App() {
    return (
        <div className="flex flex-col gap-7 align-middle justify-center text-center">
            <Spell/>
            <Input/>
        </div>
    )
}

export default App