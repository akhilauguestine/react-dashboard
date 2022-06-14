import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from '../components/organisms/dashboard';
import Edit from '../components/organisms/post-list';
import MySites from '../components/organisms/my-sites';
import Header from '../components/molecules/header';
import Sidebar from '../components/molecules/sidebar';
import NewPost from '../components/organisms/post-new';
import Post from '../components/organisms/post';
import './index.scss'
import { getPostTypeUrl, getPostTitlesJson, getPostTitleJson, } from './values'

const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

function Dashboard() {
    const postTypeUrl = getPostTypeUrl();
    const postTitles = getPostTitlesJson(postTypeUrl);
    const postTitle = getPostTitleJson(postTypeUrl);
    return (
        <div className='dashboard'>
            {scrollTop()}
            <Header />
            <Sidebar />
            <div className='content'>
                <div className='content__wrapper'>
                    <Routes>
                        <Route path="/*" element={<Home />} />
                        <Route path="/dashboard/my-sites/" element={<MySites />} />
                        <Route path="/dashboard/edit/" element={<Edit type={postTypeUrl} title={postTitles} />} />
                        <Route path="/dashboard/post-new/" element={<NewPost type={postTypeUrl} title={postTitle} titles={postTitles} />} />
                        <Route path="/dashboard/post/" element={<Post title={postTitle} titles={postTitles}/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;