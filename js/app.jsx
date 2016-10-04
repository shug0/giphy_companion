import React from 'react';
import ReactDOM from 'react-dom';

import SearchInput from './components/SearchInput.jsx';
import GifList from './components/GifList.jsx';

class App extends React.Component{

    constructor() {
        super();

        this.state = {
            gifs: [],
            loading: false
        };

        this.searchChangedHandler = this.searchChangedHandler.bind(this);
        this.crossClickedHandler = this.crossClickedHandler.bind(this);
    }

    searchChangedHandler(searchValue) {
        this.setState({
            gifs: [],
            loading: true
        });

        const url = `http://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=dc6zaTOxFJmzC`;

        $.get(url, (json) => {
            this.setState({
                gifs: json.data,
                loading: false
            })
        })
    }

    crossClickedHandler() {
        this.setState({
            gifs: []
        })
    }

    render() {
        return (
            <main>
                <h1>Giphy Searcher <i className="fa fa-search" aria-hidden="true"></i></h1>
                <SearchInput
                    searchChangedHandler={this.searchChangedHandler}
                    crossClickedHandler={this.crossClickedHandler} />
                <GifList gifs={this.state.gifs} loading={this.state.loading}/>
            </main>
        )
    }

}

ReactDOM.render(
    <App />,
    document.querySelector('#render')
);