import React from 'react'
import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface PartProps {
  coursePart: CoursePart
}

export const Part = ({ coursePart }: PartProps) => {
  

 switch (coursePart.type) {
    case "groupProject":

      return (
        <div className="part">
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
          <h4>Group Project</h4>

          <p>{coursePart.groupProjectCount} groupProject</p>

        </div>
      )
    case "normal":
      return (
        <div className="part">
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>

          <p><b>Description</b>: {coursePart.description}</p>
        </div>
      )
    case "submission":
      return (
        <div className="part">
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>

          <p><b>Description</b>: {coursePart.description}</p>

          Submit exercises <a href={coursePart.exerciseSubmissionLink} >here</a>
        </div>
      )
      case "special":
        return (
          <div className="part">
            <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
  
            <p><b>Description</b>: {coursePart.description}</p>

            <p><b>Required skills</b>: {coursePart.requirements.join(', ')}</p>
          </div>
        )

    default:
      return assertNever(coursePart)
  }

}
