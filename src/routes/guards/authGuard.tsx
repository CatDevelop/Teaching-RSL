import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Outlet, To, useLocation} from 'react-router-dom';
import {RootState} from 'store/store';
import {UserSecretService} from "../../api/services/userSecret";
import {login} from "../../store/auth/authSlice";

/**
 * Гуард авторизованного пользователя
 */
export const AuthGuard: FC = () => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth)
	const location = useLocation();
	const dispatch = useDispatch()
	if(UserSecretService.hasToken()) {
		dispatch(login())
		return <Outlet />;
	}

	if (!isAuth) {
		const redirect: To = {
			pathname: 'signin',
			search: location.pathname,
		};
		return <Navigate to={redirect} replace />;
	}

	return <Outlet />;
};
