import { useGlobalState } from '../state'

import SpellLoader from './SpellLoader';
import SpellDetails from './SpellDetails';
import SpellImage from './SpellImage';


function Spell({ showRandomSpell }) {
  const [spell] = useGlobalState("spell");
  const [spellLoader] = useGlobalState("spellLoader");
  const [spellDetails] = useGlobalState("spellDetails");

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