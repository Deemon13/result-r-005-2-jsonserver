import PropTypes from 'prop-types';

import styles from './todoItem.module.css';

export const TodoItem = ({ userId, title, completed }) => {
	return (
		<div
			className={`${styles.todo__item} ${
				completed ? styles.todo__done : styles.todo__active
			}`}
		>
			<p className={styles.todo__user}>User: {userId}</p>
			<p className={styles.todo__title}>{title}</p>
		</div>
	);
};

TodoItem.propTypes = {
	userId: PropTypes.number,
	title: PropTypes.string,
	completed: PropTypes.bool,
};
