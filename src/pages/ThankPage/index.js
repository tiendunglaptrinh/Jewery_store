// ThankPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ThankPage.module.scss';

const cx = classNames.bind(styles);

const ThankPage = () => {
    return (
        <div className={cx('wrapper-signin')}>
            <div className={cx('inner-wrap')}>
                <div className={cx('left-content')}>
                    <h1>Mua hàng thành công, cảm ơn bạn rất nhiều!</h1>
                    <Link to="/" className={cx('btn-home')}>
                        Trở về trang chủ
                    </Link>
                </div>
                <div className={cx('right-content')}>
                    <img src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" width="203" alt="logo" />
                    <h4>Mua sắm tại Jewery D&H</h4>
                </div>
            </div>
        </div>
    );
};

export default ThankPage;
