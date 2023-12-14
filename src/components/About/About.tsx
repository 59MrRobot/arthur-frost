import React from 'react';
import './About.scss';

interface Props {
  body: Body | null;
}

export const About: React.FC<Props> = React.memo(
  ({ body }) => {

    return (
      <>
        {body && (
          <div className="about" dangerouslySetInnerHTML={{ __html: body.About }}>

          </div>
        )}
      </>
    )
  }
)