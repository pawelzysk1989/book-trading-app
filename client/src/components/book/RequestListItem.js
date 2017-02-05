import React, {PropTypes} from 'react';

const RequestListItem = ({requestedBook, offeredBook, index, cancelRequest, acceptRequest, isMyRequests}) => {
  return (
    <li className="item">
   	  <div className="value">{requestedBook.title + " \u2194 " + offeredBook.title}</div>
      {!isMyRequests  && <span className="accept-button" onClick={event => acceptRequest(event, index)}>{"\u2714"}</span>}
      <span className="delete-button" onClick={event => cancelRequest(event, index, isMyRequests)}>{"\u2718"}</span>
	 </li>
  );
};

RequestListItem.propTypes = {
  requestedBook: PropTypes.object.isRequired,
  offeredBook: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  cancelRequest: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func,
  isMyRequests: PropTypes.bool.isRequired
};

export default RequestListItem;