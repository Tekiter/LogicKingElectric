import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { format, isSameDay } from "date-fns";
import { useAPIRequest } from "@/api/hooks";
import { getCurrentWeather } from "@/api/endpoint";
import { useEffect, useState } from "react";

const mainSectionStyles = makeStyles((theme: Theme) =>
    createStyles({
        envtab: {
            width: 400,
            marginLeft: "1.5%",
            padding: "0.5em 0.7em",
            marginRight: 10,
            maxWidth: "100%",
            boxShadow: "0px 5px 4px rgba(0,0,0,0.25);",
            height: 800,
            /*flexBasis: 480,*/
        },
        envtab_child: {
            width: "100%",
            borderBottom: "1px solid #dbdbdb",
        },
        weather: {
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: "1%",
            marginBottom: "3%",
        },
        real_weather: {
            marginLeft: "1%",
            width: "100%",
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
        pollution_mass_sort: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        pollution_mass_point: {
            marginTop: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
        },
    }),
);
const month = format(new Date(), "MM");
const day = format(new Date(), "dd");
const day_week = () => {
    const tmp_day = format(new Date(), "EEE");
    switch (tmp_day) {
        case "Mon":
            return "월";
        case "Tue":
            return "화";
        case "Wed":
            return "수";
        case "Thu":
            return "목";
        case "Fri":
            return "금";
        case "Sat":
            return "토";
        case "Sun":
            return "일";
        default:
            return "Nan";
    }
};
export default function EnvTab(): JSX.Element {
    const mainSectionStyle = mainSectionStyles();
    const [windSpeed, setWindSpeed] = useState(0);
    const [temper, setTemper] = useState(0);
    const [coRate, setCORate] = useState(0);
    const [o3Rate, setO3Rate] = useState(0);
    const [no2Rate, setNO2Rate] = useState(0);
    const [pm2_5Rate, setPM2_5Rate] = useState(0);
    const [pm10Rate, setPM10Rate] = useState(0);
    const { request } = useAPIRequest(getCurrentWeather.endpoint, {
        onSuccess(res) {
            setWindSpeed(res.wind.speed);
            setTemper(Math.round(res.temp - 273.1)); // Convert to Celcius
            setCORate(res.quality.components.co);
            setO3Rate(res.quality.components.o3);
            setNO2Rate(res.quality.components.no2);
            setPM2_5Rate(res.quality.components.pm2_5);
            setPM10Rate(res.quality.components.pm10);

            setWeatherCacheToLocalStorage({
                coRate: res.quality.components.co,
                no2Rate: res.quality.components.no2,
                o3Rate: res.quality.components.o3,
                pm10Rate: res.quality.components.pm10,
                pm2_5Rate: res.quality.components.pm2_5,
                temper: Math.round(res.temp - 273.1),
                windSpeed: res.wind.speed,
            });
        },
    });

    useEffect(() => {
        const cache = getWeatherCache();
        if (cache === null) {
            request(null);
        } else {
            setWindSpeed(cache.data.windSpeed);
            setTemper(cache.data.temper);
            setCORate(cache.data.coRate);
            setO3Rate(cache.data.o3Rate);
            setNO2Rate(cache.data.no2Rate);
            setPM2_5Rate(cache.data.pm2_5Rate);
            setPM10Rate(cache.data.pm10Rate);
        }
    }, []);

    return (
        <div className={mainSectionStyle.envtab}>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.weather}>날씨 정보</div>
            </div>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.today}>
                    {month}월 {day}일 ({day_week()})
                </div>
            </div>
            <div className={mainSectionStyle.real_weather}>
                <div style={{ marginTop: 10, fontSize: 30, fontWeight: "bold" }}>{temper}°C</div>
                <div style={{ marginTop: 3, marginRight: "1%", display: "grid" }}>
                    <div style={{ fontSize: 20 }}>
                        <span>일사량: </span>
                        <span>
                            12W/m<sup>2</sup>
                        </span>
                    </div>
                    <div style={{ marginLeft: "auto", color: "gray" }}>
                        <span>풍속: </span>
                        <span>{windSpeed} m/s</span>
                    </div>
                </div>
            </div>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.pollution_mass_title}>대기 오염물질 정보</div>
            </div>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.pollution_mass_sort}>
                    <div style={{ marginLeft: "1%", marginTop: 10, fontWeight: 700, fontSize: 18 }}>일산화탄소</div>
                    <div style={{ marginLeft: 10, marginTop: 10, fontWeight: 400, fontSize: 13, color: "#7a7a7a" }}>
                        (1시간 평균)
                    </div>
                </div>
                <div className={mainSectionStyle.pollution_mass_point}>
                    <div style={{ marginLeft: "1%", fontWeight: 700, fontSize: 35 }}>{coRate}</div>
                    <div style={{ marginLeft: 7, fontWeight: 700, fontSize: 15 }}> μg/m3</div>
                </div>
            </div>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.pollution_mass_sort}>
                    <div style={{ marginLeft: "1%", marginTop: 10, fontWeight: 700, fontSize: 18 }}>오존</div>
                    <div style={{ marginLeft: 10, marginTop: 10, fontWeight: 400, fontSize: 13, color: "#7a7a7a" }}>
                        (1시간 평균)
                    </div>
                </div>
                <div className={mainSectionStyle.pollution_mass_point}>
                    <div style={{ marginLeft: "1%", fontWeight: 700, fontSize: 35 }}>{o3Rate}</div>
                    <div style={{ marginLeft: 7, fontWeight: 700, fontSize: 15 }}> μg/m3</div>
                </div>
            </div>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.pollution_mass_sort}>
                    <div style={{ marginLeft: "1%", marginTop: 10, fontWeight: 700, fontSize: 18 }}>이산화질소</div>
                    <div style={{ marginLeft: 10, marginTop: 10, fontWeight: 400, fontSize: 13, color: "#7a7a7a" }}>
                        (1시간 평균)
                    </div>
                </div>
                <div className={mainSectionStyle.pollution_mass_point}>
                    <div style={{ marginLeft: "1%", fontWeight: 700, fontSize: 35 }}>{no2Rate}</div>
                    <div style={{ marginLeft: 7, fontWeight: 700, fontSize: 15 }}> μg/m3</div>
                </div>
            </div>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.pollution_mass_sort}>
                    <div style={{ marginLeft: "1%", marginTop: 10, fontWeight: 700, fontSize: 18 }}>미세먼지</div>
                    <div style={{ marginLeft: 10, marginTop: 10, fontWeight: 400, fontSize: 13, color: "#7a7a7a" }}>
                        (1시간 평균)
                    </div>
                </div>
                <div className={mainSectionStyle.pollution_mass_point}>
                    <div style={{ marginLeft: "1%", fontWeight: 700, fontSize: 35 }}>{pm2_5Rate} / 40</div>
                    <div style={{ marginLeft: 7, fontWeight: 700, fontSize: 15 }}>μg/m3</div>
                </div>
            </div>
            <div className={mainSectionStyle.envtab_child}>
                <div className={mainSectionStyle.pollution_mass_sort}>
                    <div style={{ marginLeft: "1%", marginTop: 10, fontWeight: 700, fontSize: 18 }}>초미세먼지</div>
                    <div style={{ marginLeft: 10, marginTop: 10, fontWeight: 400, fontSize: 13, color: "#7a7a7a" }}>
                        (1시간 평균)
                    </div>
                </div>
                <div className={mainSectionStyle.pollution_mass_point}>
                    <div style={{ marginLeft: "1%", fontWeight: 700, fontSize: 35 }}>{pm10Rate} / 20</div>
                    <div style={{ marginLeft: 7, fontWeight: 700, fontSize: 15 }}>μg/m3</div>
                </div>
            </div>
        </div>
    );
}

interface WeatherCache {
    data: {
        windSpeed: number;
        temper: number;
        coRate: number;
        o3Rate: number;
        no2Rate: number;
        pm2_5Rate: number;
        pm10Rate: number;
    };
    datetime: Date;
}

const WEATHER_CACHE_KEY = "weatherCache";

function getWeatherCacheFromLocalstorage(): WeatherCache | null {
    const raw = localStorage.getItem(WEATHER_CACHE_KEY);
    if (raw === null) {
        return null;
    }
    try {
        const data = JSON.parse(raw);
        return {
            ...data,
            datetime: new Date(data.datetime),
        };
    } catch {
        clearWeatherCacheInLocalStorage();
        return null;
    }
}

function setWeatherCacheToLocalStorage(data: WeatherCache["data"]) {
    const cache = {
        datetime: format(new Date(), "yyyy/MM/dd"),
        data: data,
    };
    const raw = JSON.stringify(cache);
    localStorage.setItem(WEATHER_CACHE_KEY, raw);
}

function clearWeatherCacheInLocalStorage() {
    localStorage.removeItem(WEATHER_CACHE_KEY);
}

function getWeatherCache() {
    const cache = getWeatherCacheFromLocalstorage();
    if (cache === null) {
        return null;
    }

    if (!isSameDay(cache.datetime, new Date())) {
        clearWeatherCacheInLocalStorage();
        return null;
    }
    return cache;
}
