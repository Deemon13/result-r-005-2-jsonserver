/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from 'react';
import _ from 'lodash';
import styles from './app.module.css';

import { FormCreateTodo, Loader, TodoItem, Filter, Sorter } from '../../components';
import { URL } from '../../constants';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isChanging, setIsChanging] = useState(false);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

	const [filter, setFilter] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);

	const [sortBy, setSortBy] = useState(false);

	const [idForChange, setIdForChange] = useState(null);

	let newId = null;

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);
	const sortedTodos = _.orderBy(todos, ['title'], ['asc']);

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
				setFilter('');
			});
	};

	const requestTochangeTodo = id => {
		newId = id;
		setIdForChange(newId);
		setIsChanging(true);
	};

	const handleSubmitChanges = event => {
		event.preventDefault();

		const form = event.currentTarget;
		const newTitle = form.elements.changeTodo.value;

		fetch(URL + `/${idForChange}`, {
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
			});

		setIsChanging(false);
	};

	useEffect(() => {
		const filteredTodos = !filter
			? todos
			: todos.filter(item =>
					item.title.toLowerCase().includes(filter.toLowerCase()),
			  );
		setFilteredTodos(filteredTodos);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	const handleSort = () => {
		setSortBy(!sortBy);
	};

	return (
		<div className={styles.app}>
			<FormCreateTodo onSubmit={handleCreateTodo} isCreating={isCreating} />
			<Filter value={filter} onChange={e => setFilter(e.target.value)} />
			<Sorter onClick={handleSort} disabled={filter} title="По алфавиту!" />
			<div className={styles.todos}>
				{isLoading ? (
					<Loader />
				) : (
					(filter ? filteredTodos : sortBy ? sortedTodos : todos).map(
						({ id, userId, title, completed }) => (
							<TodoItem
								key={id}
								userId={userId}
								title={title}
								completed={completed}
								onClick={handleDeleteTodo}
								changeTodo={requestTochangeTodo}
								id={id}
								deleting={isDeleting}
							/>
						),
					)
				)}
			</div>
			{isChanging && (
				<form onSubmit={handleSubmitChanges}>
					<input autoFocus name="changeTodo" />
					<button type="submit">Меняем!</button>
				</form>
			)}
		</div>
	);
};
