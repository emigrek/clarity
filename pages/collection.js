import { useEffect } from 'react';
import Champion from '../components/Champion';
import { setGlobalState, useGlobalState } from '../state'
import LazyLoad from 'react-lazyload';

function Collection() {
    const [champions] = useGlobalState("champions");

    useEffect(() => {
        setGlobalState("bgColor", '#171717');
    }, []);

    return (
        <div className="flex flex-col scroll-smooth overflow-y-auto mt-16 w-9/12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-5">
                {
                    champions && champions.map(champion => (
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