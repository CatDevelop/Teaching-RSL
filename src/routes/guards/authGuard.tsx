import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, To } from 'react-router-dom';
import { RootState } from 'store/store';

/** 
 * Гуард авторизованного пользователя
 */
export const AuthGuard: FC = () => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth)

	if (!isAuth) {
		const redirect: To = {
			pathname: 'signin',
		};
		return <Navigate to={redirect} replace />;
	}

	return <Outlet />;
};