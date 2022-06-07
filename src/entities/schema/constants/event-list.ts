import { onFieldChange } from '../lib/events'
import { EventListItem, Norm } from '../model/types'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const eventList: Norm<EventListItem> = {
  [onFieldChange.name]: {
    function: onFieldChange,
  },
}

export const eventNameOptions = generateOptionsFromObject(eventList)
