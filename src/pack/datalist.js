import React from 'react';

export const Datalist = ({
  foreignObject,
  idx,
}) =>
  <div
    className='datalist-item'
    key={`${idx}${foreignObject.username}`}
  >
    <img
      alt={`${foreignObject.username} Profile Avatar`}
      className='datalist-img'
      src={foreignObject.imageUrl}
    />
    <div
      className='datalist-text'
    >
      <a
        href={`https://www.twitter.com/${foreignObject.username}`}
        target='_blank'
      >
        {foreignObject.username}
      </a>
      <span
      >
        {foreignObject.tweet}
        <a
          href={foreignObject.url}
          target='_blank'
          > ...more</a>
      </span>
    </div>
  </div>;

Datalist.propTypes = {
  foreignObject: React.PropTypes.object,
  idx: React.PropTypes.number,
};

export default Datalist;
