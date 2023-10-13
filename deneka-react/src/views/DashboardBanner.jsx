import styles from "./DashboardBanner.module.css";
import logo from '../assets/media/Deneka-One.png'; // Importing the logo
import vector1 from"../assets/media/vector-15.svg"
import vector2 from"../assets/media/vector-16.svg"
import vector3 from"../assets/media/vector-17.svg"
import vector4 from"../assets/media/vector-18.svg"

import vector5 from"../assets/media/vector-21.svg"

import bannerImage from "../assets/media/rectangle-34625609@2x.png"

const DashboardBanner = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.welcomeMarkYourMarketplacWrapper}>
          <div className={styles.welcomeMarkYourContainer}>
            <p className={styles.welcomeMark}>
              <span>
                <span className={styles.span}>
                  <span className={styles.welcome}>{`Welcome! `}</span>
                  <b className={styles.welcome}>Mark</b>
                </span>
              </span>
              <span>
                <span>
                  <span className={styles.span}>{`, `}</span>
                </span>
              </span>
            </p>
            <p className={styles.blankLine}>
              <span>
                <span className={styles.blankLine1}>
                  <span>&nbsp;</span>
                </span>
              </span>
            </p>
            <p className={styles.welcomeMark}>
              <span>
                <span className={styles.blankLine1}>
                  <span className={styles.y}>Y</span>
                  <span className={styles.ou}>ou</span>
                  <span className={styles.r}>{`r `}</span>
                  <span>Personalised Dashboard</span>
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={styles.frameContainer}>
          <div className={styles.vectorParent}>
            <img className={styles.frameChild} alt="" src={vector1} />
            <div className={styles.div}>31</div>
          </div>
          <div className={styles.frameDiv}>
            <div className={styles.bronzeWrapper}>
              <b className={styles.bronze}>Bronze</b>
            </div>
            <div className={styles.frameParent1}>
              <div className={styles.frameItem} />
              <div className={styles.pointsForNextLevelWrapper}>
                <div className={styles.pointsForNext}>
                  600 points for next level
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frameParent2}>
          <div className={styles.achievedServicesWrapper}>
            <b className={styles.achievedServices}>Achieved Services</b>
          </div>
          <div className={styles.frameParent3}>
            <div className={styles.outOf10AchievedWrapper}>
              <div className={styles.outOf10Container}>
                <span className={styles.outOf10Container1}>
                  <span>6</span>
                  <span className={styles.outOf10}> out of 10 Achieved</span>
                </span>
              </div>
            </div>
            <div className={styles.marketplaceTaskBar}>
              <img
                className={styles.marketplaceTaskBarChild}
                alt=""
                src={vector2}
              />
              <img
                className={styles.marketplaceTaskBarChild}
                alt=""
                src={vector3}
              />
              <img
                className={styles.marketplaceTaskBarChild}
                alt=""
                src={vector4}
              />
              <img
                className={styles.marketplaceTaskBarChild}
                alt=""
                src={vector5}
              />
              <img
                className={styles.marketplaceTaskBarChild}
                alt=""
                src={vector2}
              />
              <img
                className={styles.marketplaceTaskBarChild}
                alt=""
                src={vector3}
              />
              <img
                className={styles.marketplaceTaskBarChild}
                alt=""
                src={vector3}
              />
              <img
                className={styles.marketplaceTaskBarChild}
                alt=""
                src={vector4}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainImage}>
        <div className={styles.circle}>
          <img
            className={styles.circleChild}
            alt=""
            src= {bannerImage}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;