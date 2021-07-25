import { ResponsiveBar } from "@nivo/bar";
import { monthlyHistoryReport } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { useEffect } from "react";
interface Size {
    width: number | string;
    height: number | string;
}
const datas = [
    {
        month: "1월",
        "예측 발전량": 144,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 120,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "2월",
        "예측 발전량": 124,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 120,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "3월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "4월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "5월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "6월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "7월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "8월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "9월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "10월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "11월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
    {
        month: "12월",
        "예측 발전량": 114,
        "예측 발전량Color": "hsl(357, 70%, 50%)",
        "실제 발전량": 123,
        "실제 발전량Color": "hsl(357, 70%, 50%)",
    },
];

export default function Graph(props: Size): JSX.Element {
    const { request } = useAPIRequest(monthlyHistoryReport.endpoint, {
        onSuccess(res) {
            //console.log(res);
        },
    });
    useEffect(() => {
        request(null);
    }, []);
    return (
        <div style={{ width: props.width, height: props.height }}>
            <ResponsiveBar
                data={datas}
                keys={["예측 발전량", "실제 발전량"]}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 50, left: 180 }}
                padding={0.5}
                groupMode="grouped"
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={["#009900", "#72D23D"]}
                defs={[
                    {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "#72D23D",
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "#72D23D",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "month",
                    legendPosition: "middle",
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Solar Energy",
                    legendPosition: "middle",
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "left",
                        direction: "column",
                        justify: false,
                        translateX: -150,
                        translateY: -107,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
}
