import React from 'react';
import ClassName from 'classnames';

class Gif extends React.Component {

    constructor(){
        super();
        this.favoriteClicked = this.favoriteClicked.bind(this);
    }

    favoriteClicked() {
        this.props.onGifClicked(this.props.imgProp);
    }

    render() {

        const {imgProp} = this.props;

        const imgUrl = imgProp.images.downsized.url;

        const gifClass = ClassName(
            'GifList__gif',
            {'GifList__gif--favorited' : this.props.isFavorite}
        );

        return (
            <span className={gifClass}>
                <div className="GifList__gif__mask">
                    <i  onClick={this.favoriteClicked}
                        tabIndex={this.props.index}
                        className="GifList__gif__mask__favButton fa fa-star" aria-hidden="true"/>
                </div>
                <img
                    className="GifList__gif__img"
                    src={imgUrl}
                />
            </span>
        )
    }
}

export default Gif;