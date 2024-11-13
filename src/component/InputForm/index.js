import classNames from 'classnames/bind';
import { Input } from 'antd';
import React, { useState } from 'react';

import styles from "./InputForm.module.scss";

const cx = classNames.bind(styles);

function InputForm(props) {
    const { placeholder = "input text", type = "text", ...rests} = props;

    const handleChangeInput = (e) => {
        props.handleChangeInput(e.target.value);
    };

    return (
        <Input
            className={cx('inputform')}
            placeholder={placeholder}
            type={type}
            value={props.value}
            onChange={handleChangeInput}
            {...rests}
        />
    );
}

export default InputForm;
