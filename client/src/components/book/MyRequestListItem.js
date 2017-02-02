import React, {PropTypes} from 'react';

const MyRequestListItem = ({requestedBook, offeredBook, index, cancelRequest}) => {
  return (
    <li className="item">
   	  <div className="value">{requestedBook.title + " \u2194 " + offeredBook.title}</div>
      <span className="complete-button">{"\u2714"}</span>
      <span className="delete-button" onClick={event => cancelRequest(event, index)}>{"\u2718"}</span>
	</li>
  );
};

MyRequestListItem.propTypes = {
  requestedBook: PropTypes.object.isRequired,
  offeredBook: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  cancelRequest: PropTypes.func.isRequired
};

export default MyRequestListItem;