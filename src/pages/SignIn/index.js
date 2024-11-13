import { useState } from "react";
import classNames from 'classnames/bind';
import styles from "./SignIn.Module.scss";
import InputForm from '../../component/InputForm';
import { Link, useNavigate } from 'react-router-dom';
import * as UserService from "../../services/UserService";
import * as message from '../../component/Message';
import { Spin, message as antdMessage } from 'antd';

const cx = classNames.bind(styles);

function ContentInPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOnchageEmail = (value) => {
        setEmail(value);
    }

    const handleOnchagePassword = (value) => {
        setPassword(value);
    }

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const response = await UserService.loginUser({ email, password });
            if (response.status === "OK") {
                message.success("Đăng nhập thành công!");
                navigate(response.redirectPath);
            } else {
                antdMessage.error(response.message);
            }
        } catch (error) {
            antdMessage.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={cx('wrapper-signin')}>
            <div className={cx('inner-wrap')}>
                <div className={cx('left-content')}>
                    <h1>Xin chào</h1>
                    <p className={cx('text-signin')}>Đăng nhập hoặc tạo tài khoản</p>
                    <InputForm type="text" placeholder="Email" value={email} handleChangeInput={handleOnchageEmail} /><br /><br />
                    <InputForm type="password" placeholder="Mật khẩu" value={password} handleChangeInput={handleOnchagePassword} /><br /><br />
                    <div className={cx('buy-products')}>
                        <button className={cx('btn-signin')} onClick={handleSignIn} disabled={loading}>
                            {loading ? <Spin /> : 'Đăng nhập'}
                        </button>
                    </div>
                    <p className={cx('forgot-pass')}>Quên mật khẩu</p>
                    <p className={cx('register')}>Chưa có tài khoản? <Link to="/signup"><span className={cx('create-account')}>Đăng ký ngay</span></Link> </p>
                </div>
                <div className={cx('right-content')}>
                    <img src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" width="203" alt="logo" />
                    <h4>Mua sắm tại Jewery D&H</h4>
                </div>
            </div>
        </div>
    );
}

export default ContentInPage;
