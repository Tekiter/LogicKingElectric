import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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
export default function PredictShow(): JSX.Element {
    const predictStyle = predictStyles();
    return (
        <div>
            <div className={predictStyle.outline}>
                <div className={predictStyle.title}>예측 발전량</div>
                <div className={predictStyle.inner}>
                    <div>
                        <div className={predictStyle.inner_title}>오늘의 예측 발전량</div>
                        <div className={predictStyle.inner_point}>100kW</div>
                    </div>
                    <div style={{ marginLeft: 150 }}>
                        <div className={predictStyle.inner_title}>내일의 예측 발전량</div>
                        <div className={predictStyle.inner_point}>100kW</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
