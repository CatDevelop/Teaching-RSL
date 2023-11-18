import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, To, useLocation } from 'react-router-dom';
import { RootState } from 'store/store';

/** 
 * Гуард неавторизованного пользователя
 */
export const NotAuthGuard: FC = () => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth)
	const location = useLocation();

	if (isAuth) {
		const redirect: To = {
			pathname: location.search.slice(1) ?? '/',
		};

		return <Navigate to={redirect} replace />;
	}

	return <Outlet />;
};