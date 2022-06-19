import { Key, StoreData } from '../store-abstract'
import { TreeItem, TreeStore } from '../tree-store'
import { AnyConstructor } from '../types'

export const Selectable = <TKey extends Key, TItem extends TreeItem, T extends AnyConstructor<TreeStore<TKey, TItem>>>(
  base: T
) => {
  // @ts-expect-error https://github.com/microsoft/TypeScript/issues/37142
  class SelectableMixin extends base {
    selectedKeys: string[]

    constructor(data: StoreData<TKey, TItem>, rootId: Key, idKey: TKey) {
      super(data, rootId, idKey)
      this.selectedKeys = []
    }

    remove(id: Key): this {
      const position = this.getPosition(id)
      const positionIndex = position?.index ?? 0
      // We want to select smth after removing only if we have one selection
      const isOnlySelectedKey = this.selectedKeys.length === 1

      const parent = this.find(position?.parentId)
      const siblingId = this.findChild(parent?.[this.idKey], positionIndex - 1 || 0)

      if (isOnlySelectedKey && this.selectedKeys[0] !== id) {
        super.remove(id)

        return this
      }

      if (siblingId) {
        this.selectedKeys = [siblingId]
      } else {
        this.selectedKeys = []
      }

      super.remove(id)

      return this
    }
  }

  return SelectableMixin as AnyConstructor<SelectableMixin> & typeof SelectableMixin & T
}
