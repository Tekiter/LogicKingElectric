import type { AppProps } from "next/app";

import DateFnsUtils from "@date-io/date-fns";
import koLocale from "date-fns/locale/ko";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { GlobalStyle } from "@/styles/global";
import { RecoilRoot } from "recoil";
import { useAuthTokenLoader } from "@/state/auth";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <RecoilRoot>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
                    <GlobalStyle />
                    <Initialize />
                    <Component {...pageProps} />
                </MuiPickersUtilsProvider>
            </RecoilRoot>
        </>
    );
}

function Initialize() {
    useAuthTokenLoader();
    return <></>;
}

export default MyApp;
