import React from 'react';

export const Datalist = ({
  foreignObject,
  idx,
}) =>
  <div
    className='datalist-item'
    key={`${idx}${foreignObject.username}`}
    style={{
      display: 'block',
      marginBottom: '3px',
      width: '100%',
    }}
  >
    <img
      alt={`${foreignObject.username} Profile Avatar`}
      className='datalist-img'
      src={foreignObject.imageUrl}
      style={{
        marginRight: '1%',
        verticalAlign: 'top',
      }}
    />
    <div
      className='datalist-text'
      style={{
        display: 'inline-block',
      }}
    >
      <a
        href={`https://www.twitter.com/${foreignObject.username}`}
        style={{
          textDecoration: 'none'
        }}
        target='_blank'
      >
        {foreignObject.username}
      </a>
      <span
        style={{
          border: 'none',
          display: 'block',
          margin: 0,
        }}
      >
        {foreignObject.tweet}
        <a
          href={foreignObject.url}
          style={{
            fontStyle: 'italic',
            textDecoration: 'none',
          }}
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
