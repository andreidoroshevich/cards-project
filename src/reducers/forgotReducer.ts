import {AppThunk} from "../store/store";
import {passAPI, SendEmailRequestType} from "../api/passAPI";
import {setAppStatusAC} from "./profileReducer";
import {Dispatch} from "redux";
import {handleServerNetworkError} from "../utils/error-utils";

const initialState: PassInitialStateType = {
    success: false,
}

export type PassInitialStateType = {
    success: boolean
}

export const forgotReducer = (state = initialState, action: ActionsType): PassInitialStateType => {
    switch (action.type) {
        case 'CONFIRM-STATUS':
            return {...state, success: action.success}
        default:
            return state
    }
}

export const recoveryPassTC = (data: SendEmailRequestType): AppThunk => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    passAPI.sendEmail(data)
        .then((res) => {
            dispatch(recoveryPassAC(true))
        })
        .catch((error) => {
                handleServerNetworkError(dispatch,error.response.data.error)
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const recoveryPassAC = (success: boolean) => {
    return (
        {
            type: 'CONFIRM-STATUS',
            success
        } as const
    )
}


type ActionsType = ReturnType<typeof recoveryPassAC>

