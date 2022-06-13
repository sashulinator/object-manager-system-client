import { assertNotUndefined } from '@savchenko91/schema-validator'

import omitEmpty from 'omit-empty-es'

import { replace } from '@/lib/change-unmutable'
import { findEntity } from '@/lib/entity-actions'
import { Binding, Catalog } from '@/shared/schema-drawer'

export function useBindingActions<TUnit extends Binding>(
  onChange: (value: Catalog<TUnit> | undefined) => void,
  bindingItems?: Catalog<TUnit> | undefined
) {
  function changeBinding(id: string | number, name: string, newBindingItemProps: unknown) {
    assertNotUndefined(bindingItems)

    const binding = findEntity(id, bindingItems)
    const newBindings = replace(bindingItems, id, {
      ...binding,
      name,
      ...(newBindingItemProps ? { props: newBindingItemProps } : undefined),
    })

    onChange(omitEmpty(newBindings))
  }

  return {
    changeBinding,
  }
}