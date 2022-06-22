const initialState = ""


export const forgotReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case "": {
            return {}
        }
        default:
            return state
    }
}
