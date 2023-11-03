import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';

const PricingCard = () => {
  const dataSource = {
    wrapper: {
      className: 'pricing0 pricing0-wrapper',
    },
    OverPack: {
      component: Row,
      className: 'pricing0-overpack',
    },
    imgWrapper: {
      md: 12,
      xs: 24,
      className: 'pricing0-img-wrapper',
    },
    img: {
      children: 'your-image.jpg', // Replace with your image source
    },
    childWrapper: {
      md: 12,
      xs: 24,
      className: 'pricing0-text-wrapper',
    },
  };

  return (
    <div {...dataSource.wrapper}>
      <OverPack component={Row} {...dataSource.OverPack}>
        <TweenOne
          key="img"
          animation={{
            x: '-=30',
            opacity: 0,
            type: 'from',
            ease: 'easeOutQuad',
          }}
          resetStyle
          {...dataSource.imgWrapper}
          component={Col}
        >
          <span {...dataSource.img}>
            <img src={dataSource.img.children} width="100%" alt="img" />
          </span>
        </TweenOne>
        <QueueAnim
          key="text"
          type="bottom"
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          {...dataSource.childWrapper}
          component={Col}
        >
          {/* Your pricing card content here */}
        </QueueAnim>
      </OverPack>
    </div>
  );
}

export default PricingCard;
