import React, { Component, PropTypes, Children } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this._renderChildren(this.props.children)}
      </div>
    );
  }

  _renderChildren(children) {
    return Children.map(children, child => {
      return child;
    });
  }
}

Card.propTypes = {
  //children: PropTypes.element.isRequired
};

export default Card;
