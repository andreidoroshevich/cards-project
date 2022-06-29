import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {loginReducer} from "../reducers/loginReducer";
import {registerReducer} from "../reducers/registerReducer";
import {forgotReducer} from "../reducers/forgotReducer";
import {newPasswordReducer} from "../reducers/newPasswordReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {profileReducer} from "../reducers/profileReducer";
import {useDispatch} from "react-redux";


const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer

})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch=()=>useDispatch<AppDispatch>()

export type AppThunk<ReturnType = void> =ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction>


// @ts-ignore
window.store = store