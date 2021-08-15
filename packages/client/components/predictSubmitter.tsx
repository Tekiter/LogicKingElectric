import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { submitPrediction } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { useState } from "react";

const predictSubmitStyles = makeStyles((theme: Theme) =>
    createStyles({
        outline: {
            width: 987,
        },
        title: {
            fontSize: 33,
            fontWeight: 700,
            color: "#369700",
            marginTop: 23,
            marginLeft: 16,
            borderBottom: "2px solid #d7d7d7",
            paddingBottom: 10,
        },
        inner: {
            marginTop: 10,
            marginLeft: 16,
        },
        inner_line: {
            display: "flex",
            flexDirection: "row",
        },
        inner_text: {
            marginTop: 10,
            marginRight: 25,
            height: 57,
            fontWeight: 400,
            fontSize: 30,
            textAlign: "center",
        },
        inner_text_sub: {
            marginTop: 10,
        },
    }),
);
const year = format(new Date(), "yyyy");
const month = format(new Date(), "MM");
const day = format(new Date(), "dd");
const GreenButton = withStyles({
    root: {
        color: "white",
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
    },
})(Button);
export default function PredictSubmitter(): JSX.Element {
    const [power, setPower] = useState("");
    const { request } = useAPIRequest(submitPrediction.endpoint, {
        onSuccess(res) {
            console.log("등록완료!");
        },
        onError(err) {
            console.log(err);
        },
    });
    const predictSubmitStyle = predictSubmitStyles();
    return (
        <div>
            <div className={predictSubmitStyle.outline}>
                <div className={predictSubmitStyle.title}>예측 발전량 수동입력</div>
                <div className={predictSubmitStyle.inner}>
                    <div className={predictSubmitStyle.inner_line}>
                        <div className={predictSubmitStyle.inner_text}>2021 년</div>
                        <div className={predictSubmitStyle.inner_text}>{month} 월</div>
                        <div className={predictSubmitStyle.inner_text}>{day} 일</div>
                        <div style={{ marginLeft: 250 }} className={predictSubmitStyle.inner_line}>
                            <TextField
                                style={{ width: 230 }}
                                value={power}
                                onChange={e => setPower(e.target.value)}
                                id="full-width-text-field"
                                label="발전량(kW)"
                                placeholder="ex) 100"
                            />
                            <div className={`${predictSubmitStyle.inner_text} ${predictSubmitStyle.inner_text_sub}`}>
                                kW
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <GreenButton
                                    onClick={() => {
                                        request({ targetDate: year + "-" + month + "-" + day, amount: Number(power) });
                                    }}>
                                    제출
                                </GreenButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
