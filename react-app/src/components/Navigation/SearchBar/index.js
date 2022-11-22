import React, { useState } from 'react';
// import { getProductsBySearch } from '../../../store/products';
import './searchBar.css'

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  // const [errors, setErrors] = useState([]);


  const handleSearch = async (e) => {
    e.preventDefault()
    if (keyword.trim().length === 0) {
      // return setErrors(["Please enter a keyword!"])
      return
    }
    // history.push(`/search/${keyword}`)
    // const response = await dispatch(getProductsBySearch(keyword))
    // if (response) {
    //   history.push(`/search/${keyword}`)
    // }
    setKeyword("")
    // setErrors([])
  }

  return (
    <div className='searchBar-main'>
      {/* <div>
      {errors?.map((error, i) => {
          return (
            <div key={i} className='search-errors'>{error}</div>
          )
        })}
    </div> */}
      <div className='navBar-searchBar-container'>
        <form onSubmit={handleSearch} className="searchBar-form">
          <input
            placeholder='Search for anything'
            className='searchBar-input'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            maxLength="140"
          />
          <div className='searchbar-right'>
          <button type='submit' className='searchBar-button'>
          <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
          </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBar;
