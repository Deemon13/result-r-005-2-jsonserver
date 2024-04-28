import { useState } from 'react';
import _ from 'lodash';

export const useSort = todos => {
	const [sortBy, setSortBy] = useState(false);

	const sortedTodos = _.orderBy(todos, ['title'], ['asc']);

	const handleSort = () => {
		setSortBy(!sortBy);
	};

	return {
		sortBy,
		sortedTodos,
		handleSort,
	};
};
