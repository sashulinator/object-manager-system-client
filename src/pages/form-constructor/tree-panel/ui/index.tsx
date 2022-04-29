import Tree, { TreeDestinationPosition, TreeSourcePosition, moveItemOnTree, mutateTree } from '@atlaskit/tree'
import { IconButton } from '@fluentui/react'

import { paletteModalState } from '../../palette-modal/model'
import { buildTree } from '../lib/build-tree'
import TreeLeaf from './tree-leaf'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

import { moveComps as moveComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState } from '@/pages/form-constructor/preview/model/form-schema'

const PADDING_PER_LEVEL = 20

function TreePanel(): JSX.Element {
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [pickedFCompId, setPickedFCompId] = useRecoilState(pickedFCompIdState)
  const [, setPaletteOpen] = useRecoilState(paletteModalState)
  const [tree, setTree] = useState(() => buildTree(FSchema.comps, { pickedFCompId, setPickedFCompId }))

  function onExpand(itemId: string | number) {
    setTree(mutateTree(tree, itemId, { isExpanded: true }))
  }

  function onCollapse(itemId: string | number) {
    setTree(mutateTree(tree, itemId, { isExpanded: false }))
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to) {
      return
    }

    const newTree = moveItemOnTree(tree, from, to)
    setTree(newTree)

    const newFormSchema = moveComp(FSchema.comps, from, to)
    setFSchema({ ...FSchema, comps: newFormSchema })
  }

  return (
    <div className="TreePanel">
      <div className="addCompButton">
        <IconButton iconProps={{ iconName: 'Add' }} onClick={() => setPaletteOpen(true)} />
      </div>
      <Tree
        tree={tree}
        renderItem={TreeLeaf}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        offsetPerLevel={PADDING_PER_LEVEL}
        isDragEnabled
        isNestingEnabled
      />
    </div>
  )
}

export default TreePanel
