import { isMac } from '@fluentui/react'
import { assertNotNull } from '@savchenko91/schema-validator'

import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { schemaValidator } from '@/common/schemas'
import { Comp, Norm } from '@/common/types'
import { ROOT_ID } from '@/constants/common'
import {
  addEntity,
  copyEntities,
  findDependencyIds,
  findEntities,
  findEntityPosition,
  removeEntity,
} from '@/lib/entity-actions'
import {
  FSchemaHistoryState,
  pickedFCompIdsState,
  pickedFCompState,
  setFSchemaComps,
  setNext,
  setPrev,
} from '@/pages/form-constructor/preview'

export default function KeyListener(): null {
  const [FSchemaHistory, setFSchemaHistory] = useRecoilState(FSchemaHistoryState)
  const [pickedFCompIds, setPickedFCompIds] = useRecoilState(pickedFCompIdsState)
  const pickedFComp = useRecoilValue(pickedFCompState)

  useEffect(addEscKeyListener, [pickedFCompIds])
  useEffect(addDeleteKeyListener, [pickedFCompIds])
  useEffect(addCtrlZKeyListener, [pickedFCompIds, FSchemaHistory])
  useEffect(addCtrlShiftZKeyListener, [pickedFCompIds, FSchemaHistory])
  useEffect(addCtrlCKeyListener, [pickedFCompIds, FSchemaHistory])
  useEffect(addCtrlVKeyListener, [pickedFCompIds, FSchemaHistory])

  function addEscKeyListener() {
    function action(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        assertNotNull(pickedFComp)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        setPickedFCompIds([])
      }
    }

    if (pickedFCompIds) {
      document.removeEventListener('keydown', action)
      document.addEventListener('keydown', action)
    } else {
      document.removeEventListener('keydown', action)
    }

    // Удаляем слушатель при уничтожении компонента
    return () => {
      document.removeEventListener('keydown', action)
    }
  }

  //

  function addCtrlZKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

      if (event.code === 'KeyZ' && event[controlKeyName] && !event.shiftKey) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        if (FSchemaHistory.prev) {
          const prevCompsId = FSchemaHistory.prev.data.comps[ROOT_ID]?.children || []

          const absentIds = pickedFCompIds.filter((id) => !prevCompsId.includes(id))

          const newPickedIds = pickedFCompIds.filter((id) => !absentIds.includes(id))

          setPickedFCompIds(newPickedIds)
        }

        setFSchemaHistory(setPrev)
      }
    }

    if (pickedFCompIds) {
      document.removeEventListener('keydown', action)
      document.addEventListener('keydown', action)
    } else {
      document.removeEventListener('keydown', action)
    }

    // Удаляем слушатель при уничтожении компонента
    return () => {
      document.removeEventListener('keydown', action)
    }
  }

  //

  function addCtrlCKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

      if (event.code === 'KeyC' && event[controlKeyName] && !event.shiftKey) {
        const dependencyIds = findDependencyIds(pickedFCompIds, FSchemaHistory.data.comps)
        const selectedComps = findEntities(dependencyIds, FSchemaHistory.data.comps)
        localStorage.setItem('copyClipboard', JSON.stringify(selectedComps))
      }
    }

    if (pickedFCompIds) {
      document.removeEventListener('keydown', action)
      document.addEventListener('keydown', action)
    } else {
      document.removeEventListener('keydown', action)
    }

    // Удаляем слушатель при уничтожении компонента
    return () => {
      document.removeEventListener('keydown', action)
    }
  }

  //

  function addCtrlVKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

      if (event.code === 'KeyV' && event[controlKeyName] && !event.shiftKey) {
        const stringifiedComps = localStorage.getItem('copyClipboard') || ''

        const comps = JSON.parse(stringifiedComps) as Norm<Comp>

        schemaValidator.comps(comps)

        if (comps) {
          const copiedComps = copyEntities(comps, ['path'])

          const isRoot = pickedFCompIds.includes(ROOT_ID)
          const isToRoot = pickedFCompIds.length === 0 || isRoot

          const newComps = Object.values(copiedComps).reduce((acc, comp) => {
            if (isToRoot) {
              acc = addEntity(comp, ROOT_ID, 0, acc)
            } else {
              const position = findEntityPosition(pickedFCompIds[0] || '', acc)
              acc = addEntity(comp, position.parentId.toString(), position.index + 1, acc)
            }
            return acc
          }, FSchemaHistory.data.comps)

          setFSchemaHistory(setFSchemaComps(newComps))

          if (pickedFCompIds.length === 0) {
            setPickedFCompIds(comps[0] ? [comps[0].id] : [])
          }
        }
      }
    }

    if (pickedFCompIds) {
      document.removeEventListener('keydown', action)
      document.addEventListener('keydown', action)
    } else {
      document.removeEventListener('keydown', action)
    }

    // Удаляем слушатель при уничтожении компонента
    return () => {
      document.removeEventListener('keydown', action)
    }
  }

  function addCtrlShiftZKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

      if (event.code === 'KeyZ' && event.shiftKey && event[controlKeyName]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        if (FSchemaHistory.next) {
          const nextCompsId = FSchemaHistory.next.data.comps[ROOT_ID]?.children || []

          const absentIds = pickedFCompIds.filter((id) => !nextCompsId.includes(id))

          const newPickedIds = pickedFCompIds.filter((id) => !absentIds.includes(id))

          setPickedFCompIds(newPickedIds)
        }

        setFSchemaHistory(setNext)
      }
    }

    if (pickedFCompIds) {
      document.removeEventListener('keydown', action)
      document.addEventListener('keydown', action)
    } else {
      document.removeEventListener('keydown', action)
    }

    // Удаляем слушатель при уничтожении компонента
    return () => {
      document.removeEventListener('keydown', action)
    }
  }

  //

  function addDeleteKeyListener() {
    function action(event: KeyboardEvent): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((document?.activeElement as any)?.type === 'text') {
        return
      }

      if (event.key === 'Backspace') {
        if (pickedFComp === null) {
          return
        }

        const comps = removeEntity(pickedFComp?.id, FSchemaHistory.data.comps)
        setPickedFCompIds([])
        setFSchemaHistory(setFSchemaComps(comps))
      }
    }

    if (pickedFCompIds) {
      document.removeEventListener('keydown', action)
      document.addEventListener('keydown', action)
    } else {
      document.removeEventListener('keydown', action)
    }

    // Удаляем слушатель при уничтожении компонента
    return () => {
      document.removeEventListener('keydown', action)
    }
  }

  return null
}
