import React from 'react'
import { Course } from '../types'

interface TotalProps  {
  exercisesArr: Course[]
}

export const Total = ({exercisesArr}: TotalProps) => {
  return (
    <span className='total-container'>
    Number of exercises{" "}
    {exercisesArr.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </span>
  )
}
//   {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}