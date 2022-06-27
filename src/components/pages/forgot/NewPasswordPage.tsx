import React from 'react';
import style from "./NewPasswordPage.module.css";
import Grid from "@mui/material/Grid";
import Navbar from "../../Navbar/Navbar";
import {Box, Link} from "@mui/material";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";

const NewPasswordPage = () => {
	const formik = useFormik({
		initialValues: {
			password: '',
		},
		validate: values => {
			if (!values.password) {
				return {password: 'Password is required'}
			}
		},
		onSubmit: values => {
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
										<h4 className={style.title}>Create new password</h4>
										<TextField className={style.input}
										           label="Email" margin="none" size={'small'}
										           {...formik.getFieldProps('New password')}/>
										{formik.errors.password ?
											<div className={style.error}>{formik.errors.password}</div> : <br/>}
										<div className={style.titleEnterMail}>
											Create new password and we will send you further instructions to email
										</div>
										<Button type={'submit'} variant={'contained'} color={'primary'}>
											create new password
										</Button>
										<div className={style.question}>
											Bad token?
										</div>
										<Link className={style.linkTryLoggingIn} href="/forgot-password-page">
											Forgot password
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

export default NewPasswordPage;