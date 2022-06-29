import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

type ResponseType = {
    info: string
    error: string;
}

export type RequestPassRecoveryType = {
    email: string
}

export const passAPI = {
    sendEmail: (data: RequestPassRecoveryType) => {
        return instance.post<ResponseType>('/auth/forgot', data)
            .then((res) => {
                return res.data
            })
    }
}

