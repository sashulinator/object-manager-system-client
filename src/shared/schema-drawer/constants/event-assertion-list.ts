import { assertMatchPattern, assertUndefined, assertVisited } from '../lib/event-assertions'
import { AssertionUnitType, EventAssertionListItem, Norm, SchemaType } from '../model/types'
import { BasicComponentsNames } from './basic-components-schemas'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const eventAssertionList: Norm<EventAssertionListItem> = {
  undefined: {
    function: assertUndefined,
    schema: {
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: SchemaType.FORM,
      comps: {
        ROOT_ID: {
          id: 'ROOT_ID',
          title: 'stackRoot',
          name: 'hello',
          children: ['namesDropdown', 'isInit'],
          props: { tokens: { padding: '5px', childrenGap: '4px' } },
          compSchemaId: BasicComponentsNames.Stack,
        },
        namesDropdown: {
          id: 'namesDropdown',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: BasicComponentsNames.Dropdown,
          injections: [
            {
              from: 'context.previewData.names',
              to: 'props.options',
            },
          ],
          validators: {
            ROOT_ID: {
              id: 'ROOT_ID',
              name: 'and',
              type: AssertionUnitType.OPERATOR,
              children: ['l46vi95c'],
            },
            l46vi95c: {
              id: 'l46vi95c',
              name: 'string',
              type: AssertionUnitType.ASSERTION,
            },
          },
        },
        isInit: {
          id: 'isInit',
          title: 'initial value',
          name: 'isInit',
          props: { label: 'initial value' },
          compSchemaId: BasicComponentsNames.Checkbox,
        },
      },
    },
  },
  visited: {
    function: assertVisited,
    schema: {
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: SchemaType.FORM,
      comps: {
        ROOT_ID: {
          id: 'ROOT_ID',
          title: 'stackRoot',
          name: 'hello',
          children: ['namesDropdown'],
          props: { tokens: { padding: '5px', childrenGap: '4px' } },
          compSchemaId: BasicComponentsNames.Stack,
        },
        namesDropdown: {
          id: 'namesDropdown',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: BasicComponentsNames.Dropdown,
          injections: [
            {
              from: 'context.previewData.names',
              to: 'props.options',
            },
          ],
          validators: {
            ROOT_ID: {
              id: 'ROOT_ID',
              name: 'and',
              type: AssertionUnitType.OPERATOR,
              children: ['l46vi95c'],
            },
            l46vi95c: {
              id: 'l46vi95c',
              name: 'string',
              type: AssertionUnitType.ASSERTION,
            },
          },
        },
      },
    },
  },
  matchPattern: {
    function: assertMatchPattern,
    schema: {
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: SchemaType.FORM,
      comps: {
        ROOT_ID: {
          id: 'ROOT_ID',
          title: 'stackRoot',
          name: 'hello',
          children: ['pattern', 'namesDropdown'],
          props: { tokens: { padding: '5px' } },
          compSchemaId: BasicComponentsNames.Stack,
        },
        pattern: {
          id: 'pattern',
          title: 'pattern',
          name: 'pattern',
          props: { label: 'pattern' },
          compSchemaId: BasicComponentsNames.TextField,
          validators: {
            ROOT_ID: {
              id: 'ROOT_ID',
              name: 'and',
              type: AssertionUnitType.OPERATOR,
              children: ['l46vi95c'],
            },
            l46vi95c: {
              id: 'l46vi95c',
              name: 'string',
              type: AssertionUnitType.ASSERTION,
            },
          },
        },
        namesDropdown: {
          id: 'namesDropdown',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: BasicComponentsNames.Dropdown,
          injections: [
            {
              from: 'context.previewData.names',
              to: 'props.options',
            },
          ],
          validators: {
            ROOT_ID: {
              id: 'ROOT_ID',
              name: 'and',
              type: AssertionUnitType.OPERATOR,
              children: ['l46vi95c'],
            },
            l46vi95c: {
              id: 'l46vi95c',
              name: 'string',
              type: AssertionUnitType.ASSERTION,
            },
          },
        },
      },
    },
  },
}

export const eventAssertionNameOptions = generateOptionsFromObject(eventAssertionList)