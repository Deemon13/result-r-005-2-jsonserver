import PropTypes from 'prop-types';

import styles from './filter.module.css';

export const Filter = ({ value, onChange }) => {
	return (
		<form className={styles.filter}>
			<label htmlFor="filter" className={styles.filter__label}>
				Искать Todo:
			</label>
			<input
				id="filter"
				type="text"
				name="filter"
				value={value}
				onChange={onChange}
				className={styles.filter__input}
			/>
		</form>
	);
};

Filter.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
};
