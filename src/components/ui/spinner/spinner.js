import React from 'react'
import BarLoader from 'react-spinners/BarLoader'
import './spinner.css'

class ReactSpinner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  render () {
    return (
      <div className='loading'>
        <BarLoader
          color={'#0000FF'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default ReactSpinner
