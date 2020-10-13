import { Line } from 'react-chartjs-2';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import "chartjs-plugin-annotation";

import React from "react"

type DataType = {
    points: number[],
    labels: string[]
};


type ChartProps = {
    data: DataType;
    symbol: string;
    interval: number[];
};
type ChartState = {
    data: DataType;
};

class ChartItem extends React.Component<ChartProps, ChartState> {
    state: ChartState = {
        data: {
            points: [],
            labels: []
        }
    };
    private lineRef = React.createRef<Line>();

    componentDidMount() {
        this.setState({ data: this.props.data });
    }

    getProps = (): [ChartOptions, ChartData] => {
        const values = this.state.data.points;
        let average = 0;

        if (values.length) {
            average = values.reduce((x, y) => x + y) / values.length;
        } else {
            average = 0;
        }

        const lineRef = this.lineRef;
        const options: ChartOptions = {
            responsive: true,
            title: {
                display: true,
                text: "Price per day",
                fontSize: 20
            },
            legend: {
                display: true,
                position: 'right'
            },
            annotation: {
                events: ['click', 'mouseenter', 'mouseleave'],
                drawTime: undefined,
                annotations: [
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: average,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1,
                        label: {
                            enabled: true,
                            content: `${this.props.symbol} price average: ${Math.round(average * 100) / 100}`,
                            position: "right",
                            backgroundColor: 'rgba(0,0,0,0.1)',
                        },
                        onMouseenter: function(e) {
                            this.borderColor = "rgba(0,255,255,0.8)";
                            (this as any).options.label.backgroundColor = 'rgba(0,0,0,0.8)';
                            lineRef.current!.chartInstance.update();
                        },
                        onMouseleave: function(e) {
                            this.borderColor = "rgba(0,0,255,0.1)";
                            (this as any).options.label.backgroundColor = 'rgba(0,0,0,0.1)';
                            lineRef.current!.chartInstance.update();
                        },
                    }
                ]
            }
        }

        const data: ChartData = {
            labels: this.state.data.labels,
            datasets: [
                {
                    label: this.props.symbol,
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: values
                }
            ]
        }

        return [
            options, data
        ]
    }

    toggleAnnotations = () => {
        const chart: Chart = this.lineRef.current!.chartInstance;

        if (chart.options!.annotation!.drawTime === "afterDatasetsDraw") {
            chart.options!.annotation!.drawTime = undefined;
        } else {
            chart.options!.annotation!.drawTime = "afterDatasetsDraw";
        }
        chart.update();
    }

    render() {
        if (!this.state.data) {
            return;
        }

        const [options, data] = this.getProps();
        return (
            <div className="chartContainer">
                <Line data={data} options={options} ref={this.lineRef} />
                <button onClick={this.toggleAnnotations}>Avg</button>
            </div>
        );
    }
}

export default ChartItem;
