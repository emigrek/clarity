import Image from 'next/image';
import { CollectionIcon as CO } from '@heroicons/react/outline'
import { SparklesIcon as SO } from '@heroicons/react/outline'

import { CollectionIcon as CS } from '@heroicons/react/solid'
import { SparklesIcon as SS } from '@heroicons/react/solid'
import { useRouter } from 'next/router'


import HeaderIcon from './HeaderIcon';
import LocaleSelect from './LocaleSelect';
import NavItem from './NavItem';

function Header() {
    const router = useRouter();

    return (
        <div className='z-50 absolute top-1 w-screen flex'>
            <div className='flex justify-between items-start flex-grow'>
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
        </div>
    )
}

export default Header