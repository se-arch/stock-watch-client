import React from "react"
import moment from 'moment';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type DatePickerState = {
    startDate: Date | null,
    endDate: Date | null,
}

type DatePickerProps = {
    update: (interval: DatePickerState) => void;
}

class DatePickerWrapper extends React.Component<DatePickerProps, DatePickerState> {
    state: DatePickerState = {
        startDate: null,
        endDate: null,
    };

    private defaultEndDate: Date = new Date(
        moment().subtract('months', 3).unix() * 1000
    );
    private defaultStartDate: Date = new Date(
        moment().subtract('months', 24).unix() * 1000
    );

    componentDidMount() {
        this.setState({
            startDate: this.defaultStartDate,
            endDate: this.defaultEndDate
        })
    }

    handleUpdateRange = () => {
        this.props.update(this.state);
    }

    render() {
        return (
            <div className="datepicker">
                <DatePicker
                  selected={this.state.startDate}
                  onChange={date => {this.setState({startDate: date as Date})}}
                  selectsStart
                  showMonthYearDropdown
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  minDate={this.defaultStartDate}
                  maxDate={this.defaultEndDate}
                />
                <DatePicker
                  selected={this.state.endDate}
                  onChange={date => {this.setState({endDate: date as Date})}}
                  selectsEnd
                  showMonthYearDropdown
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  minDate={this.state.startDate}
                  maxDate={this.defaultEndDate}
                />
                <button className="updateDateRange" onClick={this.handleUpdateRange}>Update</button>
            </div>
        );
    }
}

export default DatePickerWrapper;
