import { getSession } from "next-auth/react";

export default function Dashboard() {
    return (<>
        <h1>aj</h1>
    </>)
}

export async function getServerSideProps(cx) {
    const session = await getSession(cx);
    console.log(session)
    // return data to main Page Props
    return {
        props: {},
    };
}