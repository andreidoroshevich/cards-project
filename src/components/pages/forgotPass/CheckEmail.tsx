import React from 'react';
import Grid from "@mui/material/Grid";
import style from "./CheckEmail.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {Link, useParams} from "react-router-dom";


const CheckEmail = () => {
	const {email} = useParams()
	const imgURL = 'https://cdn-icons-png.flaticon.com/512/4853/4853171.png'
	return (
		<>
			<Grid container>
				<div className={style.background}>
					<Box display="flex" justifyContent="center">
						<Paper elevation={6} className={style.paper}>
							<div className={style.title}>CHECK EMAIL</div>
							<img className={style.img} src={imgURL}/>
							<div className={style.titleSend}>We`ve send an Email with instructions to</div>
							<div className={style.email}>{email}</div>
							<div className={style.text}>Do you remember your password?</div>
							<div className={style.email}>
								<Link className={style.email} to={'/login-page'}>
									Try logging in
								</Link>
							</div>
						</Paper>
					</Box>
				</div>
			</Grid>
		</>
	);
};

export default CheckEmail;