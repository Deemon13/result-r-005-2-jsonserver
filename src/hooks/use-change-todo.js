import { URL } from '../constants';

export const useChangeTodo = (id, refreshTodos, setFilter, setIsChanging) => {
	const submitChanges = event => {
		event.preventDefault();

		const form = event.currentTarget;
		const newTitle = form.elements.changeTodo.value;

		fetch(URL + `/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 1,
				completed: false,
				title: newTitle,
			}),
		})
			.then(rawResponse => rawResponse.json())
			.then(() => {
				refreshTodos();
				setFilter('');
				setIsChanging(false);
			});
	};

	return {
		submitChanges,
	};
};
