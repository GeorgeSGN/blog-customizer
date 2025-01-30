import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

import { useState, FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

type FormPropsType = {
	defaultValues: {
		fontFamilyOption: OptionType;
		fontSizeOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
	};
	onApply: (values: FormPropsType['defaultValues']) => void;
};

export const ArticleParamsForm = ({
	defaultValues,
	onApply,
}: FormPropsType) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleForm = () => setIsOpen(!isOpen);

	const [formState, setFormState] = useState({
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
		fontSizeOption: fontSizeOptions[0],
	});

	const handleFormReset = () => {
		setFormState(defaultValues);
	};

	const handleChange = (key: keyof typeof formState, value: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onApply(formState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={
					isOpen
						? `${styles.container} ${styles.container_open}`
						: styles.container
				}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleFormReset}>
					<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>
					<Select
						onChange={(value) => handleChange('fontFamilyOption', value)}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						onChange={(value) => handleChange('fontSizeOption', value)}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title={'размер шрифта'}
					/>
					<Select
						selected={formState.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						options={fontColors}
						title={'цвет шрифта'}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						options={backgroundColors}
						title={'цвет фона'}
					/>
					<Select
						selected={formState.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						options={contentWidthArr}
						title={'ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
