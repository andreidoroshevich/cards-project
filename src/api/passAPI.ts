import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export type PassResponseType = {
    success: boolean
    error: string;
}

type SetNewPassResponseType = {
    info: string
    error: string;
}
export type newPasswordType = {
    password: string
    resetPasswordToken: string
}

export type SendEmailRequestType = {
    email: string
    message: string
}


export const passAPI = {
    sendEmail: (data: SendEmailRequestType) => {
        return instance.post<PassResponseType>('/auth/forgot', data)
            .then((res) => {
                return res.data
            })
    },

    setNewPassword: (data: newPasswordType) => {
    return instance.post<SetNewPassResponseType>('/auth/set-new-password', data)
        .then((res) => {
            return res.data
        })
    },


}

