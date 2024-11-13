// src/pages/Homepage/Homepage.js
import DefaultLayout from '../../layout/DefaultLayout'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import CartProduct from '../../component/CartComponent';
import styles from './Homepage.module.scss';
import SliderComponent from '../../component/Slider';
import CategoryProducts from '../../component/CategoryProducts';
import slider1 from '../../assets/images/JeweryDH/slider1.png'
import slider2 from '../../assets/images/JeweryDH/slider2.png'
import slider3 from '../../assets/images/JeweryDH/slider3.png'
import slider4 from '../../assets/images/JeweryDH/slider4.png'


const cx = classNames.bind(styles);

function ContentHomePage() {
    const ArrayProduct = ['Nhẫn', 'Vòng đeo tay', 'Vòng cổ', 'Đồng hồ đeo tay', 'Bộ trang sức'];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('category')}>
                {ArrayProduct.map((item) => {
                    return (
                        <CategoryProducts name={item} key={item} />
                    )
                })}
            </div>
            <SliderComponent className={cx('slider')} arrImages={[slider1, slider2, slider3, slider4]} />
            <div className={cx('product-carts')}>
                <CartProduct/>
            </div>
        </div>
    );
}

function Homepage() {
    return ( 
        <>
            <DefaultLayout>
                <ContentHomePage/>
            </DefaultLayout>
        </>
    );
}

export default Homepage;
