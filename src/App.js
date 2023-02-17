import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { BusketState } from './context/BusketContext'
import { CatalogState } from './context/CatalogContext'


function App() {

  const {login, logout, userId, token} = useAuth()
  let isAuthenticatedAdmin = false
  let isAuthenticatedClient = false
  if (token && userId === 0) {
    isAuthenticatedAdmin = true
  } else if (token) {
    isAuthenticatedClient = true
  }
  const routes = useRoutes(isAuthenticatedAdmin, isAuthenticatedClient)
  return (
    <AuthContext.Provider value = {{
      login, logout, token, userId, isAuthenticatedAdmin, isAuthenticatedClient
    }}>
      <CatalogState>
        <BusketState>
          <Router>
              {routes}
          </Router>
        </BusketState>
      </CatalogState>
    </AuthContext.Provider>
  ) 
}

export default App;
