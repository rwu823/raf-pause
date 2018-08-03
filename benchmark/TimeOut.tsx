import * as React from 'react'
import styled from 'styled-components'

const Div = styled.div``

type Props = {}

type State = {
  Date: Date
}

class Timer extends React.Component<Props, State> {
  private tt: number

  static defaultProps = {}

  constructor(props: Props) {
    super(props)
    this.state = {
      Date: new Date(),
    }

    this.tt = 0
  }

  componentDidMount() {
    this.timer()
  }

  componentWillUnmount() {
    window.clearTimeout(this.tt)
  }

  timer = () => {
    this.tt = window.setTimeout(() => {
      this.setState(
        {
          Date: new Date(),
        },
        this.timer,
      )
    }, 1000)
  }

  render() {
    const { Date } = this.state

    return (
      <Div
      >{`${Date.getHours()}:${Date.getMinutes()}:${Date.getSeconds()}`}</Div>
    )
  }
}
export default Timer
