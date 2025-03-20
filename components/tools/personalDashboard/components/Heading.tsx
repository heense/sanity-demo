import { Box, BoxProps, Text, TextProps } from '@sanity/ui'
import { ComponentType } from 'react'

const Heading: ComponentType<{
  children: string
  as?: TextProps['as']
  weight?: TextProps['weight']
  align?: TextProps['align']
  size?: TextProps['size']
  paddingY?: BoxProps['paddingY']
}> = ({ children, as = 'h2', weight = 'semibold', align = 'center', size = 1, paddingY = 4 }) => {
  return (
    <Box paddingY={paddingY}>
      <Text as={as} weight={weight} align={align} size={size}>
        {children}
      </Text>
    </Box>
  )
}

export default Heading
