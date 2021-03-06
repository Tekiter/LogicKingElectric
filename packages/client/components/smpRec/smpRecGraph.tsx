import { ResponsiveBar } from "@nivo/bar";

const datas = [
    {
        month: "1월",
        "SMP 가격": 70.47,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "2월",
        "SMP 가격": 75.25,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "3월",
        "SMP 가격": 83.78,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "4월",
        "SMP 가격": 75.97,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "5월",
        "SMP 가격": 78.93,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "6월",
        "SMP 가격": 82.72,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "7월",
        "SMP 가격": 87.04,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "8월",
        "SMP 가격": 0,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "9월",
        "SMP 가격": 0,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "10월",
        "SMP 가격": 0,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "11월",
        "SMP 가격": 0,
        valueColor: "hsl(357, 70%, 50%)",
    },
    {
        month: "12월",
        "SMP 가격": 0,
        valueColor: "hsl(357, 70%, 50%)",
    },
];
export default function SmpRecGraph(): JSX.Element {
    return (
        <div style={{ width: 1000, height: 600 }}>
            <ResponsiveBar
                data={datas}
                keys={["SMP 가격"]}
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
                    legend: "SMP Rate",
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
