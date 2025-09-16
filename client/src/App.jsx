import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth/index.jsx'
import RouteGuard from './components/route-guard/RouteGuard'
import { useContext } from 'react'
import { AuthContext } from './context/auth-context'
import InstructorDashboard from './pages/instructor/InstructorDashboard'
import StudentLayout from './components/student-view/StudentLayout'
import StudentHome from './pages/student/StudentHome'
import NotFoundPage from './pages/not-found/NotFoundPage'
import AddNewCoursePage from './pages/instructor/AddNewCoursePage'
import StudentCoursesPage from './pages/student/StudentCoursesPage'
import StudentCourseDetailsPage from './pages/student/StudentCourseDetailsPage'
import PaymentCancelPage from './pages/payments/PaymentCancelPage'
import PaymentReturnPage from './pages/payments/PaymentReturnPage'
import MyCourses from './pages/student/MyCourses'
import CourseProgressPage from './pages/student/CourseProgressPage'

function App() {

  const { auth } = useContext(AuthContext)
  console.log(auth, 'auth in app.jsx');
  

  return (
    <>
      {/* Routes acts as a container for all children routes and it renders the first route that matches the "url" */}
      <Routes>
        {/* if the url matches then the corresponding component is rendered */}
        <Route 
          path='/auth'
          element={
            <RouteGuard 
              element={<AuthPage />}
              authenticated={auth.authenticate}
              user={auth.user}
            />
          }
        />

        <Route 
          path='/instructor'
          element = {
            <RouteGuard 
              element={<InstructorDashboard />}
              authenticated={auth.authenticate}
              user={auth.user}
            />
          }
        />

        <Route 
          path='/instructor/create-course'
          element = {
            <RouteGuard 
              element={<AddNewCoursePage />}
              authenticated={auth.authenticate}
              user={auth.user}
            />
          }
        />

        <Route 
          path='/instructor/edit-course/:id'
          element = {
            <RouteGuard 
              element={<AddNewCoursePage />}
              authenticated={auth.authenticate}
              user={auth.user}
            />
          }
        />

        {/* <Route path="/course-progress/:currentCourseId" element={<CourseProgressPage />} /> */}

       <Route path='/'
        element={
          <RouteGuard 
            element={<StudentLayout />}
            authenticated={auth.authenticate}
            user={auth.user}
          />
        }
       >
          <Route path='home' element={<StudentHome />} />
          <Route path='' element={<StudentHome />} />
          <Route path='courses' element={<StudentCoursesPage />} />
          <Route path='course/details/:id' element={<StudentCourseDetailsPage />} />
          <Route path="/payment-return" element={<PaymentReturnPage />} />
          <Route path="/payment-cancel" element={<PaymentCancelPage />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/course-progress/:currentCourseId" element={<CourseProgressPage />} />
       </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
