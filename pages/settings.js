import { useEffect, useState } from 'react';
import { setGlobalState, useGlobalState } from '../state'
import HeaderIcon from '../components/HeaderIcon';
import LocaleSelect from '../components/LocaleSelect';
import Image from 'next/image';

function Settings() {
    return (
        <div className='flex flex-col justify-center space-y-8 items-center opacity-100'>
            <div className='flex flex-col space-y-4 text-center'>
                <span className='text-xl'>Language</span>
                <LocaleSelect/>
            </div>
            <a href="https://github.com/emigrek/spellz" target="_blank" rel="noopener noreferrer">
                <HeaderIcon Icon={() => (       
                    <div className="relative w-16 h-16">
                        <Image layout="fill" src={'/github.png'}/>
                    </div>
                )}/>   
            </a>
        </div>
    )
}

export default Settings