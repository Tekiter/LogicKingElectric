import Head from "next/head";
import Login from "./login";

export default function Home(): JSX.Element {
    // Ctrl+Space : check children
    // Don't use arrow function
    return (
        <div>
            <Head>
                <title>Electric</title>
                <meta name="description" content="" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Login></Login>
            <main></main>
            <footer></footer>
        </div>
    );
}
