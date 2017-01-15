import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import SearchFilter from './SearchFilter';
import SearchList from './SearchList';
import * as searchActions from '../../actions/searchActions';
import {bindActionCreators} from 'redux';
import {SEARCH_LIMIT} from '../../constants/variables';

export class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };

    this.moreResults = this.moreResults.bind(this); 
  }

  moreResults(){
    const offset = this.props.books.length;
    this.props.actions.searchForBook(this.props.criteria, SEARCH_LIMIT, offset);
  }

  render() {
    const offset = this.props.books.length;
    const count = this.props.count;
    return (
      <div>
        <SearchFilter/>
        <SearchList
          books={this.props.books}
        />
        {offset < count && <button className="btn btn-large btn-primary longButton" type="button" onClick={this.moreResults}>More Results</button>}
      </div>
    );
  }
}

Search.propTypes = {
  actions: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  criteria: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.search.books,
    count: state.search.count,
    criteria: state.search.criteria
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
