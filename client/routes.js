import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import { Main, Delete } from './components'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    )
  }
}

