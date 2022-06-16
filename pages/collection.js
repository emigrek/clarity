import { useEffect, useState } from 'react';
import { setGlobalState, useGlobalState } from '../state'
import { SearchIcon } from '@heroicons/react/solid'

import CollectionLoader from '../components/CollectionLoader';
import ChampionGrid from '../components/ChampionGrid';

function Collection() {
    const [champions] = useGlobalState("champions");
    const [collection, setCollection] = useState([]);
    const [showCollection, setShowCollection] = useState(false);
    const [searchQ, setSearchQ] = useState('');

    useEffect(() => {
        setShowCollection(false);
        if(searchQ != '') {
            const match = champions.filter(champion => 
                champion.name.toLowerCase().indexOf(searchQ.toLowerCase()) > -1 ||
                champion.passive.name.toLowerCase().indexOf(searchQ.toLowerCase()) > -1 ||
                champion.spells.filter(spell => spell.name.toLowerCase().indexOf(searchQ.toLowerCase()) > -1).length
            );
    
            setCollection(match);
        } else {
            setCollection(champions);
        }

        const timeout = setTimeout(() => setShowCollection(true), 1000);
        return () => clearTimeout(timeout);
    }, [searchQ])

    useEffect(() => {
        if(!champions) return;
        setCollection(champions);
    }, [champions]);

    useEffect(() => {
        setGlobalState("bgColor", '#171717');

        const timeout = setTimeout(() => setShowCollection(true), 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className='flex flex-col items-center mt-24 w-full'>
            <div className='flex items-center my-4 shadow-lg z-50'>
                <div className='flex items-center flex-shrink bg-black rounded-xl px-4 py-1'>
                    <input onChange={(e) => setSearchQ(e.target.value)} placeholder="Search" className='bg-transparent text-white outline-none relative py-2'/>
                    <SearchIcon className='opacity-50 h-5 w-5'/>
                </div>
            </div>
            <div className="flex flex-col items-center w-full h-full overflow-y-scroll scroll-smooth">
                {
                    (!showCollection || !champions) && (
                        <CollectionLoader/>
                    )
                }
                {
                    (showCollection && collection) && (
                        <ChampionGrid collection={collection}/>
                    )
                }
                {
                    (showCollection && (!collection.length)) && (
                        <div className='flex flex-col items-center justify-center space-y-12 text-center opacity-50'>
                            No results match your criteria. 😥
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Collection