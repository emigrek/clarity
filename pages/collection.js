import { useEffect, useState } from 'react';
import Champion from '../components/Champion';
import { setGlobalState, useGlobalState } from '../state'
import LazyLoad from 'react-lazyload';

function Collection() {
    const [champions] = useGlobalState("champions");

    useEffect(() => {
        setGlobalState("bgColor", '#171717');
    }, []);

    return (
        <div className="flex flex-col items-center scroll-auto will-change-scroll overflow-y-scroll mt-24 w-8/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-content-center gap-4 p-6">
                {
                    champions && champions.map((champion) => (
                        <LazyLoad overflow key={champion.id} height={192}>
                            <Champion champion={champion}/>
                        </LazyLoad>
                    ))
                }
            </div>
        </div>
    )
}

export default Collection