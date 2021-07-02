import Head from "next/head";
import Login from "./components/login";

export default function Home(): JSX.Element {
    // Ctrl+Space : check children
    // Don't use arrow function
    return (
        <div>
            <Head>
                <title>Electric</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Login></Login>
            <main></main>

            <footer></footer>
        </div>
    );
}
