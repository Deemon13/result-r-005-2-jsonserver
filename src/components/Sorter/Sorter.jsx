import PropTypes from 'prop-types';

import styles from './sorter.module.css';

export const Sorter = ({ onClick, disabled, title }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={styles.sorter}
		>
			{title}
		</button>
	);
};

Sorter.propTypes = {
	onClick: PropTypes.func,
	disabled: PropTypes.string,
	title: PropTypes.string,
};
