import { assertNotUndefined, isString } from '@savchenko91/schema-validator'

import omitEmpty from 'omit-empty-es'
import { useState } from 'react'
import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { replace } from '@/lib/change-unmutable'
import { addEntity, findEntity } from '@/lib/entity-actions'
import { Binding, BindingSchema, Catalog } from '@/shared/schema-drawer'

export const defaultCompBindings: Catalog<Binding> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'root',
    type: 'ROOT',
    children: [],
  },
}

export function useBindingStates<TUnit extends Binding>(
  onChange: (value: BindingSchema<TUnit> | undefined) => void,
  // can receive string because of final-form
  value?: BindingSchema<TUnit> | string
) {
  const [selectedItemId, selectItemId] = useState('')

  const schema = isString(value) ? undefined : value
  const catalog = schema?.catalog
  const selectedBinding = catalog?.[selectedItemId]

  function changeBinding(id: string | number, name: string, newBindingItemProps: unknown) {
    assertNotUndefined(catalog)

    const binding = findEntity(id, catalog)
    const newBindings = replace(catalog, id, {
      ...binding,
      name,
      ...(newBindingItemProps ? { props: newBindingItemProps } : undefined),
    })

    const newCatalog: Catalog<TUnit> = omitEmpty(newBindings)

    onChange({ catalog: newCatalog })
  }

  function addBinding(rawBinding: Omit<TUnit, 'id' | 'children'> & { children?: string[] }): void {
    const id = uniqid()
    const binding = { children: [], ...rawBinding, id }

    let newCatalog = catalog ?? defaultCompBindings

    console.log('binding, ROOT_ID, 1, newCatalog', binding, ROOT_ID, 1, newCatalog)

    newCatalog = addEntity(binding, ROOT_ID, 0, newCatalog)

    onChange({ catalog: newCatalog as Catalog<TUnit> })
  }

  return {
    changeBinding,
    schema,
    catalog,
    selectedBinding,
    selectItemId,
    selectedItemId,
    addBinding,
  }
}