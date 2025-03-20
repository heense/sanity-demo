import { Card } from '@sanity/ui'
import { TbDashboard } from 'react-icons/tb'
import { ConfigContext, Tool } from 'sanity'
import styled from 'styled-components'
import { Person } from '../../../schemaTypes/documents/person.document'
import { LanguageDoc, Market } from '../../../utils/fetchLanguagesMarketsAndPerson'
import Dashboard from './components/Dashboard'

export interface DashBoardProps {
  languagesMarketsAndPerson: {
    markets: Market[]
    languages: LanguageDoc[]
    person: Person
  }
  context: ConfigContext
}

function personalDashboard(
  languagesMarketsAndPerson: DashBoardProps['languagesMarketsAndPerson'],
  context: DashBoardProps['context'],
): Tool {
  console.log('languagesMarketsAndPerson', languagesMarketsAndPerson, 'context', context)
  return {
    title: 'Personal dashboard',
    name: 'personal-dashboard', // localhost:3333/my-custom-tool
    icon: TbDashboard,
    component: () => (
      <Dashboard languagesMarketsAndPerson={languagesMarketsAndPerson} context={context} />
    ),
  }
}
const WrapperCard = styled(Card)`
  width: 100%;
  height: 95%;
  overflow: scroll;
`
export default personalDashboard
