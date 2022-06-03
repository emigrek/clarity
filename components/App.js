import { useEffect } from 'react';
import { useGlobalState } from '../state'

import Input from './Input';
import Spell from './Spell';
import Statistics from './Statistics';

import ddragon from '../modules/ddragon';


function App() {
    const [locale] = useGlobalState("locale");
    const [version] = useGlobalState("version");

    useEffect(() => {
        if(!version) return;
        ddragon.getChampions(version, locale);
    }, [version, locale]);

    return (
        <div className="flex flex-col align-middle justify-center">
            <div className='shadow-xl rounded-3xl'>
                <Spell/>
                <Input/>
            </div>
            <Statistics/>
        </div>
    )
}

export default App