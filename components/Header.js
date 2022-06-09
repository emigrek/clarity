import Image from 'next/image';
import { CollectionIcon as CO } from '@heroicons/react/outline'
import { SparklesIcon as SO } from '@heroicons/react/outline'

import { CollectionIcon as CS } from '@heroicons/react/solid'
import { SparklesIcon as SS } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

import { useGlobalState } from '../state'


import HeaderIcon from './HeaderIcon';
import LocaleSelect from './LocaleSelect';
import NavItem from './NavItem';
import Progress from './Progress';

function Header() {
    const router = useRouter();
    const [recent] = useGlobalState('recent');

    return (
        <div className='z-40 absolute top-1 w-screen flex justify-between items-start'>
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
                        {
                            recent.length > 0 && ( 
                                <span className='mb-3 md:mb-0 animate-pulse bg-amber-400 text-black px-1 text-sm font-bold rounded-full shadow-lg md:-ml-2'>{recent.length}</span> 
                            )
                        }
                    </div>
                )}/>
            </div>
            <Progress/>
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