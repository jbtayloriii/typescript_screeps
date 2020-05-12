import { Task } from "tasks/task";
import { BasicHarvestTask } from "tasks/basic_harvest_task";
import { BasicUpgradeTask } from "tasks/basic_upgrade_task";

export class TasksDeserialize {


	constructor() {	}

	public static deserialize(mem:TaskMemory): Task {
		if (mem.kind === TaskKind.BasicHarvestTask) {
			return BasicHarvestTask.deserialize(mem as BasicHarvestTaskMemory);
		} else if (mem.kind === TaskKind.BasicUpgradeTask) {
			return BasicUpgradeTask.deserialize(mem as BasicUpgradeTaskMemory);
		}
		throw "Unable to deserialize task memory: " + mem;
	}
}