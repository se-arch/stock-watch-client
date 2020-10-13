import React from "react"
import ChartItem from "./chartitem"
// import { Moment } from 'moment';

type APIDataType = {
    [key: string]: {
        [key: string]: number[] | string
    };
};

type ChartListProps = {};
type ChartListState = {
    chartData: APIDataType;
    startDate: number;
    endDate: number;
};

class ChartList extends React.Component<ChartListProps, ChartListState> {
    state: ChartListState = {
        chartData: {},
        startDate: 0,
        endDate: 0,
    };

    // update = (data: APIDataType, startDate: Moment, endDate: Moment) => {
    update = (data: APIDataType, startDate: Date, endDate: Date) => {
        this.setState({
            chartData: data,
            startDate: startDate.getTime(),
            endDate: endDate.getTime() 
        });
    }

    updateRange = (startDate: Date, endDate: Date) => {
        this.setState({ startDate: startDate.getTime(), endDate: endDate.getTime() });
    }

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
                {Object.entries(this.state.chartData).map(item => {
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
                            interval={[this.state.startDate, this.state.endDate]}
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
