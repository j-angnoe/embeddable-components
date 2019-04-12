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
		try {
			var scriptUrl = document.currentScript.src;
		} catch (err) {
			var scriptUrl = false
		}
      return (
        <div style={ {border: "3px solid red", padding: '10px'} }>
          <h1 style={ { margin: 0 } }>Example React component</h1>
          { this.props.param1 && <div>Value of param1: { this.props.param1 }</div> }
          { this.props.param2 && <div>Value of param2: { this.props.param2 }</div> }
		  <button onClick={this.incrementCounter.bind(this)}>Increment counter</button>
		  <div>Counter value: { this.state.counter } </div>

		  { !scriptUrl ? '' : (
			<div>
				<p>Embed me:</p>
				<pre style={ { background: '#ddd' , padding: '10px' } }>
					&lt;some-react-component param1="p1..." param2="p2..."&gt;&lt;/some-react-component&gt;<br/>
					&lt;script src="{scriptUrl}"&gt;&lt;/script&gt;
				</pre>
			</div>
		  )}
        </div>
      )
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
