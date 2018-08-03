import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import Timer from '../Timer'

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

  componentDidMount() {}

  render() {
    return (
      <Div>
        <h1>RafPause</h1>
        {[...new Array(1000)].map((_v, i) => (
          <Timer key={i} />
        ))}
      </Div>
    )
  }
}

export default hot(module)(RafPage)
