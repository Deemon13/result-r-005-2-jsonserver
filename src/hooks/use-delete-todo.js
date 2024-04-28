import { useState } from 'react';

import { URL } from '../constants';

export const useDeleteTodo = (refreshTodos, setFilter) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteTodo = id => {
		setIsDeleting(true);

		fetch(URL + `/${id}`, {
			method: 'DELETE',
		})
			.then(rawResponse => rawResponse.json())
			.then(() => {
				refreshTodos();
				setFilter('');
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};

	return {
		isDeleting,
		deleteTodo,
	};
};
