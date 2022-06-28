import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import Navbar from "../../Navbar/Navbar";
import style from './ForgotPasswordPage.module.css'
import TextField from "@mui/material/TextField";
import {useDispatch} from "react-redux";
import Paper from '@mui/material/Paper';
import {Box} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

const ForgotPasswordPage = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validate: values => {
			if (!values.email) {
				return {email: 'Email is required'}
			}
		},
		onSubmit: values => {
			navigate(`/check-email/${values.email}`)
			// dispatch(loginTC(values));
		},
	})

	return (
		<>
			<Grid container>
				<div className={style.background}>
					<Navbar/>
					<Box display="flex" justifyContent="center">
						<Paper elevation={6} className={style.paper}>
							<form onSubmit={formik.handleSubmit}>
								<FormControl>
									<FormGroup>
										<h4 className={style.title}>Forgot your password?</h4>
										<TextField className={style.input}
										           label="Email" margin="none" size={'small'}
										           {...formik.getFieldProps('email')}/>
										{formik.errors.email ?
											<div className={style.error}>{formik.errors.email}</div> : <br/>}
										<div className={style.titleEnterMail}>
											Enter your email adress and we will send you further instruction
										</div>
										<Button type={'submit'} variant={'contained'} color={'primary'}>
											Send instruction
										</Button>
										<div className={style.question}>
											Did you remember your password?
										</div>
										<Link className={style.linkTryLoggingIn} to={'/login-page'} >
											Try logging in
										</Link>
									</FormGroup>
								</FormControl>
							</form>
						</Paper>
					</Box>
				</div>
			</Grid>
		</>
	);
};

export default ForgotPasswordPage;

