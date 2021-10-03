import React from 'react'
import { Course } from '../types'

interface ContentProps {
  courseObj: Course
}

export const Content = (props: ContentProps) => {
  return (
    <p>
    {props.courseObj.name} {props.courseObj.exerciseCount}
  </p>
  )
}
/*      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>*/