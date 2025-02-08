import { FilterItem } from '@api/types/Filter'

import jsonData from '@temp/filterData.json'

export const fetchFilterData = async () => {
	const data = jsonData

	if (data && Array.isArray(data.filterItems)) {
		return data.filterItems as FilterItem[]
	}

	return []
}
