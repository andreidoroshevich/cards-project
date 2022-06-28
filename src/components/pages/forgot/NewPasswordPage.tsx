import React from 'react';
import "./NewPasswordPage.css";
import Grid from "@mui/material/Grid";
import Navbar from "../../Navbar/Navbar";
import {Box} from "@mui/material";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {Link} from "react-router-dom";

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
				<div className={'background'}>
					<Navbar/>
					<Box display="flex" justifyContent="center">
						<Paper elevation={6} className={'paper'}>
							<form onSubmit={formik.handleSubmit}>
								<FormControl>
									<FormGroup>
										<h4 className={'title'}>Create new password</h4>
										<TextField className={'input'}
										           label="Email" margin="none" size={'small'}
										           {...formik.getFieldProps('New password')}/>
										{formik.errors.password ?
											<div className={'error'}>{formik.errors.password}</div> : <br/>}
										<div className={'titleEnterMail'}>
											Create new password and we will send you further instructions to email
										</div>
										<Button type={'submit'} variant={'contained'} color={'primary'}>
											create new password
										</Button>
										<div className={'question'}>
											Bad token?
										</div>
										<Link className={'linkTryLoggingIn'} to="/forgot-password-page">
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