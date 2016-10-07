// FavoriteButton

import React from 'react';

import './FavoriteButton.scss';

class FavoriteButton extends React.Component {

    render() {

        const { favoriteWindowIsOpen } = this.props;

        return (
            <button className="FavoriteButton" onClick={this.props.favoriteButtonIsClicked}>
                {favoriteWindowIsOpen ?
                    <i className="fa fa-times"/> :
                    <i className="fa fa-star"/>
                }
            </button>
        )
    }
}

export default FavoriteButton;