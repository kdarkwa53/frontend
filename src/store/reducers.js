import { combineReducers } from "redux";
// import productReducer from "../Pages/duck/reducers";
import SignUpReducer from "../Modules/SignUp/duck/reducer";
import { loginReducer, userReducer } from "../Modules/Login/duck/reducer";
import { submitMortgage, submitMortgageForPreview, getApplications } from "../Modules/MortgageApply/duck/reducer";
import acceptMortgageReducer from "../Modules/MyApplications/duck/reducer"
import savingsReducer from "../Modules/Savings/duck/reducer"
import { pinReducer, resources } from "../Shared/Components/duck/reducer"
import moneyTransfer from "../Modules/TransferMoney/duck/reducer"
import lang from "../Shared/actions/reducer"
import profileReducer from "../Modules/Profile/duck/reducer"
import prepaidReducer from "../Modules/Prepaid/duck/reducer"
import kycReducer from "../Modules/BusinessKYC/duck/reducer"
import storage from "redux-persist/lib/storage";
import userMgtReducer from "../Modules/UserManagement/duck/reducer"
import { SIGNOUT_REQUEST } from "../Modules/Login/duck/action";


const appReducer = combineReducers({
  userSignUp: SignUpReducer,
  login: loginReducer,
  submittedApplications: getApplications, submitMortgage,
  submissionPreview: submitMortgageForPreview,
  acceptMortgage: acceptMortgageReducer,
  savings: savingsReducer,
  pin: pinReducer,
  user: userReducer,
  transfer: moneyTransfer,
  language: lang,
  profile: profileReducer,
  resources: resources,
  prepaid: prepaidReducer,
  kyc: kycReducer,
  userMgt: userMgtReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT_REQUEST) {
    console.log('I dey here: ', action)
    // for all keys defined in your persistConfig(s)
    storage.removeItem('persist:root')
    // storage.removeItem('persist:otherKey')
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
