import React from 'react'
import {Grid} from "@material-ui/core";
import style from '../../common/styles/FormStyles.module.css'
import {useParams} from "react-router-dom";


const CheckEmail = () => {
const {email} = useParams()

    return (

        <div className={style.mainContainer}>

            <Grid container>
                <div className={style.grid}>

                    <Grid item>
                        <div className={style.container}>
                            <div className={style.formTitle}>Check Your Email</div>

                            <div className={style.emailPict}>&#128232;</div>

                            <div className={style.signUpText}>
                                We've send instructions to Email
                               <div className={style.email}>{email}</div>
                            </div>
                        </div>
                    </Grid>
                </div>
            </Grid>
        </div>
    )
}


export default CheckEmail
