import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    input: '',
    responseTimes: [],
    spell: null,
    spellLoader: false,
    spellDetails: false,
    spellDetailsTimeout: null,
    locale: {
        code: "en_US",
        language: "English (United States)"
    },
    locales: null,
    randomChampion: null,
    champions: null,
    version: null,
    bgColor: '#171717'
});

export { setGlobalState, useGlobalState };