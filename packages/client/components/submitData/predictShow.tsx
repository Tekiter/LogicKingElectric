import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { predictSolarPlant, predictWindPlant, monthlyHistoryReport, getPlantInfo } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const predictStyles = makeStyles((theme: Theme) =>
    createStyles({
        outline: {
            width: 987,
            borderTop: "7px solid #36CC00",
            borderRadius: "5px 5px 5px 5px",
            boxShadow: "0px 5px 4px rgba(0,0,0,0.25);",
        },
        title: {
            color: "#369700",
            fontSize: 33,
            fontWeight: 700,
            marginTop: 23,
            marginLeft: 16,
            borderBottom: "2px solid #d7d7d7",
            paddingBottom: 10,
        },
        inner: {
            marginTop: 15,
            marginLeft: 16,
            display: "flex",
        },
        inner_title: {
            fontSize: 36,
            fontWeight: 400,
            marginBottom: 36,
        },
        inner_point: {
            fontSize: 52,
            fontWeight: 700,
            marginBottom: 25,
        },
    }),
);
const day = format(new Date(), "dd");
export default function PredictShow(): JSX.Element {
    const predictStyle = predictStyles();
    const [predictWindValue, setWindPredict] = useState(0);
    const [predictSolarValue, setSolarPredict] = useState(0);
    const [prePredictValue, setPrePredict] = useState(0);
    const [plantType, setPlantType] = useState("");
    const predictSolar = useAPIRequest(predictSolarPlant.endpoint, {
        // onSuccess(res) {
        //     console.log(res);
        // },
    });
    const predictionWind = useAPIRequest(predictWindPlant.endpoint, {
        onSuccess(res) {
            if (res.predicted != undefined) setWindPredict(res.predicted);
        },
    });
    const prePredictionWind = useAPIRequest(monthlyHistoryReport.endpoint, {
        onSuccess(res) {
            const prePrediction = res.records[Number(day) - 2].prediction;
            if (prePrediction != undefined) setPrePredict(prePrediction);
        },
    });
    const plantInfo = useAPIRequest(getPlantInfo.endpoint, {
        onSuccess(res) {
            setPlantType(res.type);
        },
    });
    useEffect(() => {
        plantInfo.request(null);
        predictionWind.request(null);
        prePredictionWind.request(null);
        predictSolar.request(null);
    }, []);
    if (plantType == "wind")
        return (
            <div>
                <div className={predictStyle.outline}>
                    <div className={predictStyle.title}>예측 발전량</div>
                    <div className={predictStyle.inner}>
                        <div>
                            <div className={predictStyle.inner_title}>오늘의 예측 발전량</div>
                            <div className={predictStyle.inner_point}>
                                {Math.floor(prePredictValue * 100) / 100} kWh
                            </div>
                        </div>
                        <div style={{ marginLeft: 150 }}>
                            <div className={predictStyle.inner_title}>내일의 예측 발전량</div>
                            <div className={predictStyle.inner_point}>
                                {Math.floor(predictWindValue * 100) / 100} kWh
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    else
        return (
            <div>
                <div className={predictStyle.outline}>
                    <div className={predictStyle.title}>예측 발전량</div>
                    <div className={predictStyle.inner}>
                        <div>
                            <div className={predictStyle.inner_title}>오늘의 예측 발전량</div>
                            <div className={predictStyle.inner_point}>
                                {Math.floor(prePredictValue * 100) / 100} kWh
                            </div>
                        </div>
                        <div style={{ marginLeft: 150 }}>
                            <div className={predictStyle.inner_title}>내일의 예측 발전량</div>
                            <div className={predictStyle.inner_point}>
                                {Math.floor(predictSolarValue * 100) / 100} kWh
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}
