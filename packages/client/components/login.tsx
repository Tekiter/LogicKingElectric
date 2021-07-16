import Head from "next/head";
import { Button, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useState, useEffect } from "react";
import Logo from "./logo";
import { useAPIRequest } from "@/api/hooks";
import { useAuthTokenSetter, useAuthToken } from "@/state/auth";
import { issueToken, register } from "@/api/endpoint";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
        optional_box: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            fontWeight: "bold",
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

export default function Login(): JSX.Element {
    const router = useRouter();
    const loginStyle = loginStyles();
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [new_username, setNewUsername] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [new_password_sub, setNewPasswordSub] = useState("");
    const authToken = useAuthToken();
    const setAuthToken = useAuthTokenSetter(); // setter
    // const authToken = useAuthToken(); // getter
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const confirm = (main_pass: string, sub_pass: string) => {
        if (main_pass != sub_pass) {
            alert("비밀번호가 일치하지않습니다.");
        } else {
            requestRegister.request({ username: new_username, password: new_password });
            alert("회원가입 완료!");
            handleClose();
        }
    };
    const requestRegister = useAPIRequest(register.endpoint);

    const { request } = useAPIRequest(issueToken.endpoint, {
        onSuccess(res) {
            setAuthToken(res.accessToken);
            alert("로그인 성공!");
            router.push("/");
        },
        onError(err) {
            alert("아이디혹은 패스워드가 틀렸습니다.");
        },
    });
    useEffect(() => {
        if (authToken != "") {
            router.push("/");
        }
    }, [authToken]);
    function do_Login(username: string, password: string) {
        request({ username, password });
    }

    return (
        <div style={{ backgroundColor: "#fafafa" }}>
            <Head>
                <title>논리왕전기에너지:신재생에너지 발전량 예측시스템</title>
                <meta name="description" content="" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                                    type="password"
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
                            <div className={`${loginStyle.above_all} ${loginStyle.optional_box}`}>
                                <span onClick={handleClickOpen}>회원가입</span>
                            </div>
                        </div>
                    </div>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">회원가입</DialogTitle>
                        <DialogContent>
                            <DialogContentText>계정과 비밀번호를 적어주세요</DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id={new_username}
                                label="아이디"
                                fullWidth
                                onChange={e => setNewUsername(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id={new_password}
                                type="password"
                                label="비밀번호"
                                fullWidth
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id={new_password_sub}
                                type="password"
                                label="비밀번호 재입력"
                                fullWidth
                                onChange={e => setNewPasswordSub(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => confirm(new_password, new_password_sub)} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </main>
            </section>
        </div>
    );
}
