import { Application } from "@pages/Application"
import { Login } from "@pages/Login"
import { Registration } from "@pages/Registration"
import { ROUTES } from "@router/routes"
import { Route, Routes } from "react-router-dom"
import styles from './app.module.scss'

export const App = () => {
  console.log(__API__ENDPOINT__)
  return (
    <main className={styles.main}>
      <Routes>
        <Route path={ROUTES.app.path} element={<Application />}/>
        <Route path={ROUTES.login.path} element={<Login />}/>
        <Route path={ROUTES.registration.path} element={<Registration />}/>
      </Routes>
    </main>
  )
}
