import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import { Main } from './components'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    )
  }
}

