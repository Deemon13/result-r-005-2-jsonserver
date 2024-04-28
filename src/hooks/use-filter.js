/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect } from 'react';
import { debounce } from 'lodash';

export const useFilter = (todos, filter, setFilteredTodos, setFilter) => {
	useEffect(() => {
		const filteredTodos = !filter
			? todos
			: todos.filter(item =>
					item.title.toLowerCase().includes(filter.toLowerCase()),
			  );
		setFilteredTodos(filteredTodos);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	const handleFilterDebounce = debounce(value => {
		setFilter(value);
	}, 300);

	const handleFilter = event => {
		handleFilterDebounce(event.target.value);
	};

	return {
		handleFilter,
	};
};
