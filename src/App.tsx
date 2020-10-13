import React from 'react';
import './App.css';

import moment from 'moment';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import MainInput from "./components/input"
import ChartList from "./components/chartlist"

type APIDataType = {
    [key: string]: {
        [key: string]: number[]
    };
};

type AppState = {
    placeholder: string;
    startDate: Date | null,
    endDate: Date | null,
    chartData: APIDataType,
    focusedInput: any
}

class App extends React.Component {
    state: AppState = {
        placeholder: "test",
        startDate: null,
        endDate: null,
        chartData: {},
        focusedInput: null
    };

    private chartListRef = React.createRef<ChartList>();
    private defaultEndDate: Date = new Date(
        moment().subtract('months', 3).unix() * 1000
    );
    private defaultStartDate: Date = new Date(
        moment().subtract('months', 24).unix() * 1000
    );

    handleNew = (data: APIDataType) => {
        if (this.chartListRef.current !== null) {
            this.chartListRef.current.update(
                data, this.state.startDate as Date, this.state.endDate as Date
            );
        }
    };

    handleUpdateRange = () => {
        if (this.chartListRef.current !== null) {
            this.chartListRef.current.updateRange(
                this.state.startDate as Date, this.state.endDate as Date
            );
        }
    }

    constructor(props: any) {
        super(props);
        this.chartListRef = React.createRef<ChartList>();
    }

    componentDidMount() {
        this.setState({
            startDate: this.defaultStartDate,
            endDate: this.defaultEndDate
        })
    }

    render() {
        return (
            <div className="App">
                <div className="background">
                    <div className="content">
                    <div className="title">
                        <span>stock watch</span>
                    </div>
                        <MainInput placeholder={this.state.placeholder} onNew={this.handleNew} />
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={date => {this.setState({startDate: date})}}
                          selectsStart
                          showMonthYearDropdown
                          startDate={this.state.startDate}
                          endDate={this.state.endDate}
                          minDate={this.defaultStartDate}
                          maxDate={this.defaultEndDate}
                        />
                        <DatePicker
                          selected={this.state.endDate}
                          onChange={date => {this.setState({endDate: date})}}
                          selectsEnd
                          showMonthYearDropdown
                          startDate={this.state.startDate}
                          endDate={this.state.endDate}
                          minDate={this.state.startDate}
                          maxDate={this.defaultEndDate}
                        />

                        <button className="updateDateRange" onClick={this.handleUpdateRange}>Update</button>
                        <ChartList ref={this.chartListRef} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
