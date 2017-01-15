import React from 'react';
import TextInput from '../common/TextInput';

const AddBookForm = ({searchText, onSearch, onChange, error, searching}) => {
  return (
    <form>
      <TextInput
        name="search"
        label="Search for a book title"
        placeholder="Type book title..."
        value={searchText}
        onChange={onChange}
        error={error}/>

      <input
        type="submit"
        className="btn btn-primary longButton"
        onClick={onSearch}
        disabled={searching}
        value={searching ? "Searching..."  : "Search"}/>
    </form>
  );
};

AddBookForm.propTypes = {
  searchText: React.PropTypes.string.isRequired,
  onSearch: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
  searching: React.PropTypes.bool
};

export default AddBookForm;