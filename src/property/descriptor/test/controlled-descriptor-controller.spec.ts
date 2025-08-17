import { ControlledDescriptorController } from "../lib";
import { Person } from "../../../test/person.test";

const person = new Person();

const controller = new ControlledDescriptorController(person, 'age');

console.group(`ControlledDescriptorController`);

console.debug(controller);

console.groupEnd();
