import type { AppProps } from "next/app";

import { GlobalStyle } from "@/styles/global";
import { RecoilRoot } from "recoil";
import { useAuthTokenLoader } from "@/state/auth";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <RecoilRoot>
                <GlobalStyle />
                <Initialize />
                <Component {...pageProps} />
            </RecoilRoot>
        </>
    );
}

function Initialize() {
    useAuthTokenLoader();
    return <></>;
}

export default MyApp;
