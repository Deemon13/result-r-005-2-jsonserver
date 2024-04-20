import { useState, useEffect } from 'react';
import styles from './app.module.css';

import { Loader, TodoItem } from '../../components';
import { URL } from '../../constants';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch(URL)
			.then(loadedData => loadedData.json())
			.then(loadedTodos => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.app}>
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
						/>
					))
				)}
			</div>
		</div>
	);
};
