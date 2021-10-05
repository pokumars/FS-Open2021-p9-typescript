import React from 'react'
import { CoursePart } from '../types'
import { Part } from './Part'

interface ContentProps {
  courseObj: CoursePart
}

export const Content = (props: ContentProps) => {
  return (
    <p>
    
    <Part coursePart={props.courseObj} />
  </p>
  )
}
/*      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>*/