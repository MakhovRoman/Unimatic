import { Application } from "@pages/Application"
import { Login } from "@pages/Login"
import { Registration } from "@pages/Registration"
import { ROUTES } from "@router/routes"
import { Route, Routes, redirect } from "react-router-dom"
import styles from './app.module.scss'
import { AuthPagesRoute } from "@components/auth-pages-route/auth-pages-route"
import { ProtectedRoute } from "@components/protected-route/protected-route"
import { Page404 } from "@pages/404"
import { useEffect } from "react"
import { useDispatch, useSelector } from "@services/hooks"
import { selectUserData, userThunks } from "@services/slices/user-slice"
import { decodeJWT } from "@utils/decodeJWT"

export const App = () => {
  const dispatch = useDispatch();
  const userMe = useSelector(selectUserData);

  useEffect(() => {
    const token = localStorage.getItem('auth-token') as string;

    if (!userMe.user.email && token) {
      dispatch(userThunks.userMe({email: decodeJWT(token)}));
    } else {
      redirect('/login')
    }
  }, [dispatch, userMe])


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
