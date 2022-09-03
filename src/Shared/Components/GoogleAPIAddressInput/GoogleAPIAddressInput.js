
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { REACT_APP_GOOGLE_API_URL } from "../../../helpers/contants";

const GoogleAPIAddressInput = (props) => {
    return (
        <GooglePlacesAutocomplete
            {...props}

            selectProps={{
                placeholder: props.default,
                onChange: props.onChange,
                styles: {
                    input: () => ({
                        // ...provided,
                        borderRadius: "8px",
                        minHeight: "60px",
                        backgroundColor: "#F7F7F7"
                    }),

                },
            }}

            apiKey={REACT_APP_GOOGLE_API_URL}
        />
    )
}

export default GoogleAPIAddressInput