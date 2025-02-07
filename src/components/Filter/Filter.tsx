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
	useDisclosure
} from '@chakra-ui/react'

export const Filter = () => {
	const { t } = useTranslation('filter')
	const { isOpen, onOpen, onClose } = useDisclosure()

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
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('header')}</ModalHeader>
					<ModalCloseButton />
					<Divider />
					<ModalBody>{t('body')}</ModalBody>
					<Divider />
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
