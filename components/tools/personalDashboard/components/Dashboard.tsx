import { Badge, Box, Card, Flex, Inline, Stack, Text } from '@sanity/ui'
import { ComponentType, Fragment } from 'react'
import { TbSquareCheck, TbSquareDashed } from 'react-icons/tb'
import { IntentButton, pathToString, SanityDefaultPreview, useSchema } from 'sanity'
import styled from 'styled-components'
import { DashBoardProps } from '..'
import { Person } from '../../../../schemaTypes/documents/person.document'
import { Market } from '../../../../utils/fetchLanguagesMarketsAndPerson'
import Heading from './Heading'
import WrapperCard from './Wrapper'

const Dashboard: ComponentType<DashBoardProps> = ({ languagesMarketsAndPerson, context }) => {
  return (
    <WrapperCard padding={4}>
      <Box padding={4}>
        <Text as={'h1'} weight="bold" align={'center'}>
          {languagesMarketsAndPerson.person.name}'s Dashboard
        </Text>
      </Box>

      <WrapperGrid>
        {/*
         * BOOKMARKS CARD
         */}
        <Card shadow={1} padding={4} radius={2} paddingTop={5}>
          {/* HEADER */}
          <Flex justify={'space-between'} padding={4}>
            <Heading as={'h2'} weight="bold" size={2} paddingY={2}>
              Your bookmarks
            </Heading>
            <IntentButton
              intent="edit"
              replace={false}
              params={{
                id: languagesMarketsAndPerson.person._id,
                type: 'person',
                path: pathToString(['bookmarks']),
              }}
              target="_blank"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
              }}
              tooltipProps={{
                placement: 'top',
                content: 'Add or remove bookmarks from your settings',
              }}
              mode="ghost"
              text="Edit your bookmarks"
            />
          </Flex>
          {/* BOOKMARKS */}
          <Stack space={4}>
            {languagesMarketsAndPerson.person.bookmarks?.map((bookmark) => {
              const schemaType = useSchema().get(bookmark.reference._type)
              const Icon = schemaType?.icon
              return (
                <Stack key={bookmark._key} space={2}>
                  <IntentButton
                    intent="edit"
                    replace={false}
                    params={{ id: bookmark.reference._id, type: bookmark.reference._type }}
                    target="_blank"
                    style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                    tooltipProps={{ placement: 'top', content: 'Open Document' }}
                    mode="bleed"
                  >
                    <SanityDefaultPreview
                      title={bookmark.reference.title}
                      schemaType={schemaType}
                      icon={Icon}
                    />
                  </IntentButton>
                  {bookmark.note && (
                    <IntentButton
                      intent="edit"
                      replace={false}
                      params={{
                        id: languagesMarketsAndPerson.person._id,
                        type: 'person',
                        path: pathToString(['bookmarks', { _key: bookmark._key! }, 'note']),
                      }}
                      target="_blank"
                      style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                      tooltipProps={{ placement: 'top', content: 'Open Bookmark' }}
                      mode="bleed"
                    >
                      <Box paddingLeft={6} paddingRight={2}>
                        <Text
                          size={1}
                          muted
                          wrap="break-word"
                          style={{ whiteSpace: 'pre-wrap', fontStyle: 'italic' }}
                        >
                          {bookmark.note}
                        </Text>
                      </Box>
                    </IntentButton>
                  )}
                </Stack>
              )
            })}
          </Stack>
        </Card>
        {/*
         * LANGUAGES CARD
         */}
        <Card shadow={1} padding={4} radius={2} paddingTop={5}>
          <Flex justify={'space-between'} padding={4}>
            <Heading as={'h2'} weight="bold" size={2} paddingY={2}>
              Your languages
            </Heading>

            <IntentButton
              intent="edit"
              replace={false}
              params={{
                id: languagesMarketsAndPerson.person._id,
                type: 'person',
                path: pathToString(['languages']),
              }}
              target="_blank"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
              }}
              tooltipProps={{
                placement: 'top',
                content: 'Add or remove languages from your settings',
              }}
              mode="ghost"
              text="Edit your languages"
            />
          </Flex>
          <Grid>
            <Heading as={'h3'} weight="semibold" align={'left'} size={1}>
              Language
            </Heading>

            <Heading as={'h3'} weight="semibold" align={'left'}>
              Markets
            </Heading>

            <Heading as={'h3'} weight="semibold" align={'left'}>
              Is your language
            </Heading>
            {languagesMarketsAndPerson.languages.map((lang) => {
              function checkIfLanguageIsInX(x: Market[] | Person) {
                if (x instanceof Array) {
                  return x?.some((x) => x.languages?.some((x) => x.code === lang.code))
                }
                // check if language is in markets
                return x?.languages?.some((x) => x.code === lang.code)
              }
              return (
                <Fragment key={lang._id}>
                  <IntentButton
                    intent="edit"
                    replace={false}
                    params={{
                      id: lang._id,
                      type: 'language',
                      path: pathToString(['title']),
                    }}
                    target="_blank"
                    style={{ textDecoration: 'none', color: 'inherit', width: '100%', padding: 0 }}
                    tooltipProps={{
                      placement: 'top',
                      content: `Edit ${lang.title} language document`,
                    }}
                    mode="bleed"
                  >
                    <Text size={1}>{lang.title}</Text>
                  </IntentButton>

                  {/* MARKETS */}
                  <Flex align={'center'} gap={2}>
                    <Box>
                      <Badge
                        tone={
                          checkIfLanguageIsInX(languagesMarketsAndPerson.markets)
                            ? 'positive'
                            : 'default'
                        }
                      >
                        {checkIfLanguageIsInX(languagesMarketsAndPerson.markets) ? (
                          <TbSquareCheck />
                        ) : (
                          <TbSquareDashed />
                        )}
                      </Badge>
                    </Box>
                    <Inline>
                      {languagesMarketsAndPerson.markets
                        .map((market) => {
                          const marketHasLanguage = market.languages.some(
                            (x) => x.code === lang.code,
                          )
                          return marketHasLanguage ? (
                            <IntentButton
                              intent="edit"
                              replace={false}
                              params={{
                                id: market._id,
                                type: 'market',
                                path: pathToString(['languages']),
                              }}
                              target="_blank"
                              style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                width: '100%',
                                padding: 0,
                              }}
                              tooltipProps={{
                                placement: 'top',
                                content: `Edit ${market.title} document`,
                              }}
                              mode="bleed"
                            >
                              <Text size={1} muted>
                                {market.code.toUpperCase()}
                              </Text>
                            </IntentButton>
                          ) : null
                        })
                        .filter(Boolean)}
                    </Inline>
                  </Flex>

                  {/* PERSON */}
                  <Box>
                    <Badge
                      tone={
                        checkIfLanguageIsInX(languagesMarketsAndPerson.person)
                          ? 'positive'
                          : 'default'
                      }
                    >
                      {checkIfLanguageIsInX(languagesMarketsAndPerson.person) ? (
                        <TbSquareCheck />
                      ) : (
                        <TbSquareDashed />
                      )}
                    </Badge>
                  </Box>
                </Fragment>
              )
            })}
          </Grid>
        </Card>
      </WrapperGrid>
    </WrapperCard>
  )
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* First column auto-sizes, others are equal */
  align-items: center; // Center items vertically in their cells
  gap: 1rem;
  row-gap: 1.6rem;
  padding: 0.5rem 1.2rem;
`
const WrapperGrid = styled.div`
  max-width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr; /* First column auto-sizes, others are equal */

  align-items: stretch; // Center items vertically in their cells
  gap: 1rem;
  padding: 1rem;
`
export default Dashboard
