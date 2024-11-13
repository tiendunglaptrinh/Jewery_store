import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from "./SignUp.Module.scss";
import InputForm from '../../component/InputForm';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import * as UserService from "../../services/UserService"
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../component/LoadingComponent";
import { useNavigate } from 'react-router-dom';
import * as message from '../../component/Message'

const cx = classNames.bind(styles);

function ContentInPage() {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handleOnchageEmail = (value) =>{
        setEmail(value);
    }
    const handleOnchagePassword = (value) =>{
        setPassword(value);
    }
    const handleOnchageConfirmPassword = (value) =>{
        setConfirmPassword(value);
    }
    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    )
    const { data, isSuccess, isError} = mutation
    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmPassword})
        console.log ("signUp: ", email, password, confirmPassword);
    }
    const handleNavigateSignIn = () => {
        navigate('/signin')
    }
    return (
        <div className={cx('wrapper-signin')}>
            <div className={cx('inner-wrap')}>
                <div className={cx('left-content')}>
                    <h1>Đăng ký</h1>
                    <p className={cx('text-signin')}>Đăng ký hoặc đăng nhập tài khoản</p>
                    <InputForm type="text" placeholder="Email" value={email} handleChangeInput={handleOnchageEmail}/><br/><br/>
                    <InputForm type="password" placeholder="Mật khẩu" value={password} handleChangeInput={handleOnchagePassword}/><br/><br/>
                    <InputForm type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} handleChangeInput={handleOnchageConfirmPassword}/>
                    {data?.status === "ERR" && <span>{data?.message}</span>}
                    {data?.status === "OK" && message.success() && handleNavigateSignIn()}                
                        <div className={cx('buy-products')}>
                            <button className={cx('btn-signin')} onClick={handleSignUp}>Đăng ký</button>
                        </div>
                    <p className={cx('register')}>Bạn đã có tài khoản? <Link to="/signin"><span className={cx('create-account')}>Đăng nhập ngay</span></Link> </p> 
                </div>
                <div className={cx('right-content')}>
                    <img src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" width="203" alt="logo"/>
                    <h4>Mua sắm tại Jewery D&H</h4>
                </div>
            </div>
        </div>
    );
}

function Profile() {
    return ( 
        <ContentInPage />
     );
}

export default Profile;