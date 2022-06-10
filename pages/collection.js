import { useEffect, useState } from 'react';
import { setGlobalState, useGlobalState } from '../state'
import { LightningBoltIcon } from '@heroicons/react/solid'
import dynamic from 'next/dynamic';

const Champion = dynamic(() => import('../components/Champion'), {
    ssr: false
});

function Collection() {
    const [champions] = useGlobalState("champions");

    useEffect(() => {
        setGlobalState("bgColor", '#171717');
    }, []);

    return (
        <div className="flex flex-col items-center scroll-auto will-change-scroll overflow-y-scroll mt-24 w-8/12">
            {
                !champions && (
                    <div className='flex flex-col items-center justify-center text-center h-full space-y-6 opacity-50'>
                        <div className='h-14 w-14 animate-ping duration-1000'>
                            <LightningBoltIcon className='relative'/>
                        </div>
                    </div>
                )
            }
            {
                champions && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-content-center gap-4 p-6">
                        {
                            champions.map((champion) => (
                                <Champion key={champion.id} champion={champion}/>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Collection