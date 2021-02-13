import React, { useState } from 'react'
import classes from './price.module.css'
import { Pagination } from 'antd';
import CollapsePanel from './CollapsePanel';



function AllProductPage(props) {

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  let pages = []
  let pageCount = props.itemData.length / pageSize
  for (let i = 1; i <= Math.ceil(pageCount); i++) {
    pages.push(i)
  }

  const indexOfLastTodo = currentPage * pageSize;
  const indexOfFirstTodo = indexOfLastTodo - pageSize;
  const currentTodos = props.itemData.slice(indexOfFirstTodo, indexOfLastTodo);


  return (
    <div>
      {
        currentTodos.map(item => {
          return (
            <CollapsePanel item={item} rate={props.rate} showUSD={props.showUSD} key={item.id}/>
          )
        })
      }
      <div className={classes.pages}>
        <Pagination defaultCurrent={1} pageSize={pageSize} showSizeChanger={false} total={props.itemData.length} onChange={(e) => {
          setCurrentPage(e)
        }} />
      </div>
    </div>
  )

}
export default AllProductPage;
