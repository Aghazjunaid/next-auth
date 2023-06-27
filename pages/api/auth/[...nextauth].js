import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                const res = await fetch(`https://api.terseel.com/api/v1/superuser/login`,{
                    method:"POST",
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                })

                const json = await res.json();
                if(res.status === 200 && json){
                    return json.data
                } else {
                    throw new Error('Incorrect email or password')
                }
            }
        })
    ],
    pages: {
        signIn: "/"
    },
    session: {
        jwt: true
    },
    jwt:{
        secret: "jhdfdwirtj3t3t3ghiufr9734ui34tbjgfb" //add in env
    },
    callbacks:{
        async jwt({token, user, account}){
            if(account){
                token.accessToken = user.token
                token.results = user.results
            }
            return token
        },
        async session({session,token}){
            console.log(token,'sss')
            session.token = token.accessToken;
            session.user.id = token.results.id
            session.user.email = token.results.email
            return session
        }
    }
}

export default NextAuth(authOptions);
