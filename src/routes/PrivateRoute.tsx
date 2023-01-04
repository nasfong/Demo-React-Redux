import { Navigate, Route, Routes, } from 'react-router-dom'
import { lazy, Suspense } from 'react'



const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))
const Game = lazy(() => import("../pages/game/Game"))
const TodoList = lazy(() => import("../pages/todolist/TodoList"))
const Menu = lazy(() => import('../pages/menu/Menu'))
const Administrator = lazy(() => import('../pages/administrator/Administrator'))

function PrivateRoute() {

  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route index element={<Dashboard />} path='dashbord' />
        <Route element={<TodoList />} path='todo-list' />
        <Route element={<Game />} path='game' />
        <Route element={<Menu />} path='menu' />
        <Route element={<Administrator />} path='administrator' />

        <Route
          path="*"
          element={<Navigate to="/dashbord" replace />}
        />
      </Routes>
    </Suspense>
  )
}

export default PrivateRoute;
