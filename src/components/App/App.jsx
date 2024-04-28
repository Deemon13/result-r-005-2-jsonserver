import { useState } from 'react';
import styles from './app.module.css';

import {
	FormCreateTodo,
	Loader,
	TodoItem,
	Filter,
	Sorter,
	TodoChanger,
} from '../../components';

import {
	useGetTodos,
	useCreateTodo,
	useDeleteTodo,
	useChangeTodo,
	useSort,
	useFilter,
} from '../../hooks';

export const App = () => {
	const [isChanging, setIsChanging] = useState(false);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [filter, setFilter] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [idForChange, setIdForChange] = useState(null);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { todos, isLoading } = useGetTodos(refreshTodosFlag);
	const { isCreating, createTodo } = useCreateTodo(refreshTodos);
	const { isDeleting, deleteTodo } = useDeleteTodo(refreshTodos, setFilter);
	const { submitChanges } = useChangeTodo(
		idForChange,
		refreshTodos,
		setFilter,
		setIsChanging,
	);
	const { sortBy, sortedTodos, handleSort } = useSort(todos);
	const { handleFilter } = useFilter(todos, filter, setFilteredTodos, setFilter);

	let newId = null;

	const requestTochangeTodo = id => {
		newId = id;
		setIdForChange(newId);
		setIsChanging(true);
	};

	return (
		<div className={styles.app}>
			<FormCreateTodo onSubmit={createTodo} isCreating={isCreating} />
			<Filter value={filter} onChange={e => handleFilter(e)} />
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
								onClick={deleteTodo}
								changeTodo={requestTochangeTodo}
								id={id}
								deleting={isDeleting}
							/>
						),
					)
				)}
			</div>
			{isChanging && <TodoChanger onSubmit={submitChanges} title="Меняем!" />}
		</div>
	);
};
