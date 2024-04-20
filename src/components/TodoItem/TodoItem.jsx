import PropTypes from 'prop-types';

import styles from './todoItem.module.css';

export const TodoItem = ({ userId, title, completed, onClick, id, deleting }) => {
	return (
		<div
			className={`${styles.todo__item} ${
				completed ? styles.todo__done : styles.todo__active
			}`}
			id={id}
		>
			<p className={styles.todo__user}>User: {userId}</p>
			<p className={styles.todo__title}>{title}</p>
			<button type="button" disabled={deleting} onClick={() => onClick(id)}>
				Удалить
			</button>
		</div>
	);
};

TodoItem.propTypes = {
	userId: PropTypes.number,
	title: PropTypes.string,
	completed: PropTypes.bool,
	onClick: PropTypes.func,
	id: PropTypes.number,
};
