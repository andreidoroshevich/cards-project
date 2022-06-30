import {newPasswordType, passAPI} from "../api/passAPI";
import {setAppErrorAC, setAppStatusAC} from "./profileReducer";
import {AppThunk} from "../store/store";
import {Dispatch} from "redux";

const initialState: SetNewPassInitialStateType = {
    info: '',
    isPassChanged: false
}

export type SetNewPassInitialStateType = {
    info: string
    isPassChanged: boolean
}


export const newPasswordReducer = (state = initialState, action: ActionsType): SetNewPassInitialStateType => {
    switch (action.type) {
        case 'NEW-PASSWORD-SUCCESS':
            return {...state, info: action.info}
        case 'IS-PASS-CHANGED':
            return {...state, isPassChanged: action.isPassChanged}
        default:
            return state
    }
}


export const setNewPassTC = (data: newPasswordType): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    passAPI.setNewPassword(data)
        .then((res) => {
            dispatch(setInfoAC(res.info))
            dispatch(isPassChangedAC(true))
        })
        .catch((error) => {
            if (error.response) {
                dispatch(setAppErrorAC(error.response.data.error))
            }
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}


export const setInfoAC = (info: string) => {
    return (
        {
            type: 'NEW-PASSWORD-SUCCESS',
            info
        } as const)
}


export const isPassChangedAC = (isPassChanged: boolean) => {
    return {
            type: 'IS-PASS-CHANGED',
            isPassChanged
        } as const
}

type ActionsType = ReturnType<typeof setInfoAC> | ReturnType<typeof isPassChangedAC>