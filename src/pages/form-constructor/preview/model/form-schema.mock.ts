import { ROOT_COMP_ID } from '@/constants/common'
import { Schema } from '@/types/form-constructor'

export const FSchemaMock: Schema = {
  id: 'ee4254ef-a9a3-4243-be68-51ce733b338e',
  name: 'credentials',
  title: 'Креды',
  description: 'some description',
  comps: {
    [ROOT_COMP_ID]: {
      id: ROOT_COMP_ID,
      name: 'stackRoot',
      compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
      compName: 'Stack',
      path: 'hello',
      type: 'component',
      props: {
        as: 'ul',
        horizontal: true,
        verticalAlign: 'center',
        tokens: {
          childrenGap: 10,
          padding: '45px 40px',
        },
      },
      childCompIds: ['stackChild'],
    },
    stackChild: {
      id: 'stackChild',
      name: 'stackChildName',
      compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
      compName: 'Stack',
      path: 'hello',
      type: 'component',
      props: {
        as: 'ul',
        horizontal: true,
        verticalAlign: 'center',
        tokens: {
          childrenGap: 10,
          padding: '45px 40px',
        },
      },
      childCompIds: ['buttonOneId', 'buttonTwoId', 'textInputOneId', 'textInputTwoId'],
    },
    buttonOneId: {
      id: 'buttonOneId',
      name: 'КнопкаГлавная1',
      compSchemaId: 'ee4254ef-9099-4243-be68-51ce733b3376',
      compName: 'PrimaryButton',
      path: 'hello12',
      type: 'button',
      props: {
        disabled: false,
        type: 'submit',
        children: 'hello',
      },
    },
    textOneId: {
      id: 'textOneId',
      name: 'Текст1',
      compSchemaId: 'textCompSchemaId',
      compName: 'Text',
      path: 'hello12',
      type: 'component',
      props: {
        children: 'hello',
      },
    },
    buttonTwoId: {
      id: 'buttonTwoId',
      name: 'КнопкаГлавная2',
      compSchemaId: 'ee4254ef-9099-4243-be68-51ce733b3376',
      compName: 'PrimaryButton',
      path: 'world',
      type: 'button',
      props: {
        disabled: false,
        children: 'koko',
      },
    },
    textInputOneId: {
      id: 'textInputOneId',
      name: 'ТекстовоеПоле1',
      compSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
      compName: 'TextField',
      path: 'funny',
      defaultValue: 'init',
      type: 'input',
    },
    textInputTwoId: {
      id: 'textInputTwoId',
      name: 'ТекстовоеПоле2',
      compSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
      compName: 'TextField',
      path: 'kuku',
      type: 'input',
    },
  },
}
