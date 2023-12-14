import React from 'react';
import './ListComponent.scss';
import { ItemComponent } from '../ItemComponent';

interface Props {
  timelineList: TimelineItem[];
}

export const ListComponent: React.FC<Props> = React.memo(
  ({ timelineList }) => {
    return (
      <div className="list-component">
        <ul className="list-component__list">
          {
            timelineList.map((timeLineItem) => (
              <li key={timeLineItem.Id} className='list-component__item'>
                <ItemComponent timeLineItem={timeLineItem} />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
)