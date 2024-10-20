import React from 'react'
import IndexHeader from './IndexHeader'
import IndexFooter from './IndexFooter'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
        <IndexHeader/>
        <Outlet/>
        <IndexFooter/>
    </>
      )
}

export default HomeLayout