import { monthlyHistoryReport } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { useEffect, useState } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
const datass: Serie[] = [
    {
        id: "Incentive",
        data: [],
    },
];
export default function ErrorGraph(): JSX.Element {
    const { request } = useAPIRequest(monthlyHistoryReport.endpoint, {
        onSuccess(res) {
            res.records.map((daily, idx) => {
                if (daily.errorRate == undefined) datass[0].data.push({ x: idx + 1, y: 0 });
                else datass[0].data.push({ x: idx + 1, y: daily.errorRate });
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
            <ResponsiveLine
                data={datass}
                margin={{ top: 50, right: 110, bottom: 50, left: 100 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "transportation",
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "count",
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                colors="green"
                lineWidth={2}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
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
