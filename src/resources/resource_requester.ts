import { Contract } from "resources/contract";
import { CreepContract } from "resources/contracts/creep_contract";


export class ResourceRequester {
	private contracts: Array<Contract>;
	private spawns: Array<StructureSpawn>;

	constructor(spawns: StructureSpawn[], contracts: Array<Contract>) {
		this.contracts = contracts;
		this.spawns = spawns;
	}

	public static fromSpawn(spawn: StructureSpawn): ResourceRequester {
		return new ResourceRequester([spawn], []);
	}

	public requestCreep(body:Array<BodyPartConstant>, priority: number): CreepContract {
		let creepContract = new CreepContract(global.idUtil.createId(), null);
		this.contracts.push(creepContract);
		return creepContract;
	}
}