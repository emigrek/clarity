import Image from 'next/image';
import { CollectionIcon as CO } from '@heroicons/react/outline'
import { SparklesIcon as SO } from '@heroicons/react/outline'
import { AdjustmentsIcon as AO } from '@heroicons/react/outline'

import { CollectionIcon as CS } from '@heroicons/react/solid'
import { SparklesIcon as SS } from '@heroicons/react/solid'
import { AdjustmentsIcon as AS } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

import { useGlobalState } from '../state'

import NavItem from './NavItem';
import Progress from './Progress';

function Header() {
    const router = useRouter();
    const [recent] = useGlobalState('recent');

    return (
        <div className='z-50 fixed top-0 w-screen bg-transparent backdrop-blur-xl py-3'>
            <div className='container mx-auto px-4'>
                <div className='flex justify-between items-center align-middle'>
                    <div className='flex flex-row space-x-3'>
                        <NavItem to="/" active={ router.asPath == "/" } Content={() => (
                            <div className='flex items-center align-middle group px-4'>
                                <SS className='hidden group-hover:block h-8'/>
                                <SO className='group-hover:hidden h-8'/>
                                <span className='hidden md:block antialiased font-bold px-5'>Explore</span>
                            </div>
                        )}/>
                        <NavItem to="/collection" active={ router.asPath == "/collection" } Content={() => (
                            <div className='flex items-center align-middle group px-4'>
                                <CS className='hidden group-hover:block h-8'/>
                                <CO className='group-hover:hidden h-8'/>
                                <span className='hidden md:block antialiased font-bold px-5'>Collection</span>
                                {
                                    recent.length > 0 && ( 
                                        <span className='mb-3 md:mb-0 animate-pulse bg-amber-400 shadow-amber-400/40 text-black px-2 text-sm font-bold rounded-full shadow-lg md:-ml-2'>{recent.length}</span> 
                                    )
                                }
                            </div>
                        )}/>
                        <NavItem to="/settings" active={ router.asPath == "/settings" } Content={() => (
                            <div className='flex items-center align-middle group px-4'>
                                <AS className='hidden group-hover:block h-8'/>
                                <AO className='group-hover:hidden h-8'/>
                                <span className='hidden md:block antialiased font-bold px-5'>Settings</span>
                            </div>
                        )}/>
                    </div>
                    <Progress/>
                </div>
            </div>

        </div>
    )
}

export default Header