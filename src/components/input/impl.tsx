import React from "react"
import { debounce } from 'ts-debounce';
import fetch from 'node-fetch'

type APIDataType = {
    [key: string]: {
        [key: string]: number[]
    };
};

type MainInputProps = {
  placeholder: string;
  onNew: (data: APIDataType) => void;
};
type MainInputState = {
  count: number;
  baseUrl: string;
  input: string;
  data: APIDataType;
};

class MainInput extends React.Component<MainInputProps, MainInputState> {
    state: MainInputState = {
      count: 0,
      baseUrl: "http://localhost:5000",
      input: "",
      data: {}
    };

    getData = async () => {
        try {
            const query = this.state.input;
            const url: string = `${this.state.baseUrl}/search?value=${query}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const json = await response.json();
            return json;
        } catch (error) {
            throw error;
        }
    };
    debouncedGetData = debounce(this.getData, 200);

    handleInputChange = async (ev: React.ChangeEvent<HTMLInputElement>,) => {
        const value = ev.target.value;
        this.setState({ input: value });
    }

    handleButtonClick = async (type: string) => {
        if(!this.state.input) {
            return;
        }

        if(type === "add") {
            await this.handleAddClick();
        }
        if(type === "new") {
            await this.handleNewClick();
        }
    }

    handleAddClick = async () => {
        const results = await this.getData();

        let data = this.state.data;
        data[this.state.input] = results;

        this.setState({ data: data, input: "" });
        this.props.onNew(data);
    }

    handleNewClick = async () => {
        const results = await this.getData();

        let data: APIDataType = {};
        data[this.state.input] = results;

        this.setState({ data: data, input: "" });
        this.props.onNew(data);
    }

    render() {
        return (
            <div>
                <input
                    className="MainInput"
                    type="string"
                    placeholder={this.props.placeholder}
                    onChange={this.handleInputChange}
                    value={this.state.input}
                />
                <button onClick={() => this.handleButtonClick("add")}>Add</button>
                <button onClick={() => this.handleButtonClick("new")}>New</button>
            </div>
        );
    }
}

export default MainInput;
