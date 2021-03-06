import React from 'react';
import { withRouter } from 'react-router';

import './SearchInput.scss';

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

        const searchInputValue  = this.refs.searchInput.value;

        if (event.charCode === 13) {
            this.props.searchChangedHandler(searchInputValue);

            if (window.location.pathname === '/') {
                this.props.router.push({
                    search: '?search=' + searchInputValue
                });
            }
            else {
                this.props.router.push({
                    search: window.location.pathname.substring(1) + '?search=' + searchInputValue
                });
            }

            if (searchInputValue.length === 0) {
                this.crossClicked();
            }
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
        this.setState({
            inputIsActive: false
        });
    }

    render() {
        return (
            <div className="SearchInputContainer">
                {this.state.inputIsActive &&
                    <div className="SearchInputContainer__clearButton" onClick={this.crossClicked}></div>
                }

                <input className="SearchInputContainer__input"
                   ref="searchInput"
                   type="text"
                   onChange={this.searchChanged}
                   onKeyPress={this.enterPressed}
                   defaultValue={this.props.defaultSearch}
                />
            </div>
        )
    }

}

export default withRouter(SearchInput);
