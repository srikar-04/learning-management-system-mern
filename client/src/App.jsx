import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth/index.jsx'

function App() {

  return (
    <>
      {/* Routes acts as a container for all children routes and it renders the first route that matches the "url" */}
      <Routes>
        {/* if the url matches then the corresponding component is rendered */}
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
