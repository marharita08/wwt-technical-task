import { Box } from '@chakra-ui/react'

import { Filter } from '@components/Filter'
import { useSearchRequestFilterStore } from '@store/searchRequestFilterStore'

export const App = () => {
	const searchRequestFilterStored = useSearchRequestFilterStore(
		state => state.searchRequestFilter
	)

	return (
		<Box
			maxW="90rem"
			mx="auto"
			minH="100dvh"
		>
			<Filter />
			<div>{JSON.stringify(searchRequestFilterStored)}</div>
		</Box>
	)
}
