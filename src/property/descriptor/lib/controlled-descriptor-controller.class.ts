// Interface.
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
import { WrappedPropertyDescriptorController } from '@typedly/controller';
import { ControlledPropertyDescriptor } from '@typedly/controlled-descriptor';
// Type.
import { GetterCallback, SetterCallback } from '@typedly/callback';
/**
 * @description
 * @export
 * @class ControlledDescriptorController
 * @template [O=any] 
 * @template {keyof O} [K=keyof O] 
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] 
 * @template {boolean} [A=boolean] 
 * @template {boolean} [N=boolean] 
 * @template {boolean} [C=boolean] 
 * @template {boolean} [E=boolean] 
 * @template {ControlledPropertyDescriptor<O, K, V, A, N, C, E, D>} [D=ControlledPropertyDescriptor<O, K, V, A, N, C, E, any>] 
 * @implements {WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>}
 */
export class ControlledDescriptorController<
  // Object.
  O = any,
  // Key.
  K extends keyof O = keyof O,
  // Value.
  V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
  // Active.
  A extends boolean = boolean,
  // Enabled.
  N extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  // The type of the previous descriptor.
  D extends ControlledPropertyDescriptor<O, K, V, A, N, C, E, D> = ControlledPropertyDescriptor<O, K, V, A, N, C, E, any>,
> implements WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D> {
  /**
   * @description The default active state of the descriptor.
   * @public
   * @static
   * @type {boolean}
   */
  public static active: boolean = true;

  /**
   * @description The default enabled state of the descriptor.
   * @public
   * @static
   * @type {boolean}
   */
  public static enabled: boolean = true;

  /**
   * @description The string tag for the descriptor.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return 'ControlledDescriptorController';
  }

  //#region Getters
  /**
   * @inheritdoc
   */
  public get active() {
    return this.#active;
  }

  /**
   * @inheritdoc
   */
  public get enabled() {
    return this.#enabled;
  }


  /**
   * @inheritdoc
   */
  public get get() {
    return this.#get;
  }

  /**
   * @inheritdoc
   */
  public get index() {
    return this.#index;
  }

  /**
   * @inheritdoc
   */
  public get key() {
    return this.#key;
  }

  /**
   * @inheritdoc
   */
  public get onGet() {
    return this.#onGet;
  }

  /**
   * @inheritdoc
   */
  public get onSet() {
    return this.#onSet;
  }

  /**
   * @inheritdoc
   */
  public get previous() {
    return this.#previousDescriptor;
  }

  /**
   * @inheritdoc
   */
  public get privateKey() {
    return this.#privateKey;
  }

  /**
   * @description The `set` getter for the descriptor.
   * @public
   * @readonly
   * @type {((this: O, value: V, descriptor?: D | undefined) => void) | undefined}
   */
  public get set() {
    return this.#set;
  }
  //#endregion

  //#region Private properties
  /**
   * @description Privately stored active state of the descriptor.
   * @type {(A | { onGet?: boolean; onSet?: boolean })}
   */
  #active: A | { onGet?: boolean; onSet?: boolean } = true as A;

  /**
   * @description Privately stored enabled state of the descriptor.
   * @type {N}
   */
  #enabled: N = true as N;

  /**
   * @description Privately stored index of the descriptor in the chain.
   * @type {number}
   */
  #index?: number = undefined;

  /**
   * @description Privately stored object key.
   * @type {K}
   */
  #key: K;

  /**
   * @description Privately stored previous descriptor.
   * @type {?D}
   */
  #previousDescriptor?: D;

  /**
   * @description Privately stored private key for the descriptor.
   * @type {PropertyKey}
   */
  #privateKey: PropertyKey;

  /**
   * @description Privately stored getter callback for the descriptor.
   * @type {?GetterCallback<O, K>}
   */
  #onGet?: GetterCallback<O, K>;

  /**
   * @description Privately stored setter callback for the descriptor.
   * @type {?SetterCallback<O, K>}
   */
  #onSet?: SetterCallback<O, K>;
  //#endregion

  //#region Methods
  /**
   * @description Privately stored `get` function.
   * @type {(this: O, descriptor?: D) => V}
   */
  #get?: (this: O, descriptor?: D) => V;

  /**
   * @description Privately stored `set` function.
   * @type {(this: O, value: V, descriptor?: D) => void}
   */
  #set?: (this: O, value: V, descriptor?: D) => void;
  //#endregion

  /**
   * Creates an instance of `ControlledDescriptorController`.
   * @constructor
   * @param {O} object The object to control.
   * @param {K} key The key of the property to control.
   * @param {Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>} descriptor The property descriptor.
   */
  constructor(
    object: O,
    key: K,
    descriptor: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>,
  ) {
    this.#active = typeof descriptor.active === 'boolean' || typeof descriptor.active === 'object' ? descriptor.active : ControlledDescriptorController.active as A;
    this.#enabled = typeof descriptor.enabled === 'boolean' || typeof descriptor.enabled === 'object' ? descriptor.enabled : ControlledDescriptorController.enabled as N;
    this.#get = descriptor.get!;
    this.#index = descriptor.index;
    this.#key = key;
    this.#previousDescriptor = (descriptor.previousDescriptor || Object.getOwnPropertyDescriptor(object, key)) as D;
    this.#privateKey = descriptor.privateKey || `_${String(key)}`;
    this.#set = descriptor.set!;
    this.#onGet = descriptor.onGet;
    this.#onSet = descriptor.onSet;
  }

  //#region Instance methods
  public activate(callback: 'both' | 'onGet' | 'onSet' = 'both'): this {
    this.#setActive(callback, true as A);
    return this;
  }

  public deactivate(callback: 'both' | 'onGet' | 'onSet' = 'both'): this {
    this.#setActive(callback, false as A);
    return this;
  }

  public disable(): this {
    // Disable the descriptor by setting enabled to false.
    // This will prevent the descriptor from being used.
    // It will also prevent the descriptor from being used in the chain.
    this.#enabled = false as N;
    return this;
  }

  public enable(): this {
    this.#enabled = true as N;
    return this;
  }

  /**
   * @description Checks whether the descriptor callback `onGet` or `onSet` is active or 'both' are active.
   * @public
   * @param {('both' | 'onGet' | 'onSet')} callback 
   * @returns {boolean} 
   */
  public isActive(callback: 'both' | 'onGet' | 'onSet'): boolean {
    switch(callback) {
      case 'both':
        return this.active === true || (typeof this.active === 'object' && (this.active.onGet === true && this.active.onSet === true));
      case 'onGet':
      case 'onSet':
        return typeof this.active === 'object'
          ? this.active[callback] === true || false
          : this.active === true;
      default:
        throw new Error(`Invalid type: ${callback}. Expected 'both', 'onGet' or 'onSet'.`);
    }
  }
  //#endregion

  #setActive(callback: 'both' | 'onGet' | 'onSet', active: A) {
    if (typeof this.#active === 'object' && ('onGet' === callback || 'onSet' === callback)) {
      this.#active[callback] = active;
    } else {
      this.#active = active as A;
    }
  }
}
