import { DescriptorsShape, PropertyDescriptorChainShape, WrappedPropertyDescriptor } from '@typedly/descriptor';
import { PropertyControllerShape } from '@typedly/controller';
import { SetterCallback, GetterCallback } from '@typedly/callback';

export abstract class PropertyControllerCore<
  O extends Record<PropertyKey, any>,
  K extends keyof O = keyof O,
  A extends boolean = boolean,
  F extends boolean = boolean,
  C extends boolean = boolean,
  E extends boolean = boolean,
  D extends WrappedPropertyDescriptor<O, K, A, F, C, E> = WrappedPropertyDescriptor<O, K, A, F, C, E>,
> implements PropertyControllerShape<O, K, A, F, C, E, D> {
  /**
   * @description Gets the active state of the property.
   * @readonly
   * @type {(A | undefined)}
   */
  abstract get active(): A | undefined;

  /**
   * @description Gets the descriptors for the object properties.
   * @readonly
   * @type {(DescriptorsShape<O, K, O[K], A, F, C, E, D> | undefined)}
   */
  abstract get descriptors(): DescriptorsShape<O, K, O[K], A, F, C, E, D> | undefined;

  /**
   * @description Gets the previous descriptor.
   * @readonly
   * @type {D}
   */
  abstract get previousDescriptor(): D;

  /**
   * @description Gets the private key of the property.
   * @readonly
   * @type {PropertyKey}
   */
  abstract get privateKey(): PropertyKey;

  /**
   * @description Gets the getter function of the descriptor.
   * @type {(D['get'] | undefined)}
   */
  abstract get: D['get'] | undefined;

  /**
   * @description Gets the setter function of the descriptor.
   * @type {(D['set'] | undefined)}
   */
  abstract set: D['set'] | undefined;

  /**
   * @description Current `onGet` callback.
   * @type {(GetterCallback<O, K> | undefined)}
   */
  abstract onGet: GetterCallback<O, K> | undefined;

  /**
   * @description Current `onSet` callback.
   * @type {(SetterCallback<O, K> | undefined)}
   */
  abstract onSet: SetterCallback<O, K> | undefined;

  /**
   * @description The key name used to store the controller in the object of the specified property.
   * @protected
   * @static
   * @type {string}
   */
  protected static controllerKey: string = '__controller__';

  /**
   * @description Current descriptor of the property in the object.
   * @public
   * @abstract
   * @readonly
   * @type {D}
   */
  public abstract get descriptor(): D;

  /**
   * @description Property descriptor chain stored by this controller.
   * @abstract
   * @readonly
   * @type {(PropertyDescriptorChainShape<O, K, O[K], A, F, C, E, D> | undefined)}
   */
  abstract get descriptorChain(): PropertyDescriptorChainShape<O, K, O[K], A, F, C, E, D> | undefined;

  /**
   * @description The key of the property controlled by this controller.
   * This is the key of the property in the object.
   * It can be a string or a symbol.
   * This key is used to access the property in the object.
   * @public
   * @abstract
   * @readonly
   * @type {K}
   */
  public abstract get key(): K;
  
  /**
   * @description The reference to the object controlled by this controller.
   * This is the object that contains the property controlled by this controller.
   * It can be an object or a class prototype.
   * This object is used to access the property controlled by this controller.
   * If the target is a class, this will be the prototype of the class.
   * @public
   * @abstract
   * @readonly
   * @type {O}
   */
  public abstract get object(): O;

  /**
   * @description Adds a new descriptor.
   * @public
   * @abstract
   * @param {D} descriptor
   * @returns {this}
   */
  public abstract addDescriptor(descriptor: D): this;

  /**
   * @description Attaches the controller to the property in the object.
   * @public
   * @abstract
   * @returns {this} 
   */
  public abstract attach(): this;

  /**
   * @description Checks if the descriptor at index is active.
   * @public
   * @abstract
   * @param {number} index - The index of the descriptor to check.
   * @returns {boolean}
   */
  public abstract isActive(index: number): boolean;

  /**
   * @description Gets the descriptor at the specified index.
   * @public
   * @abstract
   * @param {number} index
   * @returns {(D | undefined)}
   */
  public abstract getDescriptor(index: number): D | undefined;

  /**
   * @description Removes the descriptor at the specified index.
   * @public
   * @abstract
   * @param {number} index
   * @returns {this}
   */
  public abstract removeDescriptor(index: number): this;

  /**
   * @description Sets the active state of the descriptor at index.
   * @public
   * @abstract
   * @param {number} index The index of the descriptor to set active.
   * @param {boolean} active The active state to set.
   * @returns {this}
   */
  public abstract setActive(index: number, active: boolean): this;
}
