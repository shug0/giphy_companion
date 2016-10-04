import React from 'react';
import ReactDOM from 'react-dom';

import SearchInput from './components/SearchInput.jsx';
import GifList from './components/GifList.jsx';

class App extends React.Component{

    constructor() {
        super();

        this.state = {
            gifs: [],
            loading: false,
            hasSearched: false,
            favoritedGif: []
        };

        this.searchChangedHandler = this.searchChangedHandler.bind(this);
        this.crossClickedHandler = this.crossClickedHandler.bind(this);
        this.onGifClicked = this.onGifClicked.bind(this);
    }

    searchChangedHandler(searchValue) {
        this.setState({
            gifs: [],
            loading: true,
            hasSearched: true
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
            gifs: [],
            hasSearched: false
        })
    }

    onGifClicked(imgProp) {
        let newFavoritedGifs = this.state.favoritedGif;
        let isFavoritedIndex = newFavoritedGifs.indexOf(imgProp.id);

        if(isFavoritedIndex > -1) {
            newFavoritedGifs.splice(isFavoritedIndex, 1);
$       }
        else {
            newFavoritedGifs.push(imgProp.id);
        }
        this.setState({
            favoritedGif: newFavoritedGifs
        });

    }

    render() {
        return (
            <main>
                <header className="Header">
                    <h1 className="Header__title">Giphy Searcher</h1>
                </header>

                <SearchInput
                        searchChangedHandler={this.searchChangedHandler}
                        crossClickedHandler={this.crossClickedHandler} />

                <GifList
                    gifs={this.state.gifs}
                    favoritedGifs={this.state.favoritedGif}
                    status={{
                        loading: this.state.loading,
                        hasSearched: this.state.hasSearched
                    }}
                    onGifClicked={this.onGifClicked}
                />
            </main>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#render')
);