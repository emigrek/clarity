import React, { useEffect, useRef, useState } from 'react'
import { useGlobalState } from '../state';

function SpellVideo({ champion }) {
    const videoEl = useRef(null);
    const [spellVideo] = useGlobalState('spellVideo');
    const [letter, setLetter] = useState('p');

    const spellLetter = () => {
        var letters = ['p', 'q', 'w', 'e', 'r'];
        
        switch(spellVideo.image.group) {
            case 'passive':
                return 'p';
            case 'spell':
                return letters[spellVideo.owner.spells.indexOf(spellVideo)+1];
        }
    }

    useEffect(() => {
        if(!spellVideo) {
            setLetter('p');
            return;
        }
        videoEl.current.pause();
        setLetter(spellLetter());
        videoEl.current.load();
    }, [spellVideo]);

    return (
        <video ref={videoEl} controls playsInline muted autoPlay loop className="w-[528px] lg:w-[1056px] aspect-video object-cover object-center rounded-md bg-black">
            <source type="video/webm" 
                src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${String(champion.key).padStart(4, '0')}/ability_${String(champion.key).padStart(4, '0')}_${letter.toUpperCase()}1.webm`}
            />
        </video>
    );
}
export default SpellVideo