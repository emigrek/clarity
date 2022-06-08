import { useEffect, useState } from 'react';
import Champion from '../components/Champion';
import { setGlobalState, useGlobalState } from '../state'
import LazyLoad from 'react-lazyload';
import { SearchIcon } from '@heroicons/react/solid'

function Collection() {
    const [champions] = useGlobalState("champions");
    const [search, setSearch] = useState(null);

    const handleSearch = (e) => {
        if(!e.target.value || e.target.value == '') setSearch(null);
        const pass = champions.filter(champion => champion.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearch(pass);
    }

    useEffect(() => {
        setGlobalState("bgColor", '#171717');
    }, []);

    return (
        <div className="flex flex-col items-center scroll-auto will-change-scroll overflow-y-scroll mt-24">
            <div className='sticky top-0 w-full left-0 right-0 z-40'>
                <div className='bg-black bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-lg py-5 px-8'>
                    <div className='flex items-center justify-center'>
                        <div className='bg-black rounded-full flex items-center justify-center align-middle'>
                            <input onChange={handleSearch} placeholder='Search' className='placeholder:opacity-50 bg-transparent outline-none p-2 text-center text-gray-200 w-3/4'/>
                            <div className='p-4'>
                                <SearchIcon className='h-5 w-5'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-6">
                {
                    search ? search.map(champion => (
                        <LazyLoad overflow key={champion.id} height={192}>
                            <Champion champion={champion}/>
                        </LazyLoad>
                    )) : champions && champions.map(champion => (
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