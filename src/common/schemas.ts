import {
  ANY_KEY,
  _null,
  and,
  boolean,
  ignorePattern,
  keyDoesNotExist,
  notEmptyString,
  or,
  string,
  withRef,
  withValue,
  wrap,
} from '@savchenko91/schema-validator'

import { assertSchemaComponentNameIsValid } from './assertions'

import ErrorFromObject from '@/lib/error-from-object'
import { rootOnly } from '@/lib/validators'
import { CompSchema } from '@/shared/schema-drawer'

export const schemaValidator = rootOnly({
  componentName: or(_null, withRef('type', assertSchemaComponentNameIsValid)),
  id: string,
  title: and(string, notEmptyString, withValue(/\W+/, ignorePattern)),
  type: string,
  catalog: wrap({
    [ANY_KEY]: {
      id: string,
      compSchemaId: and(string, notEmptyString),
      title: and(string, notEmptyString),
      name: or(string, keyDoesNotExist),
      defaultValue: or(string, boolean, keyDoesNotExist),
      props: or(keyDoesNotExist, {
        label: or(string, keyDoesNotExist),
      }),
      children: or([string], keyDoesNotExist),
    },
  }),
})

export function assertsSchema(input: unknown): asserts input is CompSchema {
  const errors = schemaValidator(input)

  // TODO фигня какая-то. Надо создать отдельную ошибку
  if (errors) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new ErrorFromObject(errors as any)
  }
}
