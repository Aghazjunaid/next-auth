import React from "react";
import { signIn, getSession } from "next-auth/react";
import {useRouter} from 'next/router'

const Login = () => {
    // Cat eye
    const router = useRouter();
    const [values, setValues] = React.useState({
        email: "",
        password: ""
    });

    const handlePasswordChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onLogin = async (e) => {
        e.preventDefault();

        console.log(values)
        const response = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })
        if(response?.ok && !response?.error){
            router.push('/dashboard')
        } else {
            console.log('handle login error')
        }
        // setLoader(true)
    }

    return (
        <>
            {/* START OF HEAD */}
            <input name='email' onChange={handlePasswordChange}  value={values.email}/>
            <input name='password' onChange={handlePasswordChange}  value={values.password}/>
            <button onClick={onLogin}>Login</button>
        </>
    );
};

export async function getServerSideProps(cx) {
    const session = await getSession(cx);
    if(session){
        return {
            redirect : {
                destination : "/dashboard",
                permanent: false
            }
        }
    }
    // return data to main Page Props
    return {
        props: {},
    };
}

export default Login;