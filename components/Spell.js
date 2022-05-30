import Image from 'next/image';
import React from 'react'
import { useEffect } from 'react'
import { setGlobalState, useGlobalState } from '../state'

function Spell() {
  const [version] = useGlobalState("version");
  const [locale] = useGlobalState("locale");
  const [spell] = useGlobalState("spell");
  const [champions] = useGlobalState("champions");
  const [input] = useGlobalState("input");

  function getRandomChampion() {
    var keys = Object.keys(champions);
    return champions[keys[ keys.length * Math.random() << 0]].id;
  }

  function getChampionName(id) {
    return Object.keys(champions).map(key => {
      return champions[key];
    }).find(x => x.id === id).name;
  }

  async function getChampionSpells(champion) {
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/champion/${champion}.json`;
    const response = await fetch(url);
    const data = await response.json();
    var spells = [];
        
    data.data[champion].spells.forEach(skill => {
      spells.push({
            type: 'spell',
            id: skill.id,
            name: skill.name,
            description: skill.description
        });
    });

    var passive = data.data[champion].passive;
      spells.push({
        type: 'passive',
        id: passive.image.full.replace(/\.[^/.]+$/, ""),
        name: passive.name,
        description: passive.description
    });
    
    return spells;  
  }

  async function getRandomSpell(champion) {
    getChampionSpells(champion).then((spells) => {
      var randomSpell = spells[Math.floor(Math.random() * spells.length)];
      randomSpell.imageUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/${randomSpell.type}/${randomSpell.id}.png`;

      randomSpell.champion = getChampionName(champion);
      setGlobalState("spell", randomSpell);
    });
  }

  useEffect(() => {
    if(!champions) return;

    var champ = getRandomChampion();
    getRandomSpell(champ);
  }, [champions])

  useEffect(() => {
    if(!spell) return;

    if(input.toLowerCase().includes(spell.champion.toLowerCase())) {
      setGlobalState("input", '');
      var champ = getRandomChampion();
      getRandomSpell(champ);
    }
  }, [input])

  if(!spell) 
    return (
      <div className="flex flex-row align-middle justify-center text-center">
        <div className="w-64 lg:w-80 md:w-80 sm:w-64 bg-black bg-opacity-50 rounded-lg flex flex-col align-middle justify-center text-center p-5">
          <div className="text-2xl">Loading spell...</div>
        </div>
      </div>
    )

  return (
    <div className="flex flex-row justify-center align-middle text-center pointer-events-none select-none">
      <div className="flex flex-col justify-center align-middle shadow-2xl">
        <div className="relative w-80 h-80">
          <Image priority layout="fill" className="rounded-t-2xl" src={spell.imageUrl}/>
        </div>
        <div className="bg-black bg-opacity-50 p-4 rounded-b-2xl">
          <div className="text-xl font-medium p-2 ">{spell.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Spell