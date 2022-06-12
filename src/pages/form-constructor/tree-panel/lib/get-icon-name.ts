import { CustomComponentNames } from '../model/types'

import { Comp, Norm, Schema } from '@/shared/schema-drawer'

export default function getIconName(schemas?: Norm<Schema> | null, comp?: Comp): string {
  if (comp === undefined) {
    return 'Unknown'
  }

  const componentName = schemas?.[comp.compSchemaId]?.componentName || 'Unknown'

  const aliases: Record<string, string> = {
    [CustomComponentNames.JSONEditor]: 'JS',
    [CustomComponentNames.Pivot]: 'BrowserTab',
    [CustomComponentNames.PivotItem]: 'TabOneColumn',
  }

  return aliases[componentName] ?? componentName
}