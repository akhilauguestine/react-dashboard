import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function Links(props) {
  return (

    // <Link to={props.url} className={'sc-admin-link__' + props.class} >{props.title}</Link>
    <Link to={props.url}  className={props.class?'sc-admin-link__' + props.class : ''} >{props.title}</Link>
  );
}

export default Links;