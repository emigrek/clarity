import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../state'
import moment from 'moment';
import _ from 'lodash';

import Spell from '../components/Spell';
import Input from '../components/Input';
import Statistics from '../components/Statistics';
import app from '../modules/app';


function App() {
    const [spell] = useGlobalState("spell");
    const [champions] = useGlobalState("champions");
    const [input] = useGlobalState("input");
    const [responseTimes] = useGlobalState("responseTimes");
    const [spellDetails] = useGlobalState("spellDetails");
    
    const [discovered] = useGlobalState("discovered");

    const [startTime, setStartTime] = useState(null);
  
    useEffect(() => {
      setStartTime(moment());
    }, [spell]);
  
    useEffect(() => {
      if(!champions) return;
  
      setGlobalState("spellLoader", true);
      setGlobalState("spellDetails", false);
      setGlobalState("input", '');
      
      app.getUnseenSpell(champions);
    }, [champions]);
  
    useEffect(() => {
      if(!spell || spellDetails) return;
  
      if(input.toLowerCase().includes(spell.owner.name.toLowerCase())) {
        var disc = [spell.image.full.slice(0, -4), ...discovered];

        setGlobalState("discovered", disc);
        localStorage.setItem("discovered", JSON.stringify(disc));
        app.calculateProgress(champions);

        setGlobalState("responseTimes", [ moment().diff(startTime, 'milliseconds'), ...responseTimes]);
        setStartTime(null);
        setGlobalState("spellDetails",true);
  
        setGlobalState("spellDetailsTimeout",
          setTimeout(() => {
            setGlobalState("spellLoader", true);
            setGlobalState("spellDetails", false);
            setGlobalState("input", '');
            
            app.getUnseenSpell(champions);
          }, 5*1000)
        );
      }
    }, [input]);


    return (
        <div className="flex flex-col align-middle justify-center z-50">
          <div className='shadow-lg rounded-3xl backdrop-blur-md'>
            <Spell/>
            <Input/>
          </div>
          <Statistics/>
        </div>
    )
}

export default App