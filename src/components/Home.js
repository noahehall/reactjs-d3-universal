import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/home.style';

function Home() {
  const repoReadmeLink = text => (
    <Interactive
      as="a"
      {...s.link}
      href="https://github.com/noahehall/reactjs-d3-universal#readme"
    >{text}</Interactive>
  );

  return (
    <div>
      <p style={s.p}>
        Demo of charts available
        {typeof appFuncs}
      </p>
      <p style={s.p}>
        Please see the {repoReadmeLink('repo readme')} for full api documentation
      </p>
      <div style={s.pageLinkContainer}>
        <Interactive
          as={Link}
          {...s.link}
          to="/reactjs-d3-universal/example"
        >Example page</Interactive>
      </div>
      <div style={s.pageLinkContainer}>
        <Interactive
          as={Link}
          {...s.link}
          to="/reactjs-d3-universal/example/two-deep?field1=foo&field2=bar#boom!"
        >Example two deep with query and hash</Interactive>
      </div>
    </div>
  );
}

export default Home;
