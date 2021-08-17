import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ArrowForward } from "@material-ui/icons";
import EnvTab from "./envTab";
import Graph from "./graph";
import Link from "next/link";
import { monthlyHistoryReport } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { format } from "date-fns";
import { useEffect, useState } from "react";

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
            boxShadow: "0px 5px 4px rgba(0,0,0,0.25);",
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
const month = format(new Date(), "MM");
const day = format(new Date(), "dd");
export default function MainSections(): JSX.Element {
    const sectionStyle = sectionStyles();
    const [errorValue, setError] = useState(0);
    const [incenValue, setIncentive] = useState(0);
    const [errorChangeRate, setEChnageRate] = useState(0);
    const [errorColor, setEColor] = useState("#00BE13");

    const { request } = useAPIRequest(monthlyHistoryReport.endpoint, {
        onSuccess(res) {
            let last_error_mean = 0,
                _last_error_mean = 0;
            let last_incen_mean = 0;
            res.records.map((daily, idx) => {
                if (daily.errorRate != undefined && daily.incentive != undefined && idx != Number(day) - 1) {
                    last_error_mean += daily.errorRate;
                    _last_error_mean += daily.errorRate;
                    last_incen_mean += daily.incentive;
                } else {
                    if (daily.errorRate != undefined) last_error_mean += daily.errorRate;
                    if (daily.incentive != undefined) last_incen_mean += daily.incentive;
                }
            });
            last_error_mean = last_error_mean / Number(day);
            _last_error_mean = _last_error_mean / (Number(day) - 1);
            if (last_error_mean - _last_error_mean < 0) setEColor("red");
            else setEColor("#00BE13");
            setError(last_error_mean);
            setEChnageRate(last_error_mean - _last_error_mean);
            setIncentive(last_incen_mean);
        },
    });
    useEffect(() => {
        request(null);
    }, []);
    return (
        <div>
            <div className={sectionStyle.layout}>
                <div className={sectionStyle.wrapper}>
                    <div className={sectionStyle.info}>
                        <div className={sectionStyle.label}>오차율</div>
                        <div className={sectionStyle.desc}>
                            {month}월 01일 ~ {month}월 {day}일
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
                            <div className={sectionStyle.now_points}>{Math.floor(errorValue * 100) / 100} %</div>
                            <div className={sectionStyle.change_points} style={{ color: errorColor }}>
                                {Math.floor(errorChangeRate * 100) / 100}%
                            </div>
                        </div>
                        <div className={sectionStyle.report}>
                            <Link href="/errorRate">
                                <a className={sectionStyle.report_link}>
                                    <div>Full Report</div>
                                    <div style={{ marginLeft: 10, display: "inherit" }}>
                                        <ArrowForward />
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={sectionStyle.info}>
                        <div className={sectionStyle.label}>인센티브</div>
                        <div className={sectionStyle.desc}>
                            {month}월 01일 ~ {month}월 {day}일
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
                            <div className={sectionStyle.now_points}>{Math.floor(incenValue * 100) / 100} 원</div>
                        </div>
                        <div className={sectionStyle.report}>
                            <Link href="/incentive">
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
                    <Graph width={1200} height={500}></Graph>
                </div>
            </div>
        </div>
    );
}
