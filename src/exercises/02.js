// Compound Components

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  // you can create function components as static properties!
  // for example:
  // static Candy = (props) => <div>CANDY! {props.children}</div>
  // Then that could be used like: <Toggle.Candy />
  // This is handy because it makes the relationship between the
  // parent Toggle component and the child Candy component more explicit
  // 🐨 You'll need to create three such components here: On, Off, and Button
  //    The button will be responsible for rendering the <Switch /> (with the right props)
  // 💰 Combined with changes you'll make in the `render` method, these should
  //    be able to accept `on`, `toggle`, and `children` as props.
  //    Note that they will _not_ have access to Toggle instance properties
  //    like `this.state.on` or `this.toggle`.
  state = {on: false}

  static On = ({on, children}) => (on ? children : null)
  static Off = ({on, children}) => (on ? null : children)
  static Button = ({on, toggle}) => (
    <Switch on={on} onClick={toggle} />
  )

  toggle = () => {
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  }

  render() {
    // we're trying to let people render the components they want within the Toggle component.
    // But the On, Off, and Button components will need access to the internal `on` state as
    // well as the internal `toggle` function for them to work properly. So here we can
    // take all this.props.children and make a copy of them that has those props.
    //
    // To do this, you can use:
    // 1. React.Children.map: https://reactjs.org/docs/react-api.html#reactchildrenmap
    // 2. React.cloneElement: https://reactjs.org/docs/react-api.html#cloneelement
    //
    // 🐨 you'll want to completely replace the code below with the above logic.
    // const {on} = this.state
    // return <Switch on={on} onClick={this.toggle} />

    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle,
      }),
    )
  }
}

class Images extends React.Component {
  static Description = ({src, children}) =>
    src ? children + ' ' + src : null
  static Thumbnail = ({src, alt}) => <img alt={alt} src={src} />
  render() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        src: this.props.src,
        alt: this.props.alt,
      }),
    )
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <div>
      <Toggle onToggle={onToggle}>
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Button />
        <Toggle.Off>The button is off</Toggle.Off>
      </Toggle>

      <Images
        alt="some text"
        src="http://via.placeholder.com/350x150"
      >
        <Images.Thumbnail />
        <Images.Description>Hello fool</Images.Description>
      </Images>
    </div>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
