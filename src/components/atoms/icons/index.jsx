import React from 'react';
import { Icon } from '@iconify/react';
import './index.scss';

function Icons(props) {
  return (
    <Icon icon={props.title} className={'sc-admin-icon__' + props.class} style={{ color: props.color, fontSize: props.size }} />
  );
}

export default Icons;