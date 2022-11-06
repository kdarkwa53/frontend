

import { useEffect, useState } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

import axios from 'axios';

const IntInputPhoneNumber = ({ setNum, value, ...restProps }) => {
    const [defaultCountry, setDefaultCountry] = useState('')
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get("https://ipinfo.io/129.219.8.132?token=02dd2e3bea03bd");

                setDefaultCountry(data.country)
            } catch (error) {

            }
        }
        fetchData();
    }, [])
    return (
        <div className='intInputClass'>
            <IntlTelInput
                {...restProps}
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                defaultCountry={defaultCountry.toLocaleLowerCase() ?? null}
                preferredCountries={['gh', 'ng', 'sn', 'us', 'gb']}
                formatOnInit={true}
                value={value}
                fieldName="phone_number"
                onPhoneNumberChange={(isval, val, cdata, fnum) => {
                    setNum(fnum)
                }
                }
            />
        </div>
    )
}

export default IntInputPhoneNumber