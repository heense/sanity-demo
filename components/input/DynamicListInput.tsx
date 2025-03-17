import { AddIcon, EditIcon } from '@sanity/icons'
import { Button, Flex, Stack } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import groq from 'groq'
import { ComponentType, useEffect, useMemo, useState } from 'react'
import { Subscription } from 'rxjs'
import { ArrayOfObjectsInputProps, TitledListValue, useClient, useCurrentUser } from 'sanity'
import { useRouter, useRouterState } from 'sanity/router'
import { RouterPanes } from 'sanity/structure'
import LoadingIndicator from '../LoadingIndicator'

const DynamicListInput: ComponentType<ArrayOfObjectsInputProps> = (props) => {
  const client = useClient({ apiVersion: '2025-03-01' }).withConfig({
    perspective: 'previewDrafts',
  })
  const { navigate } = useRouter()
  const routerState = useRouterState()
  const routerPaneGroups = useMemo<RouterPanes>(
    () => (routerState?.panes || []) as RouterPanes,
    [routerState?.panes],
  )

  const currentUser = useCurrentUser()

  const [listOptions, setListOptions] = useState<TitledListValue<string>[]>([])
  const [loading, setLoading] = useState(true)

  let subscription: Subscription
  useEffect(() => {
    const query = groq`*[_type == "listOption"] | order(title asc) { "_key": _id, title, value, "_type": 'dynamicListItem' }`

    const listen = () => {
      subscription = client
        .listen(query, {
          visibility: 'query',
          tag: `dynamic-list-input-${props.id}`,
          includeResult: false,
        })
        .subscribe(() =>
          client.fetch(query).then((data) => {
            setListOptions(data)
            setLoading(false)
          }),
        )
    }

    client
      .fetch(query)
      .then((data) => {
        setListOptions(data)
        setLoading(false)
      })
      .then(listen)
      .finally(() => setLoading(false))

    // * Cleanup
    // Never forget to unsubscribe from the listener
    return function cleanup() {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  if (loading) return <LoadingIndicator />

  /** Opens a pane with new listOption document to the right of the current ones */
  const handleAddOption = () => {
    const nextPanes: RouterPanes = [
      // keep existing panes
      ...routerPaneGroups,
      [
        {
          // no id means a new document
          id: uuid(),
          params: {
            type: 'listOption',
            template: 'listOption',
          },
        },
      ],
    ]

    navigate({
      panes: nextPanes,
    })
  }

  const isAdmin = currentUser?.roles?.some((role) => role.name === 'administrator')
  return (
    <Stack space={2}>
      {props.renderDefault({
        ...props,
        schemaType: {
          ...props.schemaType,
          options: {
            ...props.schemaType.options,
            list: listOptions,
          },
        },
      })}
      {isAdmin && (
        <Flex gap={4} paddingY={2} align={'center'} justify={'flex-start'}>
          <Button
            mode="ghost"
            fontSize={0}
            text="Edit options"
            icon={EditIcon}
            onClick={() =>
              navigate({
                panes: [[{ id: 'listOption' }]],
              })
            }
          />

          <Button
            mode="ghost"
            fontSize={0}
            onClick={handleAddOption}
            icon={AddIcon}
            text="Add new option"
          />
        </Flex>
      )}
    </Stack>
  )
}

export default DynamicListInput
