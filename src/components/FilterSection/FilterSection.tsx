import {
	Checkbox,
	CheckboxGroup,
	SimpleGrid,
	Stack,
	Text
} from '@chakra-ui/react'

import { FilterItem } from '@api/types/Filter'

type Properties = {
	filterItem: FilterItem
	optionIds: string[]
	onChange: (isChecked: boolean, optionId: string) => void
}

export const FilterSection = ({
	filterItem,
	optionIds,
	onChange
}: Properties) => {
	return (
		<Stack gap="5">
			<Text textStyle={'headline-5'}>{filterItem.name}</Text>
			<CheckboxGroup>
				<SimpleGrid
					columns={3}
					rowGap="4"
				>
					{filterItem.options.map(option => {
						return (
							<Checkbox
								key={option.id}
								isChecked={optionIds.includes(option.id)}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									onChange(e.target.checked, option.id)
								}
							>
								{option.name}
							</Checkbox>
						)
					})}
				</SimpleGrid>
			</CheckboxGroup>
		</Stack>
	)
}
