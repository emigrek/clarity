import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    input: '',
    inputDisabled: false,
    responseTimes: [],
    spell: null,
    locale: "en_US",
    locales: null,
    randomChampion: null,
    champions: null,
    version: null
});

export { setGlobalState, useGlobalState };