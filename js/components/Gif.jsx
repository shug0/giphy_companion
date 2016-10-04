import React from 'react';

class Gif extends React.Component {
    render() {
        const gifStyle = {
            transitionDelay: this.props.index * 200 + 'ms'
        };
        return (
            <span className="GifList__gif">
                <img className="GifList__gif__img" style={gifStyle} src={this.props.imgSrc} />
            </span>
        )
    }
}

export default Gif;