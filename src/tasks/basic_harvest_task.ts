import { ResourceRequester } from "resources/resource_requester";
import { CreepContract } from "resources/contracts/creep_contract";
import { Task } from "tasks/task";
import { Priorities } from "priorities/priorities";

export enum CurrentState {
	New = 0,
	HarvestingEnergy = 1,
	FeedingSpawn = 2,
}

export class BasicHarvestTask {
	private id: string;
	private creepContract: CreepContract;
	private currentState: CurrentState;

	static CreateBasicHarvestTask(requester: ResourceRequester) {
		const creepContract = requester.requestCreep([WORK, MOVE, CARRY], Priorities.tasks.basicHarvestTask);
		return new BasicHarvestTask(creepContract);
	}

	constructor(id: string,
		creepContract: CreepContract,
		currentState: CurrentState = CurrentState.New) {
		this.id = id;
		this.creepContract = creepContract;
		this.currentState = currentState;
	}

	public serialize(): BasicHarvestTaskMemory {
		return {
			id: this.id,
			creepContractId: this.creepContract.id,
			currentState: this.currentState
		};
	}
}