import { combineReducers } from "redux";
import alert from "./alerts";
import auth from "./auth";
import profile from "./profile";
import product from "./product";


export default combineReducers({
    alert,
    auth,
    profile,
    product
});