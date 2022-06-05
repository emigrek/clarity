
import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../state'
import moment from 'moment';

import SpellLoader from './SpellLoader';
import SpellDetails from './SpellDetails';
import ddragon from '../modules/ddragon';
import SpellImage from './SpellImage';


function Spell() {
  const [version] = useGlobalState("version");
  const [locale] = useGlobalState("locale");
  const [spell] = useGlobalState("spell");
  const [champions] = useGlobalState("champions");
  const [input] = useGlobalState("input");
  const [responseTimes] = useGlobalState("responseTimes");
  const [spellLoader] = useGlobalState("spellLoader");
  const [spellDetails] = useGlobalState("spellDetails");

  const [startTime, setStartTime] = useState(null);

  const showRandomSpell = () => {
    setGlobalState("spellLoader", true);
    setGlobalState("spellDetails", false);
    setGlobalState("input", '');
    
    var champ = ddragon.getRandomChampion(champions);
    ddragon.getRandomChampionSpell(version, locale, champ, champions);
  }

  useEffect(() => {
    setStartTime(moment());
  }, [spell]);

  useEffect(() => {
    if(!champions) return;

    showRandomSpell();
  }, [champions]);

  useEffect(() => {
    if(!spell || spellDetails) return;

    if(input.toLowerCase().includes(spell.champion.toLowerCase())) {
      setGlobalState("responseTimes", [ moment().diff(startTime, 'milliseconds'), ...responseTimes]);
      setStartTime(null);
      setGlobalState("spellDetails",true);

      setGlobalState("spellDetailsTimeout",
        setTimeout(() => {
          showRandomSpell();
        }, 5*1000)
      );
    }
  }, [input]);

  if(spell) 
    return (
      <div className="flex flex-row justify-center align-middle text-center pointer-events-none select-none">
        <div className="flex flex-col justify-start align-middle">   
          <div className="relative w-72 h-72 lg:w-80 lg:h-80">
            <SpellDetails visible={spellDetails} showRandomSpell={showRandomSpell}/>
            <SpellLoader visible={spellLoader}/>
            <SpellImage/>
          </div> 
          <div className="bg-black bg-opacity-50 p-5">
            <div className="text-sm lg:text-md font-medium">{spell.name}</div>
          </div>
        </div>
      </div>
    )
}

export default Spell