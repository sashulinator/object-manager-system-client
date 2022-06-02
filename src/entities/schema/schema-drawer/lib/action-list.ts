import { IDropdownOption } from '@fluentui/react'
import { Meta } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'
import { ComponentNames } from './assertion-list'
import bindAssertions from './bind-assertions'

import { Norm, Schema, SchemaType } from '@/entities/schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setValue(bindingParams: ActionProps, difference: Record<string, unknown>) {
  const { actionBinding, context, comp, bindings } = bindingParams
  const eventFieldName = actionBinding.props.name as string
  const eventFieldValue = difference[comp.name]

  if (actionBinding.children?.[0]) {
    const validate = bindAssertions(bindings, actionBinding?.children?.[0])
    const errors = validate?.(eventFieldValue, { payload: bindingParams } as Meta)

    if (errors) {
      return
    }
  }

  if (comp.name in difference) {
    context.formProps.form.change(eventFieldName, eventFieldValue)
  }
}

export interface ActionItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (...ars: any[]) => any
  name: string
  schema?: Schema
}

const actionList: Norm<ActionItem> = {
  setValue: {
    name: 'setValue',
    function: setValue,
    schema: {
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: SchemaType.FORM,
      comps: {
        ROOT_ID: {
          id: 'ROOT_ID',
          title: 'stackRoot',
          name: 'hello',
          children: ['name'],
          props: { tokens: { padding: '5px' } },
          compSchemaId: ComponentNames.Stack,
        },
        name: {
          id: 'name',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: ComponentNames.TextField,
        },
      },
    },
  },
  test: {
    name: 'test',
    function: setValue,
  },
}

export default actionList

export const actionNameOptions: IDropdownOption[] = Object.keys(actionList).map((actionName) => {
  return {
    key: actionName,
    text: actionName,
  }
})
