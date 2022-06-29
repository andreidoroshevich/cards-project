
const initialState = ""

export const newPasswordReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case "": {
            return
        }
        default:
            return state
    }
}
