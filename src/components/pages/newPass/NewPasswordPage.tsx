import React from 'react'
import {Button, FormGroup, Grid} from "@material-ui/core";
import {useFormik} from 'formik';
import {Link, Navigate, useParams} from "react-router-dom";
import style from '../../common/styles/FormStyles.module.css'
import {setNewPassTC} from "../../../reducers/newPasswordReducer";
import {ErrorSnackbar} from "../../common/pages/ErrorSnackBar";
import {validateNewPassFormErrors} from "../../../utils/error-utils";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {PATH} from "../Pages";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


type StatePassword = {
    password: string;
    showPassword: boolean;
}
type StateConfirmPassword = {
    confirmPassword: string;
    showConfirmPassword: boolean;
}


export const NewPasswordPage = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.profile.status)
    const isPassChanged = useAppSelector(state => state.newPassword.isPassChanged)
    const {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            return validateNewPassFormErrors(values)
        },
        onSubmit: values => {
            token && dispatch(setNewPassTC({password: values.password, resetPasswordToken: token}))
            formik.resetForm()
        },
    })

    const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
        password: '',
        showPassword: false,
    });

    const [valuesConfirmPassword, setValuesConfirmPassword] = React.useState<StateConfirmPassword>({
        confirmPassword: '',
        showConfirmPassword: false,
    });

    const handleClickShowPassword = () => {
        setValuesPassword({
            ...valuesPassword,
            showPassword: !valuesPassword.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValuesConfirmPassword({
            ...valuesConfirmPassword,
            showConfirmPassword: !valuesConfirmPassword.showConfirmPassword,
        });
    };


    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };




    if (isPassChanged) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }

    return (
        <div className={style.mainContainer}>
            {status === 'loading' && <LinearProgress/>}

            <Grid container>
                <div className={style.grid}>
                    <Grid item>
                        <div className={style.container}>
                            <div className={style.formTitle}>Create New Password</div>
                            <form onSubmit={formik.handleSubmit}>

                                    <div className={style.field}>

                                        <FormGroup>
                                            <FormControl  variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                <Input
                                                    id="password"
                                                    type={valuesPassword.showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    placeholder={'Password'}
                                                    onBlur={(e) => formik.setFieldTouched('password', true) }
                                                    onChange={(e) => formik.setFieldValue('password', e.currentTarget.value)}
                                                    value={formik.values.password}
                                                    autoComplete="on"
                                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}>
                                                                {valuesPassword.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                            {formik.errors.password && formik.touched.password &&
                                                <div style={{color: 'red'}}>{formik.errors.password}</div>}

                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                                <Input
                                                    id="confirmPassword"
                                                    type={valuesConfirmPassword.showConfirmPassword ? 'text' : 'password'}
                                                    name="password"
                                                    placeholder={'Confirm Password'}
                                                    onBlur={(e) => formik.setFieldTouched('confirmPassword', true) }
                                                    onChange={(e) => formik.setFieldValue('confirmPassword', e.currentTarget.value)}
                                                    value={formik.values.confirmPassword}
                                                                                                        autoComplete="on"
                                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowConfirmPassword}
                                                                onMouseDown={handleMouseDownConfirmPassword}>
                                                                {valuesConfirmPassword.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                            {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                                                <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>}

                                            <div className={style.forgotPassword}>
                                                <Link to={'/forgot-password-page'}>Forgot Password?</Link>

                                            </div>
                                            <Button type={'submit'} variant={'contained'}
                                                    color={'primary'}
                                                    disabled={
                                                        !!((!formik.values.password && !formik.values.confirmPassword)
                                                            || (formik.errors.password || formik.errors.confirmPassword))}
                                                        >
                                                CREATE NEW PASSWORD
                                            </Button>
                                            <div className={style.signUpText}>Don't have an account</div>
                                            <div className={style.signUpLinkText}>
                                                <Link to={'/register-page'}>Sign Up</Link>
                                            </div>
                                        </FormGroup>
                                    </div>
                            </form>
                        </div>
                        <ErrorSnackbar/>
                    </Grid>
                </div>
            </Grid>

        </div>
    )
}