import Head from "next/head";
import MenuBar from "@/components/menuBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "@/components/logo";
import IncenErrorShow from "@/components/incenError/incenErrorShow";
import ErrorGraph from "@/components/incenError/errorGraph";
import EnvTab from "@/components/envTab";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useAPIRequest } from "@/api/hooks";
import { getPlantInfo } from "@/api/endpoint";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const homeStyles = makeStyles((theme: Theme) =>
    createStyles({
        home: {
            display: "flex",
            flexDirection: "row",
        },
        sub_section: {
            display: "flex",
            marginTop: 48,
            marginLeft: 20,
            flexDirection: "column",
        },
        paper: {
            position: "absolute",
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);
export default function Home(): JSX.Element {
    const homeStyle = homeStyles();
    const router = useRouter();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        router.push("/mypage", undefined, { shallow: true });
    };
    const { request } = useAPIRequest(getPlantInfo.endpoint, {
        onError(err) {
            setOpen(true);
        },
    });
    useEffect(() => {
        request(null);
    }, []);
    return (
        <div>
            <Head>
                <title>논리왕전기에너지:신재생에너지 발전량 예측시스템</title>
                <meta name="description" content="" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppBar position="static" style={{ background: "#ffffff" }}>
                <Toolbar>
                    <Logo width={"50%"} height={"50%"}></Logo>
                    <MenuBar />
                </Toolbar>
            </AppBar>
            <Modal open={open} onClose={handleClose}>
                <div style={modalStyle} className={homeStyle.paper}>
                    <h2 id="simple-modal-title">발전소 정보 없음!</h2>
                    <p id="simple-modal-description">발전소 정보가 없습니다! 발전소 정보를 넣어주십시오.</p>
                </div>
            </Modal>
            <div className={homeStyle.home}>
                <div className={homeStyle.sub_section}>
                    <IncenErrorShow type="error"></IncenErrorShow>
                    <ErrorGraph></ErrorGraph>
                </div>
                <div style={{ marginTop: 35, marginLeft: 30 }}>
                    <EnvTab></EnvTab>
                </div>
            </div>
        </div>
    );
}
