import React from 'react'

//another way of creating Props
export const Header = ({header}: {header: string}) => {
  return <h1>{header}</h1>
}
