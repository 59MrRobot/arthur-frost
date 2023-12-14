import React from 'react';
import './About.scss';

export const About: React.FC = React.memo(
  () => {
    return (
      <div className='about'>
        <div className="about__wrapper">
          <div className="about__left">
            <h2 className='about__title'>About Dr. Arthur Frost</h2>

            <img
              src={`${process.env.PUBLIC_URL}/Dr-Arthur-PNG.png`}
              alt="Dr Arthur Frost"
              className='about__image'
            />
          </div>

          <div className="about__right">
            <p>
              Dr Arthur Frost is South African born who resides in Port Elizabeth with his wife and three children. Together with his wife, they are the founders and senior pastors of Fathers Heart Digital Church and they have also built three churches.
            </p>

            <p>
              He possesses a gift for Biblical Teaching which lead him to becoming the youngest Dean of a Bible College in South Africa and has remained one since 1992, for various colleges.
            </p>

            <p>
              Along with being a South African best selling author, he founded Generation Impact Bible College and currently serves as their Dean. He is a Professor of Theology. He holds a PH.D. in Education as well as a Doctorate of Divinity D.D.
            </p>

            <p>
              His heart is to see the body of Christ equipped and fulfill their individual function which the Lord has for them.
            </p>
          </div>
        </div>
      </div>
    )
  }
)