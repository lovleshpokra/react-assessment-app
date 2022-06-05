import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default class Picture extends PureComponent {
  render() {
    const {
      alt,
      src,
      className
    } = this.props;
    return (
      <LazyLoadImage
        alt={alt}
        src={src}
        effect="blur"
        className={className}
      />
    );
  }
}
Picture.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string
};
