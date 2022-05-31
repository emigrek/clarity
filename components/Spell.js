import Image from 'next/image';
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import { setGlobalState, useGlobalState } from '../state'
import { motion, AnimatePresence } from "framer-motion"

import SpellLoader from './SpellLoader';


function Spell() {
  const [version] = useGlobalState("version");
  const [locale] = useGlobalState("locale");
  const [spell] = useGlobalState("spell");
  const [champions] = useGlobalState("champions");
  const [input] = useGlobalState("input");

  const [imageLoading, setImageLoading] = useState(false);

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

    setImageLoading(true);
    var champ = getRandomChampion();
    getRandomSpell(champ);
  }, [champions])

  useEffect(() => {
    if(!spell) return;

    if(input.toLowerCase().includes(spell.champion.toLowerCase())) {
      setGlobalState("input", '');

      setImageLoading(true);
      var champ = getRandomChampion();
      getRandomSpell(champ);
    }
  }, [input])

  if(spell) 
    return (
      <div className="flex flex-row justify-center align-middle text-center pointer-events-none select-none">
        <div className="flex flex-col justify-center align-middle shadow-2xl">   
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <SpellLoader visible={imageLoading}/>
            <Image onLoad={() => setImageLoading(false)} priority layout="fill" className="rounded-t-2xl" src={spell.imageUrl}/>
          </div> 
          <div className="bg-black bg-opacity-50 p-4">
            <div className="text-sm lg:text-md font-medium p-2">{spell.name}</div>
          </div>
        </div>
      </div>
    )
}

export default Spell