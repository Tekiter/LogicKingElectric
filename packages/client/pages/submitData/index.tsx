import Head from "next/head";
import MenuBar from "@/components/menuBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "@/components/logo";
import PredictShow from "@/components/submitData/predictShow";
import PredictSubmitter from "@/components/submitData/predictSubmitter";
import ActualSubmitter from "@/components/submitData/actualSubmitter";
import EnvTab from "@/components/envTab";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useAPIRequest } from "@/api/hooks";
import { getPlantInfo } from "@/api/endpoint";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
        layout: {
            display: "flex",
            flexDirection: "row",
            marginTop: "1.5%",
            marginLeft: "2%",
        },
        layout_inner: {
            display: "flex",
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
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const router = useRouter();
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
                <title>????????????????????????:?????????????????? ????????? ???????????????</title>
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
                    <h2 id="simple-modal-title">????????? ?????? ??????!</h2>
                    <p id="simple-modal-description">????????? ????????? ????????????! ????????? ????????? ??????????????????.</p>
                </div>
            </Modal>
            <div className={homeStyle.layout}>
                <div className={homeStyle.layout_inner}>
                    <div>
                        <PredictShow></PredictShow>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <PredictSubmitter></PredictSubmitter>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <ActualSubmitter></ActualSubmitter>
                    </div>
                </div>
                <div style={{ marginLeft: 35 }}>
                    <EnvTab></EnvTab>
                </div>
            </div>
        </div>
    );
}
