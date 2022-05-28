import React from 'react'
import { setGlobalState, useGlobalState } from '../state'

function Header() {
    const [version] = useGlobalState("version");
    const [locale] = useGlobalState("locale");
    const [locales] = useGlobalState("locales");

    const handleLocaleChange = (e) => {
        setGlobalState("locale", e.target.value);
    };

    return (
        <div className='opacity-50 absolute top-1 right-1'>
            <div>{version}</div>
            <div>
                {   locales ? (
                        <select onChange={handleLocaleChange} placeholder={locale} className="bg-black">
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
    )
}

export default Header