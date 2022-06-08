import _ from 'lodash';
import { setGlobalState } from "../state/";

const syncSeen = (champions) => {
    var seen = JSON.parse(localStorage.getItem("discovered")) || [];

    champions.forEach(champion => {
      if(seen.includes(champion.passive.image.full.slice(0, -4)))
        champion.passive.seen = true;
      else champion.passive.seen = false;
      
      champion.spells.forEach(spell => {
        if(seen.includes(spell.image.full.slice(0, -4)))
          spell.seen = true;
        else spell.seen = false;
      });
    })
}

const getSpells = (champions) => {
    var spells = [];

    champions.forEach(champion => {
        champion.passive.owner = champion;
        spells.push(champion.passive);

        champion.spells.forEach(spell => { 
            spell.owner = champion;
            spells.push(spell);
        });
    });

    return spells;
}

const calculateProgress = (champions) => {
  const spells = getSpells(champions);
  const seen = spells.filter(spell => !spell.seen);
  setGlobalState("progress", _.ceil((100 - (seen.length/spells.length)*100),0))
}

export default {
    syncSeen,
    getSpells,
    calculateProgress
}