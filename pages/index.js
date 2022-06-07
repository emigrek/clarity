import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../state'
import moment from 'moment';
import _ from 'lodash';

import ddragon from '../modules/ddragon';
import Spell from '../components/Spell';
import Input from '../components/Input';
import Statistics from '../components/Statistics';


function App() {
    const [version] = useGlobalState("version");
    const [locale] = useGlobalState("locale");
    const [spell] = useGlobalState("spell");
    const [champions] = useGlobalState("champions");
    const [input] = useGlobalState("input");
    const [responseTimes] = useGlobalState("responseTimes");
    const [spellDetails] = useGlobalState("spellDetails");

    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        if(!version) return;
        ddragon.getChampions(version, locale);
    }, [version, locale]);

    const showRandomSpell = () => {
      setGlobalState("spellLoader", true);
      setGlobalState("spellDetails", false);
      setGlobalState("input", '');
      
      const champ = ddragon.getRandomChampion(champions);
      const spells = ddragon.getChampionSpells(champ, champions);
      const spell = _.shuffle(spells).pop();
      setGlobalState("spell", spell);
      console.log(spell);
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
  
      if(input.toLowerCase().includes(spell.owner.name.toLowerCase())) {
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

    return (
        <div className="flex flex-col align-middle justify-center">
            <div className='shadow-lg rounded-3xl backdrop-blur-md'>
              <Spell showRandomSpell={showRandomSpell}/>
              <Input/>
            </div>
            <Statistics/>
        </div>
    )
}

export default App