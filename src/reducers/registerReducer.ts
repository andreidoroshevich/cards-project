
const initialState = ""

export const registerReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case "": {
            return
        }
        default:
            return state
    }
}
