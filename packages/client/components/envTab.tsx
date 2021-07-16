import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
const mainSectionStyles = makeStyles((theme: Theme) =>
    createStyles({
        envtab: {
            display: "inline-block",
            marginLeft: "1.5%",
            maxWidth: "100%",
            boxShadow: "2px 2px 2px #e2e2e2",
            height: 800,
            position: "absolute",
            flexWrap: "wrap",
        },
        envtab_child: {
            width: 480,
            borderBottom: "1px solid #dbdbdb",
        },
        weather: {
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: "1%",
            marginTop: "3%",
            marginBottom: "3%",
        },
        real_weather: {
            width: 480,
            borderBottom: "1px solid #dbdbdb",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        today: {
            marginLeft: "1%",
        },
        pollution_mass_title: {
            marginLeft: "1%",
            marginTop: "3%",
            marginBottom: "3%",
            fontSize: 20,
            fontWeight: "bold",
        },
    }),
);
export default function EnvTab(): JSX.Element {
    const mainSectionStyle = mainSectionStyles();
    return (
        <div className={mainSectionStyle.envtab}>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.weather}>날씨 정보</div>
            </div>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.today}>7월 16일 (금)</div>
            </div>
            <div className={mainSectionStyle.real_weather}>
                <div style={{ marginTop: 10, fontSize: 30, fontWeight: "bold" }}>31°C</div>
                <div style={{ marginTop: 3, marginRight: "1%", display: "grid" }}>
                    <div style={{ fontSize: 20 }}>
                        <span>일사량: </span>
                        <span>
                            12W/m<sup>2</sup>
                        </span>
                    </div>
                    <div style={{ marginLeft: "auto", color: "gray" }}>
                        <span>풍속: </span>
                        <span>1m/s</span>
                    </div>
                </div>
            </div>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.pollution_mass_title}>대기 오염물질 정보</div>
            </div>
        </div>
    );
}
