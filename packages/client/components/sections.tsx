import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ArrowForward } from "@material-ui/icons";

const sectionStyles = makeStyles((theme: Theme) =>
    createStyles({
        // scss syntax
        layout: {
            marginTop: "1.5%",
            display: "table",
            tableLayout: "fixed",
            borderCollapse: "collapse",
            width: "100%",
            position: "relative",
        },
        wrapper: {
            display: "table-cell",
            verticalAlign: "top",
        },
        info: {
            boxShadow: "3px 3px 0px 0px #e8e8e8",
            paddingTop: 38,
            paddingBottom: 28,
            paddingLeft: 25,
            paddingRight: 25,
            display: "inline-block",
            width: "32%",
            marginLeft: 25,
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
            display: "flex",
            fontSize: 50,
            fontWeight: 800,
        },
        change_points: {
            display: "flex",
            width: "72%",
            justifyContent: "flex-end",
            color: "red",
            fontSize: 30,
        },
    }),
);

export default function Sections(): JSX.Element {
    const sectionStyle = sectionStyles();
    return (
        <div>
            <div className={sectionStyle.layout}>
                <div className={sectionStyle.wrapper}>
                    <div className={sectionStyle.info}>
                        <div className={sectionStyle.label}>오차율</div>
                        <div className={sectionStyle.desc}>7월1일 ~ 7월14일</div>
                        <div style={{ display: "flex", flexFlow: "row wrap", marginTop: 40 }}>
                            <div className={sectionStyle.now_points}>6.6 %</div>
                            <div className={sectionStyle.change_points}>↑ 1.2%</div>
                        </div>
                        <div style={{ paddingTop: "2%", marginTop: "5%", borderTop: "1px solid black" }}>
                            <a
                                href="#"
                                style={{
                                    fontSize: 28,
                                    textDecoration: "none",
                                    color: "black",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                <div>Full Report</div>
                                <div style={{ display: "inherit" }}>
                                    <ArrowForward />
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={sectionStyle.info}>
                        <div className={sectionStyle.label}>인센티브</div>
                        <div className={sectionStyle.desc}>7월1일 ~ 7월14일</div>
                        <div style={{ display: "flex", flexFlow: "row wrap", marginTop: 40 }}>
                            <div className={sectionStyle.now_points}>123 원</div>
                            <div className={sectionStyle.change_points}>↑ 1.2%</div>
                        </div>
                        <div style={{ paddingTop: "2%", marginTop: "5%", borderTop: "1px solid black" }}>
                            <a
                                href="#"
                                style={{
                                    fontSize: 28,
                                    textDecoration: "none",
                                    color: "black",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                <div>Full Report</div>
                                <div style={{ display: "inherit" }}>
                                    <ArrowForward />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
