import { Button, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useState, useEffect } from "react";
import Logo from "./logo";
import { useAPIRequest } from "@/api/hooks";
import { useAuthTokenSetter } from "@/state/auth";
import { issueToken } from "@/api/endpoint";

const loginStyles = makeStyles((theme: Theme) =>
    createStyles({
        above_all: {
            alignItems: "stretch",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            position: "relative",
        },
        section_all: {
            minHeight: "100%",
            overflow: "hidden",
        },
        main: {
            minHeight: "100%",
            order: 4,
            flexGrow: 1,
            justifyContent: "center",
        },
        login_boxBK: {
            alignItems: "center",
        },
        login_box: {
            margin: "15% 20px 20% 20px",
            padding: 20,
            border: "1px solid #e6e6e6",
            borderRadius: 1,
            background: "#ffffff",
            maxWidth: 350,
            width: "100%",
        },
        logo_box: {
            display: "flex",
            alignItems: "center",
            marginBottom: "5%",
        },
        login_box_idpw: {
            //maxWidth: 334,
            display: "flex",
            alignItems: "center stretch",
            flexDirection: "column",
        },
        login_button: {
            marginTop: 10,
            background: "green",
            color: "white",
        },
    }),
);
const ColorButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: "#6fc83f",
        "&:hover": {
            backgroundColor: "#6fc83f",
        },
    },
}))(Button);

// eslint-disable-next-line @typescript-eslint/ban-types
export default function Login(): JSX.Element {
    const loginStyle = loginStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const setAuthToken = useAuthTokenSetter(); // setter
    // const authToken = useAuthToken(); // getter
    const { request } = useAPIRequest(issueToken.endpoint, {
        onSuccess(res) {
            // 성공시, 수행함수 error 시에도 지정가능 유의하기.
            // error modal 구현 요함 (21.07.15.) - goseungduk
            setAuthToken(res.accessToken);
        },
    });
    useEffect(() => {
        if (localStorage["AUTH_TOKEN"] != undefined && localStorage.getItem("AUTH_TOKEN") != "")
            location.href = "/mainpage";
    }, []); // componentWillMount hook 적용 고려 (21.07.15.) - goseungduk

    function do_Login(username: string, password: string) {
        request({ username, password });
        if (localStorage["AUTH_TOKEN"] != undefined && localStorage.getItem("AUTH_TOKEN") != "")
            location.href = "/mainpage";
    }

    return (
        <div style={{ backgroundColor: "#fafafa" }}>
            <section className={`${loginStyle.above_all} ${loginStyle.section_all}`}>
                <main className={`${loginStyle.above_all} ${loginStyle.main}`}>
                    <div className={`${loginStyle.above_all} ${loginStyle.login_boxBK}`}>
                        <div className={`${loginStyle.above_all} ${loginStyle.login_box}`}>
                            <div className={`${loginStyle.above_all} ${loginStyle.logo_box}`}>
                                <Logo width={"80%"} height={"80%"}></Logo>
                            </div>
                            <div className={loginStyle.login_box_idpw}>
                                <TextField
                                    label="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}></TextField>
                                <TextField
                                    label="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}></TextField>
                            </div>
                            <div className={`${loginStyle.above_all} ${loginStyle.login_button}`}>
                                <ColorButton
                                    color="primary"
                                    onClick={() => {
                                        do_Login(username, password);
                                    }}>
                                    <span style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>로그인</span>
                                </ColorButton>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
}
