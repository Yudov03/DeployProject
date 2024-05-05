import '../App.css'
import {React, useState} from 'react'
import { Box } from '@mui/material'
import MyTextField from '../components/forms/MyTextField'
import MyPassField from '../components/forms/MyPassField'
import MyButton from '../components/forms/MyButton'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from '../components/AxiosInstance'
import { useNavigate } from 'react-router-dom'

const Login = () =>{
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm()
    
    const submission = (data) => {
        AxiosInstance.post(`login/`,{
            email: data.email, 
            password: data.password,
        })

        .then((response) => {
            console.log(response)
            localStorage.setItem('Token', response.data.token)
            navigate(`/home`)
        })
        .catch((error) => {
            console.error('Error during login', error)
        })
    }

    return(
        <div className={"myBackground "}> 
            <form onSubmit={handleSubmit(submission)}>
            <Box className={"whiteBox"}>

                <Box className={"itemBox"}>
                    <Box className={"title"}> LOGIN PAGE</Box>
                </Box>

                <Box className={"itemBox"}>
                    <MyTextField
                    label={"Email"}
                    name ={"email"}
                    control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyPassField
                    label={"Password"}
                    name ={"password"}
                    control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyButton 
                        label={"Login"}
                        type={"submit"}
                    />
                </Box>

                <Box className={"itemBox"} sx={{flexDirection:'column'}}>
                    {/* <Link to="/register"> No account yet? Please register! </Link> */}
                    <Link className='text-decoration-none' to="/request/password_reset"> Forgot your password? Click here! </Link>
                </Box>


            </Box>

        </form>
            
        </div>
    )

}

export default Login