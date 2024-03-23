import userReducer from "./reducers/userReducers";
import commonReducer from "./reducers/commonReducers";
import { createStore ,combineReducers} from "redux";
import devToolsEnhancer from 'remote-redux-devtools';
import mapRededucer from "./reducers/mapReducers";


const rootReducer = combineReducers ({
    user: userReducer,
    common:commonReducer,
    map:mapRededucer
  })
  
  const AR_Store = createStore(rootReducer, devToolsEnhancer())
  
  export default AR_Store