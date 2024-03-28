import userReducer from "./reducers/userReducers";
import commonReducer from "./reducers/commonReducers";
import { createStore ,combineReducers} from "redux";
import textBookReducers from "./reducers/textBookReducers";
import devToolsEnhancer from 'remote-redux-devtools';


const rootReducer = combineReducers ({
    user: userReducer,
    common:commonReducer,
    textBook:textBookReducers
  })

  const AR_Store = createStore(rootReducer, devToolsEnhancer())

  export default AR_Store
