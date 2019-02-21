/**
 * Here you create a React component like always...
 * We are ONLY defining the component.
 * 
 * some-react-component-ecbundle.js
 */
import React, { Component } from 'react';

class MyCarousel extends Component { 
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    };
  }
    render() {
      return (
        <div style={ {border: "3px solid red", padding: '10px'} }>
          <h1 style={ { margin: 0 } }>Zomaar een React component</h1>
          { this.props.param1 && <div>Param1: { this.props.param1 }</div> }
          { this.props.param2 && <div>Param2: { this.props.param2 }</div> }
          <button title="Hallo" onClick={this.myClick}><b>Hallo</b> hoe is het</button> 
          <button onClick={this.incrementCounter.bind(this)}>Teller: { this.state.counter }</button>
        </div>
      )
    }
    myClick() {
      alert("Clicked");
    }
    incrementCounter(event) {
      var myEvent = new CustomEvent('increment-counter', { bubbles: true });

      event.target.dispatchEvent(myEvent);

      this.setState(state => {
        return {
          counter: state.counter + 1
        }
      })
    }
  }
export default MyCarousel;
