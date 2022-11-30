import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchProducts } from '../../../store/product';
import './searchBar.css'

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch()
  const history = useHistory()

  const searchSubmit = async (e) => {
    e.preventDefault()
    if (keyword.trim().length === 0) {
      return
    }
    const res = await dispatch(searchProducts(keyword))
    if (res){
      history.push(`/search/${keyword}`)
    }
    setKeyword("")
  }
  return (
    <div className='searchBar-main'>

      <div className='navBar-searchBar-container'>
        <form onSubmit={searchSubmit} className="searchBar-form">
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
