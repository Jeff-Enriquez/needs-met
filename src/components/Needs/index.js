import React from 'react';


function Needs({ isUnmet, toggleIsUnmet }) {
  return (
    <>
      {isUnmet ? (
        <>
          <button className='needs-a' id='needs-selected'>Unmet Needs</button>
          <button className='needs-a' onClick={toggleIsUnmet}>Met Needs</button>
        </>
      ) : (
        <>
          <button className='needs-a' onClick={toggleIsUnmet}>Unmet Needs</button>
          <button className='needs-a' id='needs-selected'>Met Needs</button>
        </>
      )}
      <div>
        <img src={process.env.PUBLIC_URL + '/images/sandals.png'} alt='profile'/>
        <p>This is a comment of what my posted need is.</p>
      </div>
    </> 
  );
}

export default Needs;
