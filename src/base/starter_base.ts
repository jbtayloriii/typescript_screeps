import { Base } from "base/base";
import { BasicHarvestTask } from "tasks/basic_harvest_task";
import { BasicUpgradeTask } from "tasks/basic_upgrade_task";
import { ResourceRequester } from "resources/resource_requester";
import { Task } from "tasks/task";
import { TasksDeserialize } from "tasks/tasks_deserialize";

export class StarterBase implements Base {
	private requester: ResourceRequester;
	private tasks: Array<Task>;

	static CreateStarterBase(): StarterBase {
		const firstSpawn = Game.spawns[Object.keys(Game.spawns)[0]];
		const requester = ResourceRequester.fromSpawn(firstSpawn);
		const closestSource = firstSpawn.pos.findClosestByPath(FIND_SOURCES);
		const controller = firstSpawn.room.controller;
		if (!controller || !closestSource) {
			throw "Cannot create starter base, missing controller or source";
		}
		const tasks = [
			BasicHarvestTask.createNewTask(requester, closestSource, firstSpawn),
			BasicUpgradeTask.createNewTask(requester, closestSource, controller)
		];
		return new StarterBase(requester, tasks);
	}

	constructor(requester: ResourceRequester, tasks: Array<Task>) {
		this.requester = requester;
		this.tasks = tasks;
	}

	public run(): void {
		for (const task of this.tasks) {
			task.execute();
		}
	}

	public processResourceRequests(): void {
		this.requester.processRequests();
	}

	public static deserialize(mem: StarterBaseMemory): StarterBase {
		// TODO: CHANGE THIS
		const requester = ResourceRequester.deserialize(mem.resource_requester);
		const tasks = mem.tasks.map(taskMem => TasksDeserialize.deserialize(taskMem));
		return new StarterBase(requester, tasks);
	}

	public serialize(): StarterBaseMemory {
		return {
			kind: BaseKind.StarterBase,
			resource_requester: this.requester.serialize(),
			tasks: this.tasks.map(task => task.serialize()),
		};
	}
}