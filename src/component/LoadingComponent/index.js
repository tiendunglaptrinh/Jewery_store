import React from 'react'
import { Spin } from 'antd'


function Loading({children, isLoading, deday = 200}) {
    return (
        <Spin spinning={isLoading} delay={deday}>
            {children}
        </Spin>
    );
}

export default Loading;