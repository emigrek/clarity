import React from 'react'
import {useEffect} from 'react';
import { setGlobalState, useGlobalState } from '../state'
import Input from './Input';
import Spell from './Spell';

function App() {
    const [locale] = useGlobalState("locale");
    const [version] = useGlobalState("version");

    async function getChampions() {
        const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/champion.json`;
        const response = await fetch(url);
        const data = await response.json();
        setGlobalState("champions", data.data);
    }

    useEffect(() => {
        if(!version) return;
        getChampions();
    }, [version, locale]);

    return (
        <div className="flex flex-col align-middle justify-center">
            <Spell/>
            <Input/>
        </div>
    )
}

export default App