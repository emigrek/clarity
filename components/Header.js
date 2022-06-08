import Image from 'next/image';
import { CollectionIcon as CO } from '@heroicons/react/outline'
import { SparklesIcon as SO } from '@heroicons/react/outline'

import { CollectionIcon as CS } from '@heroicons/react/solid'
import { SparklesIcon as SS } from '@heroicons/react/solid'
import { useRouter } from 'next/router'


import HeaderIcon from './HeaderIcon';
import LocaleSelect from './LocaleSelect';
import NavItem from './NavItem';
import { setGlobalState, useGlobalState } from '../state';

function Header() {
    const [progress] = useGlobalState("progress");
    const router = useRouter();

    const handleProgressClear = () => {
        setGlobalState("discovered", []);
        localStorage.setItem("discovered", JSON.stringify([]));
    }

    return (
        <div className='z-40 absolute top-1 w-screen flex justify-between align-middle items-start'>
            <div className='flex flex-col space-y-1'>
                <NavItem to="/" active={ router.asPath == "/" } Content={() => (
                    <div className='flex items-center group'>
                        <SS className='hidden group-hover:block h-8'/>
                        <SO className='group-hover:hidden h-8'/>
                        <span className='hidden md:block antialiased font-bold px-5'>Explore</span>
                    </div>
                )}/>
                <NavItem to="/collection" active={ router.asPath == "/collection" } Content={() => (
                    <div className='flex items-center group'>
                        <CS className='hidden group-hover:block h-8'/>
                        <CO className='group-hover:hidden h-8'/>
                        <span className='hidden md:block antialiased font-bold px-5'>Collection</span>
                    </div>
                )}/>
            </div>
            <div className='flex flex-col align-middle items-center select-none'>
                <div className='text-xs font-mono uppercase'>
                    Progress
                </div>
                <div className='font-bold text-4xl'>
                    {progress}%
                </div>
                {
                    progress > 0 && (
                        <div onClick={handleProgressClear} className='rounded-md mt-1 text-xs opacity-40 hover:opacity-100 hover:bg-red-700 transition-colors duration-500 cursor-pointer p-1 bg-white text-black'>
                            tap to clear
                        </div>
                    )
                }
                
            </div>
            <div className='flex space-x-6 items-center opacity-80'>
                <div>
                    <LocaleSelect/>
                </div>
                <a href="https://github.com/emigrek/spellz" target="_blank" rel="noopener noreferrer">
                    <HeaderIcon Icon={() => (       
                        <div className="relative w-8 h-8">
                            <Image layout="fill" src={'/github.png'}/>
                        </div>
                    )}/>   
                </a>
            </div>
        </div>
    )
}

export default Header