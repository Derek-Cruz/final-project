import React from 'react';

export default function Spinner(props) {
  return (
    <div className="d-flex justify-content-center mt-5">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
  );
}
