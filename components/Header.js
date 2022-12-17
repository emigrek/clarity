import { CollectionIcon as CO } from '@heroicons/react/outline'
import { SparklesIcon as SO } from '@heroicons/react/outline'
import { AdjustmentsIcon as AO } from '@heroicons/react/outline'

import { CollectionIcon as CS } from '@heroicons/react/solid'
import { SparklesIcon as SS } from '@heroicons/react/solid'
import { AdjustmentsIcon as AS } from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useGlobalState } from '../state'

import NavItem from './NavItem';
import Progress from './Progress';
import Link from 'next/link'

function Header() {
    const router = useRouter();
    const [recent] = useGlobalState('recent');

    return (
        <div className='z-50 fixed top-0 w-screen bg-black bg-opacity-20 md:bg-transparent backdrop-blur-xl py-3'>
            <div className='container mx-auto px-4'>
                <div className='flex justify-evenly items-center align-middle'>
                    <Link href="/">
                        <div className='flex text-2xl group justify-center space-x-1 items-center align-middle group cursor-pointer'>
                            <div className='text-xl'>Spell</div><div className='shadow-lg text-sm px-2 py-2 rounded-lg bg-amber-400 group-hover:bg-amber-500 transition-colors duration-100 text-black font-black'>Hub</div>
                        </div>
                    </Link>  
                    <div className='flex flex-row space-x-3'>
                        <NavItem to="/" active={ router.asPath == "/" } Content={() => (
                            <div className='flex items-center align-middle group px-4'>
                                <SS className='hidden group-hover:block h-6'/>
                                <SO className='group-hover:hidden h-6'/>
                                <span className='hidden xl:block antialiased font-bold px-5'>Explore</span>
                            </div>
                        )}/>
                        <NavItem to="/collection" active={ router.asPath == "/collection" } Content={() => (
                            <div className='flex items-center align-middle group px-4'>
                                <CS className='hidden group-hover:block h-6'/>
                                <CO className='group-hover:hidden h-6'/>
                                <span className='hidden xl:block antialiased font-bold px-5'>Collection</span>
                                {
                                    recent.length > 0 && ( 
                                        <span className='mb-3 md:mb-0 animate-pulse -ml-1 bg-amber-400 shadow-amber-400/40 text-black px-1 py-0 border-amber-800 border-opacity-20 border-2 text-xs font-bold rounded-full shadow-lg md:-ml-2'>{recent.length}</span> 
                                    )
                                }
                            </div>
                        )}/>
                        <NavItem to="/settings" active={ router.asPath == "/settings" } Content={() => (
                            <div className='flex items-center align-middle group px-4'>
                                <AS className='hidden group-hover:block h-6'/>
                                <AO className='group-hover:hidden h-6'/>
                                <span className='hidden xl:block antialiased font-bold px-5'>Settings</span>
                            </div>
                        )}/>
                    </div>
                    <div className='hidden md:block'>
                        <Progress/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header