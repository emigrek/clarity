import Image from 'next/image';
import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../state'
import moment from 'moment';

import SpellLoader from './SpellLoader';
import SpellDetails from './SpellDetails';
import ddragon from '../modules/ddragon';


function Spell() {
  const [version] = useGlobalState("version");
  const [locale] = useGlobalState("locale");
  const [spell] = useGlobalState("spell");
  const [champions] = useGlobalState("champions");
  const [input] = useGlobalState("input");
  const [responseTimes] = useGlobalState("responseTimes");

  const [spellLoader, setSpellLoader] = useState(false);
  const [spellDetails, setSpellDetails] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if(!champions) return;

    setSpellLoader(true);

    var champ = ddragon.getRandomChampion(champions);
    ddragon.getRandomChampionSpell(version, locale, champ, champions);
  }, [champions]);

  useEffect(() => {
    setStartTime(moment());
  }, [spell]);

  useEffect(() => {
    if(!spell) return;

    if(input.toLowerCase().includes(spell.champion.toLowerCase())) {
      setGlobalState("responseTimes", [ moment().diff(startTime, 'milliseconds'), ...responseTimes]);
      setStartTime(null);
      setGlobalState("inputDisabled", true);
      setSpellDetails(true);

      setTimeout(() => {
        setGlobalState("input", '');
        setGlobalState("inputDisabled", false);
        setSpellDetails(false);
        setSpellLoader(true);
        var champ = ddragon.getRandomChampion(champions);
        ddragon.getRandomChampionSpell(version, locale, champ, champions);
      }, 5*1000);
    }
  }, [input]);

  if(spell) 
    return (
      <div className="flex flex-row justify-center align-middle text-center pointer-events-none select-none">
        <div className="flex flex-col justify-center align-middle shadow-lg">   
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <SpellDetails visible={spellDetails}/>
            <SpellLoader visible={spellLoader}/>
            <Image onLoad={() => setSpellLoader(false)} priority layout="fill" className="rounded-t-2xl" src={spell.imageUrl}/>
          </div> 
          <div className="bg-black bg-opacity-50 p-4">
            <div className="text-sm lg:text-md font-medium p-2">{spell.name}</div>
          </div>
        </div>
      </div>
    )
}

export default Spell