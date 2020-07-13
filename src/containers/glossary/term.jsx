import React from 'react'
import { Card, CardContent, Title } from 'bloomer'

const Term = props => {
  const { description, title } = props
  return (
    <article>
      <Card>
        <CardContent>
          <Title isSize={3}>{title}</Title>
          {props.children}
        </CardContent>
      </Card>
    </article>
  )
}

export default Term;
