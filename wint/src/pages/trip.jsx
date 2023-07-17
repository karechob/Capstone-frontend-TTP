import React from 'react'
import BudgetBreakdownGraph from '../components/BudgetBreakdownGraph'

function trip() {
  return (
    <div>
        <h1>
            Budget Breakdown
        </h1>
        <div className='budget-graph-container'>
           <BudgetBreakdownGraph/> 
        </div>
    </div>
  )
}

export default trip;