import React, { useState } from 'react'


const SearchBar = ({ history }) => {
    const [keyword, setKeyword] = useState('')
  
    const submitHandler = (e) => {
      e.preventDefault()
      if (keyword.trim()) {
        window.location.href=`/search/${keyword}`
      } else {
        window.location.href='/'
      }
    }
    return (
        <form method='post' onSubmit={submitHandler}>
        <div className='trackForm'>
        <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder="Search.." name="search"/>
        <button type="submit"><i className="fa fa-search"></i></button>
        </div>
        </form>
    )
  }

export default SearchBar