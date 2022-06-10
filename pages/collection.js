import { useEffect, useState } from 'react';
import { setGlobalState, useGlobalState } from '../state'
import { LightningBoltIcon, SearchIcon } from '@heroicons/react/solid'
import dynamic from 'next/dynamic';

const Champion = dynamic(() => import('../components/Champion'), {
    ssr: false
});

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
        <div className="flex flex-col items-center scroll-auto will-change-scroll overflow-y-scroll mt-24 w-8/12">
            <div className='sticky top-0 w-full text-center z-50'>
                <div className='flex items-center justify-center xl:justify-between bg-black shadow-lg px-6 py-5 rounded-lg bg-opacity-60 backdrop-blur-sm'>
                    <div className='group flex items-center flex-shrink bg-black rounded-lg px-4'>
                        <input onChange={(e) => setSearchQ(e.target.value)} placeholder="Search" className='bg-transparent outline-none relative py-2'/>
                        <SearchIcon className='h-5 w-5'/>
                    </div>
                </div>
            </div>
            {
                (!showCollection || !champions) && (
                    <div className='flex flex-col items-center justify-center text-center h-full space-y-6 opacity-50'>
                        <div className='h-6 w-6 animate-ping duration-1000'>
                            <LightningBoltIcon className='relative'/>
                        </div>
                    </div>
                )
            }
            {
                (showCollection && collection) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-content-center gap-4 p-6">
                        {
                            collection.map((champion) => (
                                <Champion key={champion.id} champion={champion}/>
                            ))
                        }
                    </div>
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
    )
}

export default Collection