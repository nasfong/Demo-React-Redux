import { Navigate, Route, Routes, } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ErrorPage } from '../helper'



const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))
const Game = lazy(() => import("../pages/game/Game"))
const TodoList = lazy(() => import("../pages/todolist/TodoList"))
const Menu = lazy(() => import('../pages/menu/Menu'))
const Administrator = lazy(() => import('../pages/administrator/Administrator'))
const Role = lazy(() => import('../pages/role/Role'))
const Permission = lazy(() => import('../pages/permission/Permission'))

function PrivateRoute() {

  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route index element={<Dashboard />} path='dashboard' />
        <Route element={<TodoList />} path='todo-list' />
        <Route element={<Game />} path='game' />
        <Route element={<Menu />} path='menu' />
        <Route element={<Administrator />} path='administrator' />
        <Route element={<Role />} path='role' />
        <Route element={<Permission />} path='permission' />


        <Route element={<ErrorPage />} path='error/404' />
        <Route path="/auth/login" element={<Navigate to="/dashboard" replace />} />
        {/* <Route path="*" element={<Navigate to="/error/404" replace />} /> */}
      </Routes>
    </Suspense>
  )
}

export default PrivateRoute;
