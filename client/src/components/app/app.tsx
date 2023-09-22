import { Application } from "@pages/Application"
import { Login } from "@pages/Login"
import { Registration } from "@pages/Registration"
import { ROUTES } from "@router/routes"
import { Route, Routes } from "react-router-dom"
import styles from './app.module.scss'
import { AuthPagesRoute } from "@components/auth-pages-route/auth-pages-route"
import { ProtectedRoute } from "@components/protected-route/protected-route"
import { Page404 } from "@pages/404"

export const App = () => {



  return (
    <main className={styles.main}>
      <Routes>

        <Route element={<AuthPagesRoute />}>
          <Route path={ROUTES.home.path} element={<Registration />}/>
          <Route path={ROUTES.login.path} element={<Login />}/>
          <Route path={ROUTES.registration.path} element={<Registration />}/>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.app.path} element={<Application />}/>
        </Route>

        <Route path="*" element={<Page404 />}/>
      </Routes>
    </main>
  )
}
