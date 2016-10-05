// FavoriteButton

import React from 'react';
import ClassName from 'classnames';


class FavoriteButton extends React.Component {

    render() {

        const { favoriteWindowIsOpen } = this.props;

        return (
            <button className="FavoriteButton" onClick={this.props.favoriteButtonIsClicked}>
                {favoriteWindowIsOpen ? 'HIDE' : 'SHOW'}
            </button>
        )
    }
}

export default FavoriteButton;