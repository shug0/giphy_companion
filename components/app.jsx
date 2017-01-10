import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import $ from 'jquery';

import SearchInput from './SearchInput/SearchInput.jsx';
import GifList from './GifList/GifList.jsx';
import FavoritedList from './FavoritedList/FavoritedList.jsx';
import FavoriteButton from './FavoriteButton/FavoriteButton.jsx';

import './app.scss';

class App extends React.Component{

    constructor() {
        super();

        this.state = {
            gifs: [],
            loading: false,
            hasSearched: false,
            favoriteWindowIsOpen: false,
            favoritedGifIds: JSON.parse(localStorage.getItem('favoritedGifsIds')) || [],
            favoritedGifs: [],
            searchStr: '',
            page: 1
        };

        this.searchChangedHandler = this.searchChangedHandler.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.crossClickedHandler = this.crossClickedHandler.bind(this);
        this.onGifClicked = this.onGifClicked.bind(this);
        this.favoriteButtonIsClicked = this.favoriteButtonIsClicked.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.bodyElement = document.querySelector('body');
    }

    componentDidMount() {

        window.addEventListener('scroll', this.handleScroll);

        if (this.state.favoritedGifIds.length > 0) {
            $.get(this.buildUrl('favorites'), (json) => {
                this.setState({
                    favoritedGifs: json.data
                })
            })
        }

        const { location: { query } } = this.props;

        if (query.search) {
            this.setState({ searchStr: query.search }, this.handleSearch);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.favoriteWindowIsOpen !== this.state.favoriteWindowIsOpen) {
            this.bodyElement.style.overflow = this.state.favoriteWindowIsOpen ? 'hidden' : '';
        }
    }

    handleScroll(evt) {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const main = document.querySelector('main');
        const html = document.documentElement;
        const docHeight = Math.max(main.scrollHeight, main.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (this.state.gifs.length && windowBottom >= docHeight) {
          this.setState({ page: this.state.page + 1 }, this.handleSearch);
        }
    }

    buildUrl(urlType) {
      let url = 'https://api.giphy.com/v1/gifs';
      const params = [{ key: 'api_key', value: 'dc6zaTOxFJmzC' }];
      if (urlType === 'favorites') {
          const { favoritedGifIds } = this.state;
          params.push({ key: 'ids', value: favoritedGifIds.join(',') });
      }
      else if (urlType === 'search') {
          const limit = 20;
          const { searchStr, page } = this.state;
          url += '/search';
          params.push({ key: 'q', value: searchStr });
          params.push({ key: 'limit', value: limit });
          if (page > 1) {
              params.push({ key: 'offset', value: (page-1) * limit });
          }
      }
      const paramsStr = params
          .map(({ key, value }) => `${key}=${value}`)
          .join('&');
      return `${url}?${paramsStr}`;
    }

    searchChangedHandler(searchStr) {
        this.setState({ searchStr, page: 1, gifs: [] }, this.handleSearch);
    }

    handleSearch() {

      const { gifs } = this.state;

      this.setState({
          loading: true,
          hasSearched: true
      });

      $.get(this.buildUrl('search'), (json) => {
          this.setState({
              gifs: [
                ...gifs,
                ...json.data
              ],
              loading: false
          })
      });
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
        }
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

    keyPressed(event) {
        if (event.keyCode === 27 && this.state.favoriteWindowIsOpen) {
            this.favoriteButtonIsClicked();
        }
    }

    render() {

        const {
            gifs,
            favoritedGifIds,
            favoritedGifs,
            loading,
            hasSearched
        } = this.state;

        console.log(gifs.length);

        const { location: { query } } = this.props;

        const defaultSearch = query && query.search ? query.search : '';

        return (
            <main onKeyDown={this.keyPressed}>
                <header className="Header">
                    <h1 className="Header__title">Giphy Companion</h1>
                </header>

                <SearchInput
                    defaultSearch={defaultSearch}
                    searchChangedHandler={this.searchChangedHandler}
                    crossClickedHandler={this.crossClickedHandler}
                />

                <GifList
                    gifs={gifs}
                    favoritedGifs={favoritedGifIds}
                    searchHandler={this.handleSearch}
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

                <footer className="Footer" >
                    <a href="http://giphy.com"><img src="assets/powered_by_giphy.png" alt="Powered by Giphy"/></a>
                </footer>

            </main>
        )
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path={window.location.pathname} component={App} />
    </Router>,
    document.querySelector('#render')
);
