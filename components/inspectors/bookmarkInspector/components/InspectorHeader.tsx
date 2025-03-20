import { CloseIcon } from '@sanity/icons'
import { Box, Button, Card, Flex, Text } from '@sanity/ui'
import { styled } from 'styled-components'

const Root = styled(Card)({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  lineHeight: 0,
  background: 'var(--card-bg-color)',

  width: '100%',
})

interface InspectorHeaderProps {
  onClose: () => void
}

export const InspectorHeader = (props: InspectorHeaderProps) => {
  const { onClose } = props

  return (
    <Root>
      <Flex padding={3} gap={2} justify="space-between" align={'center'} width={'fill'}>
        <Box paddingLeft={3}>
          <Text as="h1" size={1} weight="medium">
            Your Bookmarks
          </Text>
        </Box>

        <Button
          aria-label="close-pane-button-text-aria-label"
          icon={CloseIcon}
          mode="bleed"
          onClick={onClose}
        />
      </Flex>
    </Root>
  )
}
