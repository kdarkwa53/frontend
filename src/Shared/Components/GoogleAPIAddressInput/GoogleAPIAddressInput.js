
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { REACT_APP_GOOGLE_API_URL } from "../../../helpers/contants";

const GoogleAPIAddressInput = (props) => {
    return (
        <GooglePlacesAutocomplete
            {...props}
            
            selectProps={{
                placeholder: props.default,
                value:props?.value,
                onChange: props.onChange,
                styles: {
                    input: () => ({
                        // ...provided,
                        borderRadius: "8px",
                        minHeight: "55px",
                        backgroundColor: "#F7F7F7"
                    }),
                    placeholder: () => ({
                        color: "black"
                    })

                },
            }}

            apiKey={REACT_APP_GOOGLE_API_URL}
        />
    )
}

export default GoogleAPIAddressInput