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
	private source: Source;
	private controller: StructureController;

	static createNewTask(requester: ResourceRequester, source: Source, controller: StructureController): BasicUpgradeTask {
		const creepContract = requester.requestCreep([WORK, MOVE, CARRY], Priorities.tasks.basicUpgradeTask);
		return new BasicUpgradeTask(creepContract, source, controller);
	}

	constructor(creepContract: CreepContract,
		source: Source,
		controller: StructureController,
		currentState:CurrentState = CurrentState.New) {
		this.creepContract = creepContract;
		this.source = source;
		this.controller = controller;
		this.currentState = currentState
	}

	public static deserialize(mem: BasicUpgradeTaskMemory): BasicUpgradeTask {
		const source = Game.getObjectById(mem.sourceId) as Source;
		const controller = Game.getObjectById(mem.controllerId) as StructureController;
		return new BasicUpgradeTask(global.contractManager.getCreepContract(mem.contractId),
			source,
			controller,
			mem.currentState);
	}

	public serialize(): BasicUpgradeTaskMemory {
		return {
			kind: TaskKind.BasicUpgradeTask,
			contractId: this.creepContract.getId(),
			currentState: this.currentState,
			sourceId: this.source.id,
			controllerId: this.controller.id,
		};
	}

	public execute() {
		const creep = this.creepContract.getCreep();
		if (creep === null) {
			this.currentState = CurrentState.New;
			return;
		}

		if (this.currentState === CurrentState.New) {
			this.currentState = CurrentState.HarvestingEnergy;
		}

		if (this.currentState === CurrentState.HarvestingEnergy) {
			if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
				this.currentState = CurrentState.UpgradingController;
			} else {
				const harvestCode = creep.harvest(this.source);

				// TODO: cached path
				if (harvestCode === ERR_NOT_IN_RANGE) {
					creep.moveTo(this.source);
				}
			}
		} else if (this.currentState === CurrentState.UpgradingController) {
			if (creep.store[RESOURCE_ENERGY] === 0) {
				this.currentState = CurrentState.HarvestingEnergy;
			} else {
				const upgradeCode = creep.upgradeController(this.controller);

				// TODO: cached path
				if (upgradeCode === ERR_NOT_IN_RANGE) {
					creep.moveTo(this.source);
				}
			}
		}
	}
}