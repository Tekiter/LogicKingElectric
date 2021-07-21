import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ArrowForward } from "@material-ui/icons";
import EnvTab from "./envTab";
import Graph from "./graph";
import Link from "next/link";

const sectionStyles = makeStyles((theme: Theme) =>
    createStyles({
        // scss syntax
        layout: {
            marginTop: "1.5%",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            position: "relative",
        },
        wrapper: {
            display: "inherit",
            verticalAlign: "top",
            flexFlow: "row",
            justifyContent: "flex-start",
            width: "100%",
            overflow: "auto",
        },
        info: {
            flexBasis: 600,
            boxShadow: "3px 3px 0px 0px #e8e8e8",
            paddingTop: 38,
            paddingBottom: 28,
            paddingLeft: 25,
            paddingRight: 25,
            marginLeft: 25,
            height: "32%",
        },
        label: {
            fontWeight: 700,
            fontSize: 32,
            color: "#333333",
            letterSpacing: "-0.05em",
        },
        desc: {
            fontWeight: 600,
            color: "#a6a6a6",
            fontSize: 20,
            marginTop: 5,
        },
        now_points: {
            fontSize: 50,
            fontWeight: 800,
        },
        change_points: {
            color: "red",
            fontSize: 30,
        },
        report: {
            paddingTop: "2%",
            marginTop: "5%",
            borderTop: "1px solid black",
        },
        report_link: {
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            textDecoration: "none",
            color: "black",
        },
    }),
);

export default function MainSections(): JSX.Element {
    const sectionStyle = sectionStyles();
    return (
        <div>
            <div className={sectionStyle.layout}>
                <div className={sectionStyle.wrapper}>
                    <div className={sectionStyle.info}>
                        <div className={sectionStyle.label}>오차율</div>
                        <div className={sectionStyle.desc}>7월1일 ~ 7월14일</div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
                            <div className={sectionStyle.now_points}>6.6 %</div>
                            <div className={sectionStyle.change_points}>↑ 1.2%</div>
                        </div>
                        <div className={sectionStyle.report}>
                            <a className={sectionStyle.report_link} href="#">
                                <div>Full Report</div>
                                <div style={{ marginLeft: 10, display: "inherit" }}>
                                    <ArrowForward />
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={sectionStyle.info}>
                        <div className={sectionStyle.label}>인센티브</div>
                        <div className={sectionStyle.desc}>7월1일 ~ 7월14일</div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
                            <div className={sectionStyle.now_points}>123 원</div>
                            <div className={sectionStyle.change_points}>↑ 1.2%</div>
                        </div>
                        <div className={sectionStyle.report}>
                            <Link href="#">
                                <a className={sectionStyle.report_link}>
                                    <div>Full Report</div>
                                    <div style={{ marginLeft: 10, display: "inherit" }}>
                                        <ArrowForward />
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <EnvTab></EnvTab>
                </div>
                <div style={{ position: "absolute", marginTop: 350 }}>
                    <Graph width={1400} height={500}></Graph>
                </div>
            </div>
        </div>
    );
}
