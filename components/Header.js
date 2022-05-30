import React from 'react'
import { useEffect } from 'react';
import { setGlobalState, useGlobalState } from '../state'

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
        <div className='opacity-50 absolute top-1 right-1'>
            <div className='flex flex-col text-center'>
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
    )
}

export default Header