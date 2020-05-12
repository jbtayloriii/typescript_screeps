import { ResourceRequester } from "resources/resource_requester";
import { CreepContract } from "resources/contracts/creep_contract";
import { Task } from "tasks/task";
import { Priorities } from "priorities/priorities";

export enum CurrentState {
	New = 0,
	HarvestingEnergy = 1,
	UpgradingController = 2,
}

export class BasicUpgradeTask implements Task {
	private creepContract:CreepContract;
	private currentState: CurrentState;

	static CreateBasicUpgradeTask(requester: ResourceRequester) {
		const creepContract = requester.requestCreep([WORK, MOVE, CARRY], Priorities.tasks.basicUpgradeTask);
		return new BasicUpgradeTask(creepContract);
	}

	constructor(creepContract: CreepContract,
		currentState:CurrentState = CurrentState.New) {
		this.creepContract = creepContract;
		this.currentState = currentState
	}

	public static deserialize(memory: BasicUpgradeTaskMemory): BasicUpgradeTask {
		return new BasicUpgradeTask(global.contractManager.getCreepContract(memory.contractId), memory.currentState);
	}

	public execute() {
		if (!creepContract.hasCreep()) {
			this.currentState = CurrentState.New;
			return;
		}

		const creep: Creep = creepContract.getCreep();
	}
}