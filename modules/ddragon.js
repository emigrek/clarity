import { setGlobalState } from "../state/";
import _ from 'lodash';

const championIdToName = (id, champions) => {
    return champions.find(x => x.id === id).name;
}

const getVersion = async () => {
    const url = "https://ddragon.leagueoflegends.com/api/versions.json";
    const response = await fetch(url);
    const data = await response.json();
    setGlobalState("version", data[0]);
}

const getLocales = async () => {
    const data = await getLangCodes();
    setGlobalState("locales", data);
    return data;
}

const getLangCodes = async () => {
    const url = "/langs.json";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
 
const getChampions = async (version, locale) => {
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${locale.code}/championFull.json`;
    const response = await fetch(url);
    const data = await response.json();
    const champions = Object.keys(data.data).map(key => {
        return data.data[key];
    })
    setGlobalState("champions", champions);
}

const getChampionSpells = (champion, data) => {
    var champion = data.find(x => x.id == champion.id);
    champion.passive.owner = champion;
    champion.spells.forEach(spell => {
        spell.owner = champion;
    });
    return [champion.passive, ...champion.spells];
}

const getRandomChampion = (champions) => {
    return _.shuffle(champions).pop();
}


export default {
    championIdToName,
    getVersion,
    getLocales,
    getChampions,
    getChampionSpells,
    getRandomChampion,
    getLangCodes
};