import { Stack } from '@fluentui/react'
import { DetailsList, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList'

import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getSchemaList } from '@/api/schema'
import ROUTES from '@/constants/routes'
import LoadingAria from '@/shared/loading-aria'
import { CompSchema } from '@/shared/schema-drawer'

function List(): JSX.Element {
  const { data, isLoading } = useQuery('schemas', getSchemaList)

  function renderItemColumn(item: CompSchema, index?: number, column?: IColumn): JSX.Element {
    const fieldContent = item[column?.fieldName as keyof CompSchema] as string

    if (column?.key === 'title') {
      return <Link to={ROUTES.FORM_CONSTRUCTOR_EDIT.PATH.replace(':id', item.id)}>{item.title}</Link>
    }
    return <span>{fieldContent}</span>
  }

  if (isLoading) {
    return <LoadingAria loading={isLoading} label="Schema loading..." />
  }

  if (data === undefined || data.length === 0) {
    return (
      <Stack horizontal horizontalAlign="center" verticalAlign="center" style={{ height: '300px' }}>
        Nothing found
      </Stack>
    )
  }

  return (
    <Stack className="SchemaList" style={{ maxWidth: '900px' }} tokens={{ padding: '32px 32px 50vh 0' }}>
      <DetailsList
        items={data || []}
        columns={[
          { key: 'title', name: 'Title', fieldName: 'title', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'description', name: 'Description', fieldName: 'description', minWidth: 100 },
        ]}
        setKey="set"
        selectionMode={SelectionMode.none}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        onRenderItemColumn={renderItemColumn}
      />
    </Stack>
  )
}

export default List