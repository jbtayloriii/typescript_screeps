import { Contract } from "resources/contract";
import { CreepContract } from "resources/contracts/creep_contract";


export class ResourceRequester {
	// TODO: separate out by the type of resource being requested
	private contracts: Array<CreepContract>;
	private spawns: Array<StructureSpawn>;

	constructor(spawns: StructureSpawn[], contracts: Array<CreepContract>) {
		this.contracts = contracts;
		this.spawns = spawns;
	}

	public static fromSpawn(spawn: StructureSpawn): ResourceRequester {
		return new ResourceRequester([spawn], []);
	}

	// TODO: add priorities
	public requestCreep(body:Array<BodyPartConstant>, priority: number): CreepContract {
		let creepContract = global.contractManager.createCreepContract(body);

		new CreepContract(global.idUtil.createId(), body, null, global.idUtil.createId());
		this.contracts.push(creepContract);
		return creepContract;
	}

	public processRequests(): void {
		// TODO: make this a priority queue, not FIFO
		// TODO: Make this more robust than using first spawn
		if (this.contracts.length === 0) {
			return;
		}
		const creepId = this.contracts[0].getCreepId();
		if (this.contracts.length > 0 && this.spawns.length > 0 && this.spawns[0].spawning === null) {
			if (this.spawns[0].spawnCreep(this.contracts[0].getBody(), creepId) === OK) {
				this.contracts.shift();
			}
		}

	}

	public static deserialize(mem: ResourceRequesterMemory): ResourceRequester {
		const spawns = mem.spawnIds.map(spawnId => Game.getObjectById(spawnId) as StructureSpawn);
		const contracts = mem.contractIds.map(contractId => global.contractManager.getCreepContract(contractId));
		return new ResourceRequester(spawns, contracts);
	} 

	public serialize(): ResourceRequesterMemory {
		return {
			contractIds: this.contracts.map(contract => contract.getId()),
			spawnIds: this.spawns.map(spawn => spawn.id),
		};
	}
}