import classNames from 'classnames/bind'
import { Image } from 'antd';
import Slider from 'react-slick'
import styles from './SliderComponent.module.scss'

const cx = classNames.bind(styles)
function SliderComponent({arrImages}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slideToShow: 1,
        slideToScroll: 1
    }
    return (
        <Slider settings={settings}>
            {arrImages.map((image) => {
                return (
                    <Image className={cx('slider')} src={image} alt="slider" preview={false} width="90%"/>
                )
            })}
        </Slider>
    )
}

export default SliderComponent;