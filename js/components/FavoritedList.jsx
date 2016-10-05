import React from 'react';
import Gif from './Gif.jsx';
import ClassName from 'classnames';

class FavoritedList extends React.Component {

    constructor() {
        super();
    }

    keyPressed(event) {
        if (event.charCode === 27 && this.props.favoriteWindowIsOpen) {
            this.closeFavoriteWindow();
        }
    }

    closeFavoriteWindow() {
        this.setState({
            favoritesIsOpen : false
        });
    }

    render() {

        const {
            favoritedGifs,
            favoritedGifIds,
            favoriteWindowIsOpen
        } = this.props;

        const favoriteWindowClass = ClassName(
            'FavoritedList',
            {'FavoritedList--isOpen' : favoriteWindowIsOpen}
        );

        let favoritedGifsElements = favoritedGifs
            .filter(item => favoritedGifIds.indexOf(item.id) > -1)
            .map((item, index) => {
                return <Gif
                    imgProp={item}
                    key={'Gif' + index}
                    isFavorite={true}
                    onGifClicked={this.props.onGifClicked}
                />
            });

        let favoritedGifsElementsLength = favoritedGifsElements.length;


        return (
            <section onKeyPress={this.keyPressed} className={favoriteWindowClass}>
                <h2 className="FavoritedList__title">
                    {`${favoritedGifsElementsLength} favorite${favoritedGifsElementsLength > 1 ? 's' : ''}`}
                </h2>
                <div className="FavoritedList__container">
                    {favoritedGifsElements}
                </div>
            </section>
        )
    }
}

export default FavoritedList;
