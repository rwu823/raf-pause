import * as React from 'react'
import styled from 'styled-components'

import rafPause from '../src'

const Div = styled.div``

type Props = {}

type State = {
  Date: Date
}

class Timer extends React.Component<Props, State> {
  static defaultProps = {}

  constructor(props: Props) {
    super(props)
    this.state = {
      Date: new Date(),
    }
  }

  componentDidMount() {
    this.timer.loop()
  }

  componentWillUnmount() {
    this.timer.clean()
  }

  timer = rafPause(() => {
    this.setState({
      Date: new Date(),
    })
  }, 1000)

  render() {
    const { Date } = this.state

    return (
      <Div
      >{`${Date.getHours()}:${Date.getMinutes()}:${Date.getSeconds()}`}</Div>
    )
  }
}
export default Timer
