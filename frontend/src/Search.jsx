import React, { useState } from 'react'
import Header from './component/Header'
import LatestPost from './component/LatestPost'
import SearchBar from './component/SearchBar'


const Search = () => {
  return (
    <>
    <Header/>
    <div className='content'>
    <SearchBar/>
    <LatestPost/>
    </div>
    </>
  )
}

export default Search