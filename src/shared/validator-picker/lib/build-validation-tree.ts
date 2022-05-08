import { TreeItem } from '@atlaskit/tree'

import { CompValidator, Norm } from '@/common/types'
import { ROOT_ID } from '@/constants/common'
import { mapObject } from '@/lib/map-object'

interface AdditionalData {
  onValidatorNameChange: (v: string | number, name: string) => void
  remove: (id: string) => void
}

export function buildValidatorsTree(validators: Norm<CompValidator> | undefined, additionalData: AdditionalData) {
  if (validators === undefined) {
    return undefined
  }

  const rootTreeItem = {
    id: 'rootId',
    isExpanded: true,
    children: [ROOT_ID],
  }

  const treeItems = mapObject(
    validators,
    (validator): TreeItem => {
      return {
        ...validator,
        id: validator.id,
        isExpanded: true,
        data: { validator, ...additionalData },
        children: validator.children || [],
        hasChildren: validator.children !== undefined,
      }
    }
  )

  const items = { rootId: rootTreeItem, ...treeItems }

  return {
    rootId: rootTreeItem.id,
    items,
  }
}
