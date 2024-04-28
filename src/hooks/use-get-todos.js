import { useState, useEffect } from 'react';

import { URL } from '../constants';

export const useGetTodos = refreshTodosFlag => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch(URL)
			.then(loadedData => loadedData.json())
			.then(loadedTodos => {
				setTodos(loadedTodos);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [refreshTodosFlag]);

	return {
		todos,
		isLoading,
	};
};
