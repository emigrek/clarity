import React from 'react'
import { useEffect } from 'react';
import { setGlobalState, useGlobalState } from '../state'
import Image from 'next/image';

function Header() {
    const [version] = useGlobalState("version");
    const [locale] = useGlobalState("locale");
    const [locales] = useGlobalState("locales");

    const handleLocaleChange = (e) => {
        setGlobalState("locale", e.target.value);
    };

    useEffect(() => {
        var browserLang = navigator.language.replace("-", "_");
        setGlobalState("locale", browserLang);
    }, []);

    return (
        <div className='opacity-50 hover:opacity-100 transition-all absolute top-1 right-1'>
            <div className='flex flex-row items-center justify-center gap-2'>
                <a href="https://github.com/emigrek/spellz" target="_blank" rel="noopener noreferrer">
                    <div className="relative w-8 h-8 mt-1">
                        <Image layout="fill" src={'/github.png'}/>
                    </div>
                </a>
                <div className="text-center">
                    <div>{version}</div>
                    <div>
                        {   locales ? (
                                <select onChange={handleLocaleChange} defaultValue={locale} className="bg-black rounded-md">
                                    {
                                        locales.map((l) => <option key={l} value={l}>{l}</option>)
                                    }
                                </select>
                            ) : (
                                <div>loading locales...</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header