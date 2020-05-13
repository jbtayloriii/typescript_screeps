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
	private creepContract: CreepContract;
	private currentState: CurrentState;
	private source: Source;
	private spawn: StructureSpawn;

	static createNewTask(requester: ResourceRequester, source: Source, spawn: StructureSpawn): BasicHarvestTask {
		const creepContract = requester.requestCreep([WORK, MOVE, CARRY], Priorities.tasks.basicHarvestTask);
		return new BasicHarvestTask(creepContract, source, spawn);
	}

	constructor(creepContract: CreepContract,
		source: Source,
		spawn: StructureSpawn,
		currentState: CurrentState = CurrentState.New) {
		this.creepContract = creepContract;
		this.source = source;
		this.spawn = spawn;
		this.currentState = currentState;
	}

	public static deserialize(mem: BasicHarvestTaskMemory): BasicHarvestTask {
		const source = Game.getObjectById(mem.sourceId) as Source;
		const spawn = Game.getObjectById(mem.spawnId) as StructureSpawn;
		return new BasicHarvestTask(global.contractManager.getCreepContract(mem.contractId),
			source,
			spawn,
			mem.currentState);
	}

	public serialize(): BasicHarvestTaskMemory {
		return {
			kind: TaskKind.BasicHarvestTask,
			contractId: this.creepContract.getId(),
			sourceId: this.source.id,
			spawnId: this.spawn.id,
			currentState: this.currentState,
		};
	}

	public execute(): void {
		const creep = this.creepContract.getCreep();
		if (creep === null) {
			this.currentState = CurrentState.New;
			console.log('BasicHarvestTask: Doing nothing, no creep');
			return;
		}

		if (this.currentState === CurrentState.New) {
			this.currentState = CurrentState.HarvestingEnergy;
		}

		if (this.currentState === CurrentState.HarvestingEnergy) {
			if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
				this.currentState = CurrentState.FeedingSpawn;
			} else {
				const harvestCode = creep.harvest(this.source);

				// TODO: cached path
				if (harvestCode === ERR_NOT_IN_RANGE) {
					creep.moveTo(this.source);
				}
			}
		} else if (this.currentState === CurrentState.FeedingSpawn) {
			if (creep.store[RESOURCE_ENERGY] === 0) {
				this.currentState = CurrentState.HarvestingEnergy;
			} else {
				const transferCode = creep.transfer(this.spawn, RESOURCE_ENERGY);

				// TODO: cached path
				if (transferCode === ERR_NOT_IN_RANGE) {
					creep.moveTo(this.spawn);
				}
			}
		}
	}
}