import React, {PropTypes} from 'react';
import MyRequestListItem from './MyRequestListItem';

const MyRequestList = ({myRequests, cancelRequest}) => {
  return (
    <form>
      <h4 className="text-center">My Requests</h4>
        <ul id="requestList">
        {
          myRequests.map( (request, i) => {
            return <MyRequestListItem 
              key={request.requestedBook._id + request.offeredBook._id} 
              requestedBook={request.requestedBook} 
              offeredBook={request.offeredBook} 
              index={i}
              cancelRequest={cancelRequest}
            />;
          })
        }
        </ul>  
    </form>
  );
};

MyRequestList.propTypes = {
  myRequests: PropTypes.array.isRequired,
  cancelRequest: PropTypes.func.isRequired
};

export default MyRequestList;

