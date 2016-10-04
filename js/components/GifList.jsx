import React from 'react';

import Gif from './Gif.jsx';

class GifList extends React.Component {

    render() {

        const { gifs, loading } = this.props;

        return (
            <section id="result" className="GifList">
                {gifs.length > 0 && gifs.map((item, index) => {
                    return <Gif imgSrc={item.images.downsized.url} key={'Gif' + index}/>
                })}

                {!loading && gifs.length === 0 &&
                    <h3 className="GifList__message">Votre recherche n'a renvoyé aucun résultat</h3>
                }

                {loading &&
                    <h3 className="GifList__message">
                        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                        <span className="sr-only">Loading...</span>
                    </h3>
                }
            </section>
        )
    }
}

export default GifList;
