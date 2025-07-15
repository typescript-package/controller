import { PropertyControllerBase } from './property-controller-base.abstract';
import { WrappedPropertyDescriptor, PropertyDescriptorChainShape } from '@typedly/descriptor';


export class PropertyController<
  O extends Record<PropertyKey, any>,
  K extends keyof O,
  A extends boolean,
  F extends boolean,
  C extends boolean,
  E extends boolean,
  D extends WrappedPropertyDescriptor<O, K, A, F, C, E>
> extends PropertyControllerBase<O, K, A, F, C, E, D> {
  constructor(
    object: O,
    key: K,
    descriptor: D = {} as D,
    descriptorChain?: new () => PropertyDescriptorChainShape<O, K, O[K], A, F, C, E, D>
  ) {
    super(object, key, descriptor, descriptorChain);
  }
}