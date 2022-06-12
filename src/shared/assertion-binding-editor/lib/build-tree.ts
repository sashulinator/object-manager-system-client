import { TreeItem } from '@atlaskit/tree'

import { ROOT_ID } from '@/constants/common'
import { mutateObject } from '@/lib/mutate-object'
import { AssertionUnit, Norm } from '@/shared/schema-drawer'

export interface AdditionalData {
  remove: (id: string | number) => void
  changeValidator: (id: string | number, name: string, withValue?: unknown) => void
  selectItemId: React.Dispatch<React.SetStateAction<string>>
  selectedItemId: string
}

export default function buildTree(validators: Norm<AssertionUnit> | undefined, additionalData: AdditionalData) {
  if (validators === undefined) {
    return undefined
  }

  const items = mutateObject<TreeItem, Norm<AssertionUnit>>(validators)((validator) => {
    return {
      ...validator,
      id: validator.id,
      isExpanded: true,
      hasChildren: validator.children !== undefined,
      children: validator.children || [],
      data: { validator, ...additionalData },
    }
  })

  return {
    rootId: ROOT_ID,
    items,
  }
}