import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import { useState, useRef, FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import clsx from 'clsx';

type FormPropsType = {
	onApply: (values: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onApply }: FormPropsType) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleForm = () => setIsOpen(!isOpen);

	const [formState, setFormState] = useState(defaultArticleState);

	const handleFormReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleChange = (key: keyof typeof formState, value: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onApply(formState);
	};

	const wrapperRef = useRef(null);

	useOutsideClickClose({
		isOpen,
		onChange: setIsOpen,
		rootRef: wrapperRef,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				ref={wrapperRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
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
