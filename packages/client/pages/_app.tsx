import type { AppProps } from "next/app";

import { GlobalStyle } from "@/styles/global";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}
export default MyApp;
