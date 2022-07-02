import axios from "axios";

type PassResponseType = {
	info: string
	error: string
}

//то что мы отправляем на сервак
export type EmailRequestType = {
	email: string
	message: string
}

export type NewPasswordType = {
	password: string
	resetPasswordToken: string|undefined
}

type NewPasswordResponseType = {
	info: string
	error: string
}

const instance = axios.create({
	baseURL: 'https://neko-back.herokuapp.com/2.0',
	withCredentials: true
})


export const passAPI = {
	sendEmail(data: EmailRequestType) {
		return instance.post<PassResponseType>('/auth/forgot', data)
	},
	newPass(data: { resetPasswordToken: string | undefined; password: any }) {
		return instance.post<NewPasswordResponseType>('/auth/set-new-password', data)
	}
}