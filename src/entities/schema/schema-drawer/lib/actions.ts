import { Meta } from '@savchenko91/schema-validator'

import { EventUnit, EventUnitType, Norm } from '../..'
import { ActionProps } from '../model/types'
import bindAssertions from './bind-assertions'
import { eventAssertionList } from './event-assertion-list'

import { insert, replace } from '@/lib/change-unmutable'
import { findEntity } from '@/lib/entity-actions'

const operatorId = 'operatorId'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setValue(actionProps: ActionProps, value: Record<string, unknown>) {
  const { actionUnit, context, bindings } = actionProps
  const eventFieldName = actionUnit.props.name as string

  if (actionUnit.children?.[0]) {
    const newBindings = addRootOperator(bindings, actionUnit.id)

    const validate = bindAssertions(eventAssertionList, newBindings, operatorId)

    const errors = validate?.(value, { payload: actionProps } as Meta)

    if (errors) {
      return
    }
  }

  context.formProps.form.change(eventFieldName, value)
}

function addRootOperator(bindings: Norm<EventUnit>, actionId: string) {
  const actionUnit = findEntity(actionId, bindings)
  const newActionUnit = { ...actionUnit, children: [operatorId] }
  const newBindings = replace(bindings, newActionUnit.id, newActionUnit)
  const orOperator: EventUnit = {
    id: operatorId,
    name: 'and',
    type: EventUnitType.OPERATOR,
    children: actionUnit.children,
  }
  const newBindings2 = insert(newBindings, operatorId, orOperator)

  return newBindings2
}