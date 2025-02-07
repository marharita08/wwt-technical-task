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

import { FilterSection } from '@components/FilterSection'
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
	const { data } = useQuery({
		queryKey: ['filterItems'],
		queryFn: fetchFilterData
	})

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
								{data?.map((filterItem, index) => (
									<Stack
										key={filterItem.id}
										gap={'8'}
									>
										<FilterSection filterItem={filterItem} />
										{index < data.length - 1 && <Divider />}
									</Stack>
								))}
							</Stack>
							<Divider />
						</Stack>
					</ModalBody>
					<ModalFooter>
						<Button
							onClick={onClose}
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
						>
							{t('clear')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
