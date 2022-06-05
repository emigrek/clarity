import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    input: '',
    responseTimes: [],
    spell: null,
    spellLoader: false,
    spellDetails: false,
    spellDetailsTimeout: null,
    locale: "en_US",
    locales: null,
    randomChampion: null,
    champions: null,
    version: null,
    bgColor: '#171717'
});

export { setGlobalState, useGlobalState };