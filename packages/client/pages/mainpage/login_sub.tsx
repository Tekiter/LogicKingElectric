import { Button, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Logo from "../../components/logo";

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
export default function Login(): JSX.Element {
    const loginStyle = loginStyles();
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
                                <TextField label="username"></TextField>
                                <TextField label="password"></TextField>
                            </div>
                            <div className={`${loginStyle.above_all} ${loginStyle.login_button}`}>
                                <ColorButton
                                    color="primary"
                                    onClick={() => {
                                        alert("hi");
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
