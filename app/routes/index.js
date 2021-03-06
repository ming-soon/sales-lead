import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import CoreLayout from 'App/components/CoreLayout'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import User from './User'
import Sheet from './Sheet'
import NotFound from './NotFound'

export default (store) => {
  const requireGuest = (nextState, replace, callback) => {
    const { user } = store.getState()
    if (user) {
      replace({
        pathname: '/profile',
      })
    }
    callback()
  }

  const requireAuth = (nextState, replace, callback) => {
    const { user } = store.getState()
    if (!user) {
      replace({
        pathname: '/login',
      })
    }
    callback()
  }

  const requireAdmin = (nextState, replace, callback) => {
    const { user } = store.getState()
    if (!user || !user.isAdmin) {
      replace({
        pathname: '/',
      })
    }
    callback()
  }

  return (
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={Home.List} onEnter={requireAuth} />

      <Route path="login" component={Login} onEnter={requireGuest} />
      <Route onEnter={requireAuth}>
        <Route path="profile" component={Profile} />

        <Route path="leads">
          <Route path="add" component={Home.Edit} />
          <Route path=":id" component={Home.Edit} />
        </Route>

        <Route path="sheets">
          <IndexRoute component={Sheet.List} />
          <Route path="add" component={Sheet.Edit} />
          <Route path=":id" component={Sheet.Edit} />
        </Route>

        <Route path="users" onEnter={requireAdmin}>
          <IndexRoute component={User.List} />
          <Route path="add" component={User.Edit} />
          <Route path=":id" component={User.Edit} />
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  )
}
