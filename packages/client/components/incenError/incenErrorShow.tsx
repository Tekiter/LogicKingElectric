import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { monthlyHistoryReport } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { format } from "date-fns";

interface ShowProps {
    type: string;
}

const showStyles = makeStyles((theme: Theme) =>
    createStyles({
        outline: {
            paddingLeft: 28,
            paddingTop: 13,
            paddingBottom: 20,
            marginLeft: 40,
            width: 900,
            boxShadow: "0px 5px 4px rgba(0,0,0,0.25);",
        },
        title: {
            fontSize: 36,
            fontWeight: 400,
        },
        date: {
            fontSize: 24,
            fontWeight: 400,
            color: "#909090",
        },
        sub_section: {
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        value: {
            fontSize: 53,
            fontWeight: 700,
        },
        changeRatio: {
            marginLeft: 47,
            fontWeight: 700,
            fontSize: 28,
        },
    }),
);
const month = format(new Date(), "MM");
const day = format(new Date(), "dd");

export default function IncenErrorShow(props: ShowProps): JSX.Element {
    const showStyle = showStyles();
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
    if (props.type == "incentive")
        return (
            <div className={showStyle.outline}>
                <div className={showStyle.title}>인센티브</div>
                <div className={showStyle.date}>
                    {month}월 01일 ~ {month}월 {day}일
                </div>
                <div className={showStyle.sub_section}>
                    <div className={showStyle.value}>{Math.floor(incenValue * 100) / 100} 원</div>
                </div>
            </div>
        );
    else
        return (
            <div className={showStyle.outline}>
                <div className={showStyle.title}>오차율</div>
                <div className={showStyle.date}>
                    {month}월 01일 ~ {month}월 {day}일
                </div>
                <div className={showStyle.sub_section}>
                    <div className={showStyle.value}>{Math.floor(errorValue * 100) / 100} %</div>
                    <div className={showStyle.changeRatio} style={{ color: errorColor }}>
                        {Math.floor(errorChangeRate * 100) / 100} %
                    </div>
                </div>
            </div>
        );
}
