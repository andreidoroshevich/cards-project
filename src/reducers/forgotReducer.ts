import {AppThunk} from "../store/store";
import {passAPI, RequestPassRecoveryType} from "../api/passAPI";
import {setAppErrorAC, setAppStatusAC} from "./profileReducer";
import {Dispatch} from "redux";

const initialState: InitialStateType = {
    info: ''
}

type InitialStateType = {
    info: string
}

export const forgotReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CONFIRM-STATUS':
            return {...state, info: action.info}
        default:
            return state
    }
}

export const recoveryPassTC = (data: RequestPassRecoveryType): AppThunk => (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        passAPI.sendEmail(data)
            .then((res) => {
                dispatch(recoveryPassAC(res.info))
                console.log(res.info)
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

export const recoveryPassAC = (info: string) => {
    return (
        {
            type: 'CONFIRM-STATUS',
            info
        } as const
    )
}

type ActionsType = ReturnType<typeof recoveryPassAC>

