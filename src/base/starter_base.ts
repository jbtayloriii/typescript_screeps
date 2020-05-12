import { Base } from "base/base";
import { ResourceRequester } from "resources/resource_requester";
import { Task } from "tasks/task";
import { TasksDeserialize } from "tasks/tasks_deserialize";

export class StarterBase implements Base {
	private requester: ResourceRequester;
	private tasks: Array<Task>;

	static CreateStarterBase(): StarterBase {
		const requester = ResourceRequester.fromSpawn(Game.spawns[Object.keys(Game.spawns)[0]]);
		return new StarterBase(requester, []);
	}

	constructor(requester: ResourceRequester, tasks: Array<Task>) {
		this.requester = requester;
		this.tasks = tasks;
	}

	public run(): void {
		console.log('Running starter base');
	}

	public static deserialize(memory: StarterBaseMemory): StarterBase {
		// TODO: CHANGE THIS
		return StarterBase.CreateStarterBase();
	}
}