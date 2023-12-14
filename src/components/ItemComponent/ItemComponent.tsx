import React from 'react';
import './ItemComponent.scss';

interface Props {
  timeLineItem: TimelineItem;
}

export const ItemComponent: React.FC<Props> = React.memo(
  ({ timeLineItem }) => {
    return (
      <div className="item-component">
        <div className="item-component__wrapper">
          <img
            src={`https://arthurfrost.qflo.co.za/${timeLineItem.Image}`}
            alt="item"
            onError={(event: any) => {
              event.target.src = "https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg"
              event.onerror = null
            }}
            className='item-component__image'
          />

          <div className="item-component__container">
            <p className='item-component__category'>{timeLineItem.Category}</p>

            <h3 className='item-component__title'>{timeLineItem.Title}</h3>

            <p>Episode: <span className='bold'>{timeLineItem.Episode}</span></p>

            <p className='item-component__date'>{timeLineItem.CreateDate}</p>

            <a
              href={`https://youtube.com/watch?v=${timeLineItem.RemoteId}`}
              target='_blank'
              rel="noreferrer"
              className='item-component__link'
            >
              Link to <span>{timeLineItem.MediaName}</span> video
            </a>
          </div>

          <audio controls className='item-component__audio'>
            <source
              src={`https://arthurfrost.qflo.co.za/${timeLineItem.Audio}`}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>

          <p className='item-component__size'>Audio Size: <span className='bold'>{Math.round((timeLineItem.AudioSize / 1000000) * 100) / 100}MB</span></p>
        </div>
      </div>
    )
  }
)