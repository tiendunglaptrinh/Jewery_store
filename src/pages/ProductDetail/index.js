// ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Col, Row, InputNumber, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import DefaultLayout from '../../layout/DefaultLayout';
import styles from './ProductDetail.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ContentInPage({ product }) {
    const [quantity, setQuantity] = useState(1);

    const onChangeQuantity = (value) => {
        setQuantity(value);
    };

    const handleBuyProduct = () => {
        // Logic to handle purchasing product
        message.success('Mua hàng thành công, cảm ơn bạn rất nhiều.');
    };

    if (!product) return null;

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col span={10}>
                    <img className={cx('image-product-detail')} src={product.image} alt={product.name} />
                </Col>
                <Col span={14}>
                    <h1 className={cx('name-product-detail')}>{product.name}</h1>
                    <div className={cx('category')}>Danh mục: {product.type}</div>
                    <div className={cx('wrap-icon')}>
                        <FontAwesomeIcon style={{ color: 'rgb(253,216,54)' }} icon={faStar} />
                        <FontAwesomeIcon style={{ color: 'rgb(253,216,54)' }} icon={faStar} />
                        <FontAwesomeIcon style={{ color: 'rgb(253,216,54)' }} icon={faStar} />
                        <FontAwesomeIcon style={{ color: 'rgb(253,216,54)' }} icon={faStar} />
                        <FontAwesomeIcon style={{ color: 'rgb(253,216,54)' }} icon={faStar} />
                        <span className={cx('text-inner')}>(Xem đánh giá)</span>
                        <span className={cx('text-inner')}> | Đã bán 1000+</span>
                    </div>
                    <div className={cx('price-product-detail')}>
                        {product.price.toLocaleString()} VND
                    </div>
                    <div className={cx('condition')}>Tình trạng hiện tại: <span style={{ fontWeight: '500' }}>{product.condition}</span></div>
                    <div className={cx('address')}>
                        <span>Giao đến</span>
                        <span className={cx('address-receive')}>Q.1, P. Bến Nghé, Hồ Chí Minh</span>
                        <span className={cx('change-address')}>Đổi địa chỉ</span>
                    </div>
                    <div className={cx('wrapper-quantity')}>
                        <div className={cx('quantity')}>Số lượng</div>
                        <div className={cx('wrap-btn-quantity')}>
                            <FontAwesomeIcon className={cx('icon-minus')} icon={faMinus}></FontAwesomeIcon>
                            <InputNumber className={cx('btn-quantity')} min={1} max={10} defaultValue={1} onChange={onChangeQuantity} size="small" />
                            <FontAwesomeIcon className={cx('icon-plus')} icon={faPlus}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className={cx('buy-products')}>
                        <Link to="/thank" className={cx('buy-product')} onClick={handleBuyProduct}>Mua sản phẩm</Link>
                        <Link to="/thank" className={cx('buy-product')} onClick={handleBuyProduct}>Mua sản phẩm</Link>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

function ProductDetail() {
    const { productId } = useParams();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/product/get-all');
                setProducts(response.data.data);
                const foundProduct = response.data.data.find(item => item._id === productId);
                setProduct(foundProduct);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, [productId]);

    return (
        <DefaultLayout>
            <ContentInPage product={product} />
        </DefaultLayout>
    );
}

export default ProductDetail;
