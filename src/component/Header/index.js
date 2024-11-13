import React, { useEffect, useState } from 'react';
import { Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import logoUI from "../../assets/images/logoStore.png";

const cx = classNames.bind(styles);

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) return;

                const response = await axios.get('/api/user/check-loggedin', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.status === 'OK') {
                    setUser(response.data.data);
                }
            } catch (error) {
                console.error('Not logged in or session expired', error);
                setUser(null);
            }
        };
        checkLoggedIn();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/api/user/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            localStorage.removeItem('access_token');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <header className={cx('header')}>
            <div className={cx('logo')}>
                <Link to="/"><img src={logoUI} alt="Logo" /></Link>
            </div>
            <div className={cx('search')}>
                <Input.Search placeholder="Search products" enterButton />
            </div>
            <div className={cx('actions')}>
                {user ? (
                    <>
                        <Avatar src={user.avatar || 'https://via.placeholder.com/150'} alt="User Avatar" />
                        <span className={cx('username')}>
                            {user.isAdmin ? `Admin: ${user.name}` : `User: ${user.name}`}
                        </span>
                        <Button type="primary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                            Đăng xuất
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/signin">
                            <Button className={cx('btn-login')} type="primary" icon={<UserOutlined />}>
                                Đăng nhập
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button type="primary" style={{ marginLeft: '10px' }}>
                                Đăng ký
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
