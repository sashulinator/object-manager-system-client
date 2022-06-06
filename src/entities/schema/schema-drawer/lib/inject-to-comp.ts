import { Context } from '../model/types'
import get from 'lodash.get'

import { Comp } from '@/entities/schema'
import buildObject from '@/lib/build-object'

export default function injectToComp(injections: Comp['injections'], context: Context, comp: Comp): Comp {
  if (!injections) {
    return comp
  }

  return injections?.reduce<Comp>((accComp, injection) => {
    if (!injection.from || !injection.to) {
      return comp
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = get({ context: context }, injection.from as any)

    const newProps = (buildObject({ ...accComp }, injection.to, { ...data }) as unknown) as Comp

    return newProps
  }, comp)
}