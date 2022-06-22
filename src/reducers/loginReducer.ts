const initialState = ""

export const loginReducer = (state: any=initialState, action: any): any => {
    switch (action.type) {
        case "": {
            return {}
        }
        default:
            return state
    }
}
