import './preview.css'

import { CSchemasState } from '../../comp-panel/model/comp-schema'
import { highlightSelection, removeAllSelectionHighlights } from '../lib/highlight'
import React, { FC, useEffect, useLayoutEffect } from 'react'
import { Form } from 'react-final-form'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { FSchemaHistoryState, pickedFCompIdsState } from '@/entities/schema/model/current-schema'
import CompDrawer from '@/shared/draw-comps'

const Preview: FC = (): JSX.Element => {
  const [FSchemaHistory, setFSchemaHistory] = useRecoilState(FSchemaHistoryState)
  const [CSchemas] = useRecoilState(CSchemasState)
  const resetFSchema = useResetRecoilState(FSchemaHistoryState)
  const [pickedFCompIds] = useRecoilState(pickedFCompIdsState)
  const resetPickedFCompId = useResetRecoilState(pickedFCompIdsState)

  useLayoutEffect(() => {
    removeAllSelectionHighlights()

    pickedFCompIds.forEach((compId) => {
      highlightSelection(compId)
    })
  }, [pickedFCompIds, FSchemaHistory.data])

  useEffect(() => {
    resetFSchema()
    resetPickedFCompId()
  }, [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log('data', data)
  }

  return (
    <div className="Preview">
      <div className="selectorArea" />
      <div className="hoverArea" />
      {CSchemas && (
        <Form
          key={JSON.stringify(FSchemaHistory)}
          onSubmit={onSubmit}
          render={(formProps) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                {FSchemaHistory && (
                  <CompDrawer
                    schemas={CSchemas}
                    comps={FSchemaHistory.data.comps}
                    bindingContext={{
                      FSchemaHistory,
                      CSchemas,
                      setFSchemaHistory,
                      form: formProps.form,
                    }}
                  />
                )}
              </form>
            )
          }}
        />
      )}
    </div>
  )
}

export default Preview
