import React from 'react'
import BudgetBreakdownGraph from '../components/trips/BudgetBreakdownGraph'
import Collaborators from '../components/trips/Collaborators'
import "../css/trip.css"

function trip() {
  return (
    <div>
        <h1>
            Owner & Collaborators 
        </h1>
        <Collaborators/>
        <h1>
            Budget Breakdown
        </h1>
        <div className='budget-graph-container'>
           <BudgetBreakdownGraph className='graph-budget'/> 
        </div>
    </div>
  )
}

export default trip;