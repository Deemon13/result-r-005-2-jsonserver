import PropTypes from 'prop-types';

import styles from './formCreateTodo.module.css';

export const FormCreateTodo = ({ onSubmit, isCreating }) => {
	return (
		<form onSubmit={onSubmit} className={styles.form__createTodo}>
			<label htmlFor="todo">
				{' '}
				Добавление задачи:
				<input id="todo" disabled={isCreating} type="text" name="todo" />
			</label>
			<button disabled={isCreating} type="submit">
				Создать задачу
			</button>
		</form>
	);
};

FormCreateTodo.propTypes = {
	onSubmit: PropTypes.func,
	isCreating: PropTypes.bool,
};
