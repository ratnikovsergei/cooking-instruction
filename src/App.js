import { useState } from 'react'
import styles from './app.module.css'
import data from './data.json'

export const App = () => {
	const [steps, setSteps] = useState(data)
	const [activeIndex, setActiveIndex] = useState(0)

	function moveBack() {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1)
		}
	}

	function moveForward() {
		if (activeIndex < steps.length - 1) {
			setActiveIndex(activeIndex + 1)
		}
	}

	function moveToBegin() {
		setActiveIndex(0)
	}

	let isItFirstStep = activeIndex === 0 ? true : false
	let isItLastStep = activeIndex === steps.length - 1 ? true : false

	// выбор нужного шага по клику
	function setActiveStep(index) {
		setActiveIndex(index)
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ id, title }, index) => (
							<li
								className={
									index < activeIndex
										? styles['steps-item'] + ' ' + styles.done
										: index === activeIndex
											? styles['steps-item'] + ' ' + styles.active
											: styles['steps-item']
								}
								key={id}
								index={index}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveStep(index)}
								>
									{index + 1}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						{isItFirstStep ? (
							<button className={styles.button} disabled>
								Назад
							</button>
						) : (
							<button className={styles.button} onClick={moveBack}>
								Назад
							</button>
						)}
						{isItLastStep ? (
							<button className={styles.button} onClick={moveToBegin}>
								Начать сначала
							</button>
						) : (
							<button className={styles.button} onClick={moveForward}>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
