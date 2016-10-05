import React from 'react';
import ReactDOM from 'react-dom';

import SearchInput from './components/SearchInput.jsx';
import GifList from './components/GifList.jsx';
import FavoritedList from './components/FavoritedList.jsx';
import FavoriteButton from './components/FavoriteButton.jsx';

class App extends React.Component{

    constructor() {
        super();

        this.state = {
            gifs: [],
            loading: false,
            hasSearched: false,
            favoriteWindowIsOpen: false,
            favoritedGifIds: JSON.parse(localStorage.getItem('favoritedGifsIds')) || [],
            favoritedGifs: []
        };

        this.searchChangedHandler = this.searchChangedHandler.bind(this);
        this.crossClickedHandler = this.crossClickedHandler.bind(this);
        this.onGifClicked = this.onGifClicked.bind(this);
        this.favoriteButtonIsClicked = this.favoriteButtonIsClicked.bind(this);
    }

    componentDidMount() {

        if (this.state.favoritedGifIds.length > 0) {
            const url = 'https://api.giphy.com/v1/gifs?api_key=dc6zaTOxFJmzC&ids=' + this.state.favoritedGifIds.join(',');

            $.get(url, (json) => {
                this.setState({
                    favoritedGifs: json.data
                })
            })
        }
    }

    searchChangedHandler(searchValue) {
        this.setState({
            gifs: [],
            loading: true,
            hasSearched: true
        });

        const url = `https://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=dc6zaTOxFJmzC`;

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
        let newFavoritedGifsIds = this.state.favoritedGifIds;
        let isFavoritedIndex = newFavoritedGifsIds.indexOf(imgProp.id);

        let newState = {};

        if (isFavoritedIndex > -1) {
            newState.favoritedGifs = this.state.favoritedGifs.filter(gif => gif.id !== imgProp.id);
            newFavoritedGifsIds.splice(isFavoritedIndex, 1);
$       }
        else {
            newState.favoritedGifs = this.state.favoritedGifs.concat([imgProp]);
            newFavoritedGifsIds.push(imgProp.id);
        }

        localStorage.setItem('favoritedGifsIds', JSON.stringify(newFavoritedGifsIds));

        newState.favoritedGifIds = newFavoritedGifsIds;

        this.setState(newState);
    }

    favoriteButtonIsClicked() {
        this.setState({
            favoriteWindowIsOpen: !this.state.favoriteWindowIsOpen
        });
    }

    render() {

        const {
            gifs,
            favoritedGifIds,
            favoritedGifs,
            loading,
            hasSearched
        } = this.state;

        return (
            <main>
                <header className="Header">
                    <h1 className="Header__title">Giphy Searcher</h1>
                </header>

                <SearchInput
                        searchChangedHandler={this.searchChangedHandler}
                        crossClickedHandler={this.crossClickedHandler}
                />

                <GifList
                    gifs={gifs}
                    favoritedGifs={favoritedGifIds}
                    status={{
                        loading: loading,
                        hasSearched: hasSearched
                    }}
                    onGifClicked={this.onGifClicked}
                />

                <FavoritedList
                    favoritedGifIds={favoritedGifIds}
                    favoritedGifs={favoritedGifs}
                    onGifClicked={this.onGifClicked}
                    favoriteWindowIsOpen={this.state.favoriteWindowIsOpen}
                />

                <FavoriteButton
                    favoriteButtonIsClicked={this.favoriteButtonIsClicked}
                    favoriteWindowIsOpen={this.state.favoriteWindowIsOpen}
                />
            </main>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#render')
);