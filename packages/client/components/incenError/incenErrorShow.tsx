import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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
            color: "#00BE13",
        },
    }),
);

export default function IncenErrorShow(props: ShowProps): JSX.Element {
    const showStyle = showStyles();
    if (props.type == "incentive")
        return (
            <div className={showStyle.outline}>
                <div className={showStyle.title}>인센티브</div>
                <div className={showStyle.date}>7월 1일 ~ 7월 14일</div>
                <div className={showStyle.sub_section}>
                    <div className={showStyle.value}>123 원</div>
                    <div className={showStyle.changeRatio}>↑ 1.2 %</div>
                </div>
            </div>
        );
    else
        return (
            <div className={showStyle.outline}>
                <div className={showStyle.title}>오차율</div>
                <div className={showStyle.date}>7월 1일 ~ 7월 14일</div>
                <div className={showStyle.sub_section}>
                    <div className={showStyle.value}>6.6 %</div>
                    <div className={showStyle.changeRatio}>↑ 1.2 %</div>
                </div>
            </div>
        );
}
