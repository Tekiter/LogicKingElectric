import Head from "next/head";
import MenuBar from "@/components/menuBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "@/components/logo";
import EnvTab from "@/components/envTab";
import SmpRecSection from "@/components/smpRec/smpRecSection";
import SmpRecGraph from "@/components/smpRec/smpRecGraph";

export default function Home(): JSX.Element {
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
            <div style={{ display: "flex", flexDirection: "row", marginTop: 54, marginLeft: 38 }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                            <SmpRecSection></SmpRecSection>
                        </div>
                        <div>
                            <SmpRecGraph></SmpRecGraph>
                        </div>
                    </div>
                    <div>
                        <EnvTab></EnvTab>
                    </div>
                </div>
            </div>
        </div>
    );
}
