import React, { useEffect, useState } from 'react';
import SidebarData from '../../../resources/js/sidebar-content'
import getPostType from '../../../resources/js/getPostType'
import { Link } from 'react-router-dom';
import Links from '../../atoms/links'
import Icons from '../../atoms/icons';
import './index.scss'



export default function Sidebar() {
    const sidebarData = SidebarData();
    const postType = getPostType();
    return (
        <>
            <div className='sidebar'>
                <div className='sidebar__wrapper' id='scroll'>
                    {
                        sidebarData.map((record, i) => {
                            let activecontent;
                            for (let [key, value] of Object.entries(record.subtitles)) {
                                if ((value.posttype == postType) && (value.parenttype == record.posttype)) {
                                    activecontent = 'active'
                                }
                            }
                            return (
                                <ul key={i} className='sidebar__menu-wrap'>
                                    <li className={activecontent? activecontent : ''} >
                                        <Link to={record.url} className='sidebar__menu-top'>
                                            <Icons title={record.icon} class="sidebar-icon" /><div>{record.title}</div>
                                        </Link>
                                        <ul className='sidebar__submenu-wrap'>
                                            {record.subtitles.map((records, i) => {
                                                return (
                                                    <li key={i} className={(records.posttype == postType) ? 'active' : ''}>
                                                        <Links title={(record.title == 'Content Types' || record.title == 'Pages') ? 'All - ' + records.title : records.title} url={records.url} class='sidebar__sub-menu' />
                                                    </li>
                                                );
                                            })
                                            }
                                        </ul>
                                    </li>
                                </ul>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}
