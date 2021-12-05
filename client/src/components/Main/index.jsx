import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WritePost from '../../components/WritePost';
import Home from '../../pages/HomePage';
import HoiDap from '../../pages/HoiDap';
import CuuTro from '../../pages/CuuTro';
import Shop from '../../pages/Shop';
import HomePostDetail from '../../pages/HomePostDetail';
import User from '../../pages/User';
import CuuTroPostDetail from '../../pages/CuuTroPostDetail';
import HoiDapPostDetail from '../../pages/HoiDapPostDetail';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import Cart from '../../pages/GioHang';
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route exact path='/hoidap'>
                <HoiDap />
            </Route>
            <Route exact path='/cuutro'>
                <CuuTro />
            </Route>
            
            <Route exact path='/shop'>
                <Shop />
            </Route>
            <Route exact path='/shop/cart'>
                <Cart />
            </Route>
            <Route path='/create'>
                <WritePost />
            </Route>

            <Route path='/home/:id'>
                <HomePostDetail />
            </Route>
            <Route path='/cuutro/:id'>
                <CuuTroPostDetail />
            </Route>
            <Route path='/hoidap/:id'>
                <HoiDapPostDetail />
            </Route>
            <Route path='/signin'>
                <SignIn/>
            </Route>
            <Route path='/signup'>
                <SignUp/>
            </Route>
            <Route path='/user'>
                <User />
            </Route>
        </Switch>
    </main>
)

export default Main;