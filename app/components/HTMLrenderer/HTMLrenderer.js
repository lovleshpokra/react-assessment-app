import React from 'react';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';

const HTMLrenderer = ({ content }) => <div>{renderHTML(content)}</div>;
HTMLrenderer.propTypes = {
  content: PropTypes.any
};
export default HTMLrenderer;
