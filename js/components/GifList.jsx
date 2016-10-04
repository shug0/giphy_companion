import React from 'react';

import Gif from './Gif.jsx';

class GifList extends React.Component {

    render() {

        const { gifs, loading } = this.props;

        return (
            <section id="result">
                {gifs.length > 0 && gifs.map((item, index) => {
                    return <Gif imgSrc={item.images.downsized.url} key={'Gif' + index}/>
                })}

                {!loading && gifs.length === 0 &&
                    <h3 className="message">Votre recherche n'a renvoyé aucun résultat</h3>
                }

                {loading &&
                    <h3 className="message">Loading...</h3>
                }
            </section>
        )
    }
}

export default GifList;
