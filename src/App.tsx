import React from 'react';
import './App.css';


import MainInput from "./components/input"
import ChartList from "./components/chartlist"
import DatePickerWrapper from "./components/datepicker"

import StockAPI from "./lib/api"

type APIDataType = {
    [key: string]: {
        [key: string]: number[]
    };
};

type AppState = {
    placeholder: string;
    chartData: APIDataType,
    symbols: string[],
    dateRange: any
}

class App extends React.Component {
    state: AppState = {
        placeholder: "test",
        chartData: {},
        symbols: [],
        dateRange: {}
    };

    private api: StockAPI = new StockAPI();

    updateData = async () => {
        const data: any = {}
        for (let symbol of this.state.symbols) {
            const results = await this.api.getData(symbol);

            data[symbol] = results;
        }

        this.setState({ chartData: data });
    }

    symbolSelect = async (text: string, toAdd: boolean) => {
        let { symbols } = this.state;
        if(!toAdd) {
            symbols = []
        }

        if(symbols.indexOf(text) >= 0) {
            return;
        }

        symbols.push(text);
        this.setState({ symbols: symbols });
        await this.updateData();
    }

    rangeUpdate = async (interval: any) => {
        this.setState({ dateRange: interval });
        await this.updateData();
    }

    render() {
        return (
            <div className="App">
                <div className="background">
                    <div className="content">
                    <div className="title">
                        <span>stock watch</span>
                    </div>
                        <MainInput placeholder={this.state.placeholder} update={this.symbolSelect} />
                        <DatePickerWrapper update={this.rangeUpdate} />
                        <ChartList interval={this.state.dateRange} data={this.state.chartData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
