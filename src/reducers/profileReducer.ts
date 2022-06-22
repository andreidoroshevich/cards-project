const initialState = ""


export const profileReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case "": {
            return {}
        }
        default:
            return state
    }
}
