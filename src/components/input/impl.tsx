import React from "react"

type MainInputProps = {
  placeholder: string;
  update: (text: string, toAdd: boolean) => void;
};
type MainInputState = {
  input: string;
};

class MainInput extends React.Component<MainInputProps, MainInputState> {
    state: MainInputState = {
      input: "",
    };

    handleInputChange = async (ev: React.ChangeEvent<HTMLInputElement>,) => {
        const value = ev.target.value;
        this.setState({ input: value });
    }

    handleButtonClick = (type: string) => {
        if(!this.state.input) {
            return;
        }

        this.props.update(this.state.input, type === "add");
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
