import { monthlyHistoryReport } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
export interface GraphData {
    [key: string]: string | number;
}
const datas: GraphData[] = [];
export default function ErrorGraph(): JSX.Element {
    const { request } = useAPIRequest(monthlyHistoryReport.endpoint, {
        onSuccess(res) {
            res.records.map((daily, idx) => {
                if (daily.errorRate == undefined) datas.push({ day: idx + 1, error: 0 });
                else datas.push({ day: idx + 1, error: daily.errorRate });
            });
        },
    });
    const [standard] = useState("daily_in_Month");
    // 월의 일별로 나오는 옵션
    useEffect(() => {
        if (standard == "daily_in_Month") request(null);
    }, [standard]);
    return (
        <div style={{ width: 1000, height: 600 }}>
            <ResponsiveBar
                data={datas}
                keys={["error"]}
                indexBy="day"
                margin={{ top: 50, right: 130, bottom: 50, left: 160 }}
                padding={0.5}
                groupMode="grouped"
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={["#72D23D"]}
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
                    legend: "day",
                    legendPosition: "middle",
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Error",
                    legendPosition: "middle",
                    legendOffset: -50,
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
                        itemWidth: 80,
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
