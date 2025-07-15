// Abstract.
import { PropertyControllerCore } from './property-controller-core.abstract ';
// Interface.
import { PropertyDescriptorChainShape, WrappedPropertyDescriptor, DescriptorsShape } from '@typedly/descriptor';
// Type.
import { SetterCallback, GetterCallback } from '@typedly/callback';
/**
 * @description
 * @export
 * @abstract
 * @class PropertyControllerBase
 * @template {Record<PropertyKey, any>} O 
 * @template {keyof O} [K=keyof O] 
 * @template {boolean} [A=boolean] 
 * @template {boolean} [F=boolean] 
 * @template {boolean} [C=boolean] 
 * @template {boolean} [E=boolean] 
 * @template {WrappedPropertyDescriptor<O, K, A, F, C, E>} [D=WrappedPropertyDescriptor<O, K, A, F, C, E>] 
 * @extends {PropertyControllerCore<O, K, A, F, C, E, D>}
 */
export abstract class PropertyControllerBase<
  O extends Record<PropertyKey, any>,
  K extends keyof O = keyof O,
  A extends boolean = boolean,
  F extends boolean = boolean,
  C extends boolean = boolean,
  E extends boolean = boolean,
  D extends WrappedPropertyDescriptor<O, K, A, F, C, E> = WrappedPropertyDescriptor<O, K, A, F, C, E>,
> extends PropertyControllerCore<O, K, A, F, C, E, D> {

  public get active(): A | undefined {
    return this.#active;
  }

  /**
   * @description Current descriptor of the property in the object.
   * @abstract
   * @readonly
   * @type {D}
   */
  public get descriptor(): D {
    return this.#descriptorChain
      ? this.#descriptorChain.last()
      : this.#descriptor as D;
  }

  public get descriptors(): DescriptorsShape<O, K, O[K], A, F, C, E, D> | undefined {
    return undefined;
  }

  public get previousDescriptor(): D {
    return this.#descriptorChain
      ? this.#descriptorChain.last().previousDescriptor as D
      : this.#descriptor?.previousDescriptor as D;
  }

  public get privateKey(): PropertyKey {
    return this.descriptor.privateKey as PropertyKey;
  }

  /**
   * @description Property descriptor chain stored by this controller.
   * @abstract
   * @readonly
   * @type {(PropertyDescriptorChainShape<O, K, O[K], A, F, C, E, D> | undefined)}
   */
  public get descriptorChain(): PropertyDescriptorChainShape<O, K, O[K], A, F, C, E, D> | undefined {
    return this.#descriptorChain;
  }

  /**
   * @description The key of the property controlled by this controller.
   * This is the key of the property in the object.
   * It can be a string or a symbol.
   * This key is used to access the property in the object.
   * @public
   * @readonly
   * @type {K}
   */
  public get key(): K {
    return this.#key;
  }

  /**
   * @description The reference to the object controlled by this controller.
   * This is the object that contains the property controlled by this controller.
   * It can be an object or a class prototype.
   * This object is used to access the property controlled by this controller.
   * If the target is a class, this will be the prototype of the class.
   * @public
   * @readonly
   * @type {O}
   */
  public get object(): O {
    return this.#object;
  }

  /**
   * @description Gets the getter function of the descriptor.
   * @type {(D['get'] | undefined)}
   */
  get get(): D['get'] | undefined {
    return this.descriptor?.get;
  }

  /**
   * @description
   * @readonly
   * @type {(D['set'] | undefined)}
   */
  get set(): D['set'] | undefined {
    return this.descriptor?.set;
  }

  /**
   * @description 
   * @readonly
   * @type {(GetterCallback<O, K> | undefined)}
   */
  get onGet(): GetterCallback<O, K> | undefined {
    return this.descriptor?.onGet;
  }

  /**
   * @description
   * @readonly
   * @type {(SetterCallback<O, K> | undefined)}
   */
  get onSet(): SetterCallback<O, K> | undefined {
    return this.descriptor?.onSet;
  }

  #active: A = false as A;

  /**
   * @description
   * @type {?D}
   */
  #descriptor?: D;

  /**
   * @description
   * @type {?PropertyDescriptorChainShape<O, K, O[K], A, F, C, E, D>}
   */
  #descriptorChain?: PropertyDescriptorChainShape<O, K, O[K], A, F, C, E, D>;

  /**
   * @description
   * @type {K}
   */
  #key: K;

  /**
   * @description
   * @type {O}
   */
  #object: O;

  /**
   * Creates an instance of `PropertyControllerBase`.
   * @constructor
   * @param {O} object 
   * @param {K} key 
   * @param {D} [descriptor={} as D] 
   * @param {?new (descriptor: D) => PropertyDescriptorChainShape<O, K, O[K], A, F, C, E, D>} [descriptorChain] 
   */
  constructor(
    object: O,
    key: K,
    descriptor: D = {} as D,
    descriptorChain?: new (descriptor: D) => PropertyDescriptorChainShape<O, K, O[K], A, F, C, E, D>
  ) {
    super();
    this.#object = object;
    this.#key = key;
    this.#descriptor = descriptor as D;
    this.#descriptorChain = descriptorChain
      ? new descriptorChain(this.#descriptor)
      : undefined;
  }

  public addDescriptor(descriptor: D): this {
    this.#descriptorChain?.add(descriptor);
    return this;
  }

  public attach(): this {
    return this;
  }

  public isActive(index: number): boolean {
    const descriptor = this.#descriptorChain?.get(index);
    return descriptor
      ? typeof descriptor.active === 'boolean'
        ? descriptor.active
        : false
      : false;
  }

  public getDescriptor(index: number): D | undefined {
    return this.#descriptorChain?.get(index);
  }

  public removeDescriptor(index: number): this {
    this.#descriptorChain?.delete(index);
    return this;
  }

  public setActive(index: number, active: boolean): this {
    return this;
  }
}
