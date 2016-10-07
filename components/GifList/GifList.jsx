import React from 'react';

import Gif from '../Gif/Gif.jsx';

import './GifList.scss';

class GifList extends React.Component {

    render() {

        const {
            gifs,
            favoritedGifs,
            status: {
                loading,
                hasSearched
            }
        } = this.props;


        const hasNoResult = !loading && hasSearched && gifs.length === 0;

        return (
            <section ref="GifList" className="GifList">

                {gifs.length > 0 && gifs.map((item, index) => {
                    return <Gif
                        imgProp={item}
                        key={'Gif' + index}
                        index={index}
                        isFavorite={favoritedGifs.indexOf(item.id) > -1}
                        onGifClicked={this.props.onGifClicked}
                    />
                })}

                {hasNoResult &&
                    <h3 className="GifList__message">Votre recherche n'a renvoyé aucun résultat</h3>
                }

                {loading &&
                    <h3 className="GifList__message">
                        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
                        <span className="sr-only">Loading...</span>
                    </h3>
                }

                {!hasSearched &&
                <h2 className="GifList__message">
                  {`¯\\_(ツ)_/¯`}
                </h2>
                }
            </section>
        )
    }
}

export default GifList;
