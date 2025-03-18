import { Box, Flex, Text } from '@sanity/ui'
import { TbCheckbox } from 'react-icons/tb'
import { defineArrayMember, defineField } from 'sanity'
import styled from 'styled-components'
import DynamicListInput from '../../components/input/DynamicListInput'

export default defineField({
  name: 'dynamicList',
  title: 'Dynamic List',
  type: 'array',
  options: {
    list: [],
  },
  components: {
    input: DynamicListInput,
  },
  of: [
    defineArrayMember({
      type: 'object',
      name: 'dynamicListItem',
      icon: TbCheckbox,
      components: {
        preview: (props) => {
          // remove data-testid="Media" via css and styled components
          const StyledBox = styled(Flex)`
            [data-testid='Media'] {
              display: none;
            }
          `

          return (
            <StyledBox gap={2} align={'flex-start'} justify={'flex-start'} direction={'column'}>
              {props.renderDefault({
                ...props,
                layout: 'compact',
              })}
              {props.subtitle && (
                <Box>
                  <Text muted size={1} style={{ fontStyle: 'italic' }}>
                    {props.subtitle as string}
                  </Text>
                </Box>
              )}
            </StyledBox>
          )
        },
      },
      preview: {
        select: {
          title: 'title',
          subtitle: 'description',
        },
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
        }),
      ],
    }),
  ],
})
