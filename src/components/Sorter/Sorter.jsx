import PropTypes from 'prop-types';

import styles from './sorter.module.css';

export const Sorter = ({ onClick, filter, title }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={filter}
			className={styles.sorter}
		>
			{title}
		</button>
	);
};

Sorter.propTypes = {
	onClick: PropTypes.func,
	filter: PropTypes.string,
	title: PropTypes.string,
};
