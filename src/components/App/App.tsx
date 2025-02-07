import { Box } from '@chakra-ui/react'

import { Filter } from '@components/Filter'

export const App = () => {
	return (
		<Box
			maxW="90rem"
			mx="auto"
			minH="100dvh"
		>
			<Filter />
		</Box>
	)
}
