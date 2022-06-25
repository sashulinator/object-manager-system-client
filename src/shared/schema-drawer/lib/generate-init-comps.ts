import { Catalog, Comp, ComponentCompSchema, DrawerContext } from '../model/types'
import bindEvents from './bind-events'
import { emptyFunction } from './empty-function'
import { onFieldLife, onInit } from './events'
import injectToComp from './inject-to-comp'
import { Observer } from './observer'
import { FormApi, createForm } from 'final-form'

import { replace } from '@/lib/change-unmutable'

/**
 * Проблематика: при отрисовке форма дергалась.
 * Причина: после срабатывания события onInit, comps изменялись и форма перерендеривалась
 * Решение: данная функция вычисляет новые значения comps до первого рендеринга
 */
export function generateInitComps(comps: Catalog<Comp>, rawContext: DrawerContext): Catalog<Comp> {
  let newComps = comps

  // создадим фейковую функцию по изменению компонента
  function setComp(newComp: Comp) {
    newComps = replace(newComps, newComp.id, newComp)
  }

  // создадим фейковую форму
  const form: FormApi<Record<string, unknown>, Partial<unknown>> = createForm({ onSubmit: emptyFunction })

  Object.values(comps).forEach((comp) => {
    if (comp.name === undefined) {
      return
    }
    // зарегистрируем поля и установим значения в фейкофой форме
    form.registerField(comp.name, emptyFunction, {})
    form.change(comp.name, comp.defaultValue)
  })

  // добавим фейки в контекст
  const context: DrawerContext = { ...rawContext, form, fns: { ...rawContext.fns, setComp } }

  // пройдёмся по всем comp и вызовем у них собитые onInit
  Object.values(comps).forEach((comp) => {
    const injectedComp = injectToComp(comp.injections, context, comp)
    const schema = context.schemas[comp.compSchemaId] as ComponentCompSchema

    const compContext = {
      ...context,
      comp: injectedComp,
      compSchema: schema,
      observer: new Observer(),
    }

    bindEvents(compContext)
    compContext.observer.emitEvent(onInit.name)()
    compContext.observer.emitEvent(onFieldLife.name)()
  })

  return newComps
}
