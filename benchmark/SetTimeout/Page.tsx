import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'

import TimeOut from '../TimeOut'

const Div = styled.div`
  text-align: center;
`

type Props = {}

type State = {}

class RafPage extends PureComponent<Props, State> {
  static defaultProps = {}

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Div>
        <h1>SetTimeout</h1>
        {[...new Array(1000)].map((_v, i) => (
          <TimeOut key={i} />
        ))}
      </Div>
    )
  }
}

export default hot(module)(RafPage)
