import { useState, useEffect } from 'react';
import styles from './app.module.css';

import { Loader, TodoItem } from '../../components';
import { URL } from '../../constants';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	useEffect(() => {
		setIsLoading(true);

		fetch(URL)
			.then(loadedData => loadedData.json())
			.then(loadedTodos => {
				setTodos(loadedTodos);
			})
			.finally(() => {
				setIsLoading(false);
				setIsCreating(false);
				setIsDeleting(false);
			});
	}, [refreshTodosFlag]);

	const handleCreateTodo = event => {
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
			});
		form.reset();
	};

	const handleDeleteTodo = id => {
		setIsDeleting(true);

		fetch(URL + `/${id}`, {
			method: 'DELETE',
		})
			.then(rawResponse => rawResponse.json())
			.then(() => {
				refreshTodos();
			});
	};

	return (
		<div className={styles.app}>
			<form onSubmit={handleCreateTodo}>
				<label>
					{' '}
					Добавление задачи:
					<input type="text" name="todo" />
				</label>
				<button disabled={isCreating} type="submit">
					Создать задачу
				</button>
			</form>
			<div className={styles.todos}>
				{isLoading ? (
					<Loader />
				) : (
					todos.map(({ id, userId, title, completed }) => (
						<TodoItem
							key={id}
							userId={userId}
							title={title}
							completed={completed}
							onClick={handleDeleteTodo}
							id={id}
							deleting={isDeleting}
						/>
					))
				)}
			</div>
		</div>
	);
};
