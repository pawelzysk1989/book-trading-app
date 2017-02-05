import React, {PropTypes} from 'react';
import RequestListItem from './RequestListItem';

const RequestList = ({requests, cancelRequest, acceptRequest, isMyRequests}) => {
  return (
    <form className="requests">
      <h4 className="text-center">{isMyRequests ? "My Requests" : "Requests To Me"}</h4>
        <ul id="requestList">
        {
          requests.map( (request, i) => {
            return <RequestListItem 
              key={request.requestedBook._id + request.offeredBook._id} 
              requestedBook={request.requestedBook} 
              offeredBook={request.offeredBook} 
              index={i}
              cancelRequest={cancelRequest}
              acceptRequest={acceptRequest}
              isMyRequests={isMyRequests}
            />;
          })
        }
        </ul>  
    </form>
  );
};

RequestList.propTypes = {
  requests: PropTypes.array.isRequired,
  cancelRequest: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func,
  isMyRequests: PropTypes.bool.isRequired
};

export default RequestList;

