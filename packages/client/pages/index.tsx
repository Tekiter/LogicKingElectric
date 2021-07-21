import Head from "next/head";
import MenuBar from "@/components/menuBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "@/components/logo";
import MainSections from "@/components/sections";
import { useMemo } from "react";
import { useAPIRequest } from "@/api/hooks";
import { authorize } from "@/api/endpoint";

export default function Home(): JSX.Element {
    // Ctrl+Space : check children
    // Don't use arrow function
    const authorization = useAPIRequest(authorize.endpoint);
    useMemo(() => {
        authorization.request(null);
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
            <MainSections></MainSections>
        </div>
    );
}
