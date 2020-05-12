import { Task } from "tasks/task";

export class TasksDeserialize {


	constructor() {	}

	public static deserializeTask(memory:TaskMemory): Task {
		if (memory.kind === TaskKind.BasicHarvestTask) {

		} else if (memory.kind === TaskKind.BasicUpgradeTask) {

		}
		throw "Unable to deserialize task memory: " + memory;
	}
}