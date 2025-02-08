import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from '@chakra-ui/react'

type Properties = {
	onConfirm: () => void
	onCancel: () => void
}

export const FilterConfirmation = ({ onConfirm, onCancel }: Properties) => {
	const { t } = useTranslation('filter')
	const { isOpen, onOpen, onClose } = useDisclosure()

	const handleCancel = useCallback(() => {
		onCancel()
		onClose()
	}, [])

	const handleConfirm = useCallback(() => {
		onConfirm()
		onClose()
	}, [])

	return (
		<>
			<Button
				onClick={onOpen}
				colorScheme="brand"
				size={'xlg'}
			>
				{t('apply')}
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={'xl'}
			>
				<ModalOverlay />
				<ModalContent py={'5'}>
					<ModalHeader>{t('confirm-header')}</ModalHeader>
					<ModalCloseButton size={'lg'} />
					<ModalBody py={'8'}></ModalBody>
					<ModalFooter>
						<Button
							onClick={handleCancel}
							variant={'outline'}
							size={'xlg'}
						>
							{t('confirm-cancel')}
						</Button>
						<Button
							colorScheme="brand"
							onClick={handleConfirm}
							size={'xlg'}
						>
							{t('confirm-apply')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
