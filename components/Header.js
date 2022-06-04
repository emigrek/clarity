import { useEffect } from 'react';
import { setGlobalState, useGlobalState } from '../state'
import Image from 'next/image';

import HeaderIcon from './HeaderIcon';
import LocaleSelect from './LocaleSelect';

function Header() {
    const [version] = useGlobalState("version");

    return (
        <div className='z-50 absolute top-1 w-screen flex items-center p-2 px-3'>
            <div className='flex justify-end flex-grow'>
                <div className='flex space-x-2 items-center opacity-80'>
                    <LocaleSelect/>
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