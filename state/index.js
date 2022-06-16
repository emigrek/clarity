import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    input: '',
    responseTimes: [],
    spell: null,
    spellLoader: false,
    spellDetails: false,
    spellDetailsTimeout: null,
    discovered: [],
    recent: [],
    progress: 0,
    locale: {
        code: "en_US",
        language: "English (United States)"
    },
    locales: null,
    champions: null,
    spellVideo: null,
    version: null,
    bgColor: '#171717'
});

export { setGlobalState, useGlobalState };