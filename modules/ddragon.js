import { setGlobalState } from "../state/";
import _ from 'lodash';

const championIdToName = (id, champions) => {
    return Object.keys(champions).map(key => {
        return champions[key];
    }).find(x => x.id === id).name;
}

const getVersion = async () => {
    const url = "https://ddragon.leagueoflegends.com/api/versions.json";
    const response = await fetch(url);
    const data = await response.json();
    setGlobalState("version", data[0]);
}

const getLocales = async () => {
    const url = "https://ddragon.leagueoflegends.com/cdn/languages.json";
    const response = await fetch(url);
    const data = await response.json();
    setGlobalState("locales", data);
}

const getChampions = async (version, locale) => {
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale}/champion.json`;
    const response = await fetch(url);
    const data = await response.json();
    setGlobalState("champions", data.data);
}

const getChampionSpells = async (version, locale, champion) => {
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

const getSpellImageUrl = (version, type, id) => {
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/${type}/${id}.png`
}

const getRandomChampionSpell = async (version, locale, champion, champions) => {
    getChampionSpells(version, locale, champion).then((spells) => {
        var randomSpell = _.shuffle(spells).pop();
        randomSpell.imageUrl = getSpellImageUrl(version, randomSpell.type, randomSpell.id);
        randomSpell.champion = championIdToName(champion, champions);
        setGlobalState("spell", randomSpell);
    });
}

const getRandomChampion = (champions) => {
    var keys = Object.keys(champions);
    return champions[keys[ keys.length * Math.random() << 0]].id;
}


export default {
    championIdToName,
    getVersion,
    getLocales,
    getChampions,
    getChampionSpells,
    getSpellImageUrl,
    getRandomChampionSpell,
    getRandomChampion
};