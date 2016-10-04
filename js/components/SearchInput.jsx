import React from 'react';

import { throttle } from '../utils';

class SearchInput extends React.Component {

    constructor() {
        super();

        this.crossClicked = this.crossClicked.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
        this.searchChanged = this.searchChanged.bind(this);

        this.state = {
            inputIsActive: false
        }
    }

    enterPressed(event) {
        if (event.charCode === 13) {
            this.props.searchChangedHandler(this.refs.searchInput.value)
        }
    }

    searchChanged() {
        this.setState({
            inputIsActive: this.refs.searchInput.value.length > 0
        });
    }

    crossClicked() {
        this.refs.searchInput.value = "";
        this.props.crossClickedHandler();
    }

    render() {
        return (
            <div className="wrapperInput">
                {this.state.inputIsActive &&
                    <div id="cross" onClick={this.crossClicked}></div>
                }

                <input ref="searchInput"
                       type="text"
                       id="search"
                       onChange={this.searchChanged}
                       onKeyPress={this.enterPressed}
                />
            </div>
        )
    }

}

export default SearchInput;