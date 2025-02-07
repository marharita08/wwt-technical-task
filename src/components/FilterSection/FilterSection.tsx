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
}

export const FilterSection = ({ filterItem }: Properties) => {
	return (
		<Stack gap="5">
			<Text textStyle={'headline-5'}>{filterItem.name}</Text>
			<CheckboxGroup>
				<SimpleGrid
					columns={3}
					rowGap="4"
				>
					{filterItem.options.map(option => (
						<Checkbox key={option.id}> {option.name}</Checkbox>
					))}
				</SimpleGrid>
			</CheckboxGroup>
		</Stack>
	)
}
