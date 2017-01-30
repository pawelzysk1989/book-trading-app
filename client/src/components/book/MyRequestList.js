import React, {PropTypes} from 'react';

const MyRequestList = ({myRequests}) => {
  console.log(myRequests);
  return (
    <div></div>
  );
};

MyRequestList.propTypes = {
  myRequests: PropTypes.array.isRequired
};

export default MyRequestList;