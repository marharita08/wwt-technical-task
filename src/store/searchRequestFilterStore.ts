import { create } from 'zustand'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

type State = {
	searchRequestFilter: SearchRequestFilter
}

type Action = {
	updateSearchRequestFilter: (
		searchRequestFilter: State['searchRequestFilter']
	) => void
}

export const useSearchRequestFilterStore = create<State & Action>(set => ({
	searchRequestFilter: [],
	updateSearchRequestFilter: searchRequestFilter =>
		set(() => ({ searchRequestFilter: searchRequestFilter }))
}))
