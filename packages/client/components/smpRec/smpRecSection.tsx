import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
const smpStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "row",
        },
        section_outline: {
            padding: 20,
            marginRight: 30,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 5px 4px rgba(0,0,0,0.25);",
            width: 280,
            height: 170,
        },
    }),
);
export default function SmpRecSection(): JSX.Element {
    const smpStyle = smpStyles();
    return (
        <div className={smpStyle.root}>
            <div className={smpStyle.section_outline}>
                <div style={{fontSize: 30, fontWeight: 400}}>SMP</div>
                <div style={{fontSize: 21, color: "#909090"}}>2021.7.3(토)</div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{fontWeight: 700, fontSize: 38}}>89.19원</div>
                    <div style={{fontWeight: 700, fontSize: 24}}>↑ 1.2 %</div>
                </div>
            </div>
            <div className={smpStyle.section_outline}>
                <div style={{fontSize: 30, fontWeight: 400}}>REC</div>
                <div style={{fontSize: 21, color: "#909090"}}>2021.7.3(토)</div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{fontWeight: 700, fontSize: 38}}>30023원</div>
                    <div style={{fontWeight: 700, fontSize: 24}}>↓ 3.4 %</div>
                </div>
            </div>
            <div className={smpStyle.section_outline}>
                <div style={{fontSize: 30, fontWeight: 400}}>SMP + (REC x 0.7)</div>
                <div style={{fontSize: 21, color: "#909090"}}>2021.7.3(토)</div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{fontWeight: 700, fontSize: 38}}>110.21원</div>
                    <div style={{fontWeight: 700, fontSize: 24}}>↓ 0.3 %</div>
                </div>
            </div>
        </div>
    );
}
