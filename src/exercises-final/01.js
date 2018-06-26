import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  state = {on: false}

  toggle = () =>
    //Use a this.setState callback function
    this.setState(
      //Here {on} can be used in the updater because the currentState
      //is passed as the value of the key in the first object argument.
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      },
    )
  render() {
    const {on} = this.state
    return <Switch on={on} onClick={this.toggle} />
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle'

export {Toggle, Usage as default}
