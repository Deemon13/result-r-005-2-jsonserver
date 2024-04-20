import styles from './loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.progress}>
			<div className={styles.progressValue}></div>
		</div>
	);
};
