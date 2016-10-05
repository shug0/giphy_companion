import React from 'react';

import Gif from './Gif.jsx';

class FavoritedList extends React.Component {

    render() {

        const {
            favoritedGifs,
            favoritedGifIds
        } = this.props;

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

        return (
            <section className="FavoritedList GifList">
                {favoritedGifsElements}
            </section>
        )
    }
}

export default FavoritedList;
