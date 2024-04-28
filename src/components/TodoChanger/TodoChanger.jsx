import PropTypes from 'prop-types';

import styles from './todoChanger.module.css';

export const TodoChanger = ({ onSubmit, title }) => {
	return (
		<form onSubmit={onSubmit} className={styles.todoChanger__form}>
			<input autoFocus name="changeTodo" className={styles.todoChanger__input} />
			<button type="submit" className={styles.todoChanger__submit}>
				{title}
			</button>
		</form>
	);
};

TodoChanger.propTypes = {
	onSubmit: PropTypes.func,
	title: PropTypes.string,
};
