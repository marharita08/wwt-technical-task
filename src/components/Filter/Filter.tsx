import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useDisclosure
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { FilterItem } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import { FilterSection } from '@components/FilterSection'
import { useSearchRequestFilterStore } from '@store/searchRequestFilterStore'
import jsonData from '@temp/filterData.json'

const fetchFilterData = async () => {
	const data = jsonData

	if (data && Array.isArray(data.filterItems)) {
		return data.filterItems as FilterItem[]
	}

	return []
}

export const Filter = () => {
	const { t } = useTranslation('filter')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { data: filterItems } = useQuery({
		queryKey: ['filterItems'],
		queryFn: fetchFilterData
	})

	const updateSearchRequestFilter = useSearchRequestFilterStore(
		state => state.updateSearchRequestFilter
	)
	const [searchRequestFilter, setSearchRequestFilter] =
		useState<SearchRequestFilter>([])

	useEffect(() => {
		if (filterItems) {
			const initialSearchRequestFilter: SearchRequestFilter =
				filterItems?.map(filterItem => ({
					id: filterItem.id,
					type: filterItem.type,
					optionsIds: []
				})) ?? []

			setSearchRequestFilter(initialSearchRequestFilter)
			updateSearchRequestFilter(initialSearchRequestFilter)
		}
	}, [filterItems])

	const handleApply = () => {
		updateSearchRequestFilter(searchRequestFilter)
		onClose()
	}

	const handleFilterChange = useCallback(
		(index: number, isChecked: boolean, optionId: string) => {
			setSearchRequestFilter(prev => {
				const updatedFilter = [...prev]
				const updatedItem = { ...updatedFilter[index] }
				updatedItem.optionsIds = isChecked
					? [...updatedItem.optionsIds, optionId]
					: updatedItem.optionsIds.filter(id => id !== optionId)
				updatedFilter[index] = updatedItem
				return updatedFilter
			})
		},
		[]
	)

	const handleClearFilters = useCallback(() => {
		setSearchRequestFilter(prev => {
			return [...prev].map(item => ({ ...item, optionsIds: [] }))
		})
	}, [])

	return (
		<>
			<Button
				onClick={onOpen}
				colorScheme="brand"
				size={'xlg'}
			>
				{t('open')}
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={'xl'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('header')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack gap={'4rem'}>
							<Divider />
							<Stack gap={'8'}>
								{filterItems?.map((filterItem, index) => (
									<Stack
										key={filterItem.id}
										gap={'8'}
									>
										<FilterSection
											filterItem={filterItem}
											optionIds={searchRequestFilter[index]?.optionsIds ?? []}
											onChange={(isChecked, optionId) =>
												handleFilterChange(index, isChecked, optionId)
											}
										/>
										{index < filterItems.length - 1 && <Divider />}
									</Stack>
								))}
							</Stack>
							<Divider />
						</Stack>
					</ModalBody>
					<ModalFooter>
						<Button
							onClick={handleApply}
							colorScheme="brand"
							size={'xlg'}
						>
							{t('apply')}
						</Button>
						<Button
							variant={'link'}
							colorScheme="primary"
							position={'absolute'}
							right={'0'}
							onClick={handleClearFilters}
						>
							{t('clear')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
