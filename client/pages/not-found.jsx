import React from 'react';

export default function NotFound(props) {
  return (
    <div>
      <div>
        <div>
          <h3 className="no-results-style">
            Uh oh, we could not find the page you were looking for!
          </h3>
          <p>
            <a className="no-results-style" href="#">Go back Home!</a>
          </p>
        </div>
      </div>
    </div>
  );
}
