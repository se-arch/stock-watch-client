import React from "react"
import ChartItem from "./chartitem"
// import { Moment } from 'moment';

type APIDataType = {
    [key: string]: {
        [key: string]: number[] | string
    };
};

type Interval = {
    startDate: Date,
    endDate: Date,
}

type ChartListProps = {
    data: APIDataType,
    interval: Interval,
};
type ChartListState = {
    chartData: APIDataType,
    interval: Interval,
};

class ChartList extends React.Component<ChartListProps, ChartListState> {
    state: ChartListState = {
        chartData: {},
        interval: {startDate: new Date(), endDate: new Date()}
    };

    private getLabel(timestamp: number) {
        const dateObj = new Date(timestamp * 1000);
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        // const year = dateObj.getUTCFullYear();

        return `${day} / ${month}`;
    }

    render() {
        return (
            <div className="chartList">
                {Object.entries(this.props.data).map(item => {
                    const symbol = item[0];

                    if(item[1].s === "no_data") {
                        return <span key={symbol}></span>
                    }

                    const points = item[1].o as number[];
                    const labels = (item[1].t as number[]).map(this.getLabel);

                    const data = {
                        "points": points,
                        "labels": labels
                    }

                    return (
                        <ChartItem
                            data={data}
                            key={symbol}
                            symbol={symbol}
                        />
                    )
                })}
            </div>
        );
    }
}

export default ChartList;
