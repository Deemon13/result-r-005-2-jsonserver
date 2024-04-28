import { useState } from 'react';

import { URL } from '../constants';

export const useCreateTodo = refreshTodos => {
	const [isCreating, setIsCreating] = useState(false);

	const createTodo = event => {
		event.preventDefault();
		setIsCreating(true);

		const form = event.currentTarget;
		const todoTitle = form.elements.todo.value;
		fetch(URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				userId: 1,
				title: todoTitle,
				completed: false,
			}),
		})
			.then(rawResponse => rawResponse.json())
			.then(() => {
				refreshTodos();
			})
			.finally(() => {
				setIsCreating(false);
			});
		form.reset();
	};

	return {
		isCreating,
		createTodo,
	};
};
