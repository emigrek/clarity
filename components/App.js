import { useEffect } from 'react';
import { useGlobalState } from '../state'
import Input from './Input';
import Spell from './Spell';

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
            <Spell/>
            <Input/>
        </div>
    )
}

export default App