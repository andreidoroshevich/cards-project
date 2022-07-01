import {Dispatch} from "redux";
import {AuthAPI, LoginParamsType} from "../api/loginAPI";
import {handleServerNetworkError} from "../utils/error-utils";
import {setAppStatusAC, setProfileAC} from "./profileReducer";
import {AppThunk} from "../store/store";

const initialState = {
    isLoggedIn: false,
}

export type InitialStateType = typeof initialState

export const loginReducer = (state:InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'LOGIN/SET-IS-LOGGED-IN',
        value
    } as const
}


type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>

export type LoginActionsType = SetIsLoggedInType

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthAPI.login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setProfileAC(res))
        })
        .catch((e) => {
            handleServerNetworkError(dispatch, e.response.data.error)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const logoutTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AuthAPI.logout()
        .then((res) => {
            if (res.info) {
                dispatch(setIsLoggedInAC(false))
            }
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}