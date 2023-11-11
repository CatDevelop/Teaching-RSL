import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, To } from 'react-router-dom';
import { RootState } from 'store/store';

/** 
 * Гуард неавторизованного пользователя
 */
export const NotAuthGuard: FC = () => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth)

	if (isAuth) {
		const redirect: To = {
			pathname: '/',
		};

		return <Navigate to={redirect} replace />;
	}

	return <Outlet />;
};