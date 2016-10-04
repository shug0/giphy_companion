import React from 'react';

class Gif extends React.Component {
    render() {
        const gifStyle = {
            transitionDelay: this.props.index * 200 + 'ms'
        };
        return (
            <img style={gifStyle} src={this.props.imgSrc} />
        )
    }
}

export default Gif;