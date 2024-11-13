import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CartProduct.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const CartProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/product/get-all');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className={cx('product-list')}>
      {products.map((product) => (
        <div
          key={product._id}
          className={cx('cart-product')}
          onClick={() => handleProductClick(product._id)}
        >
          <img src={product.image} alt={product.name} className={cx('product-image')} />
          <div className={cx('product-info')}>
            <h3 className={cx('product-name')}>{product.name}</h3>
            <p className={cx('product-price')}>{product.price.toLocaleString()} VND</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProduct;
