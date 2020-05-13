import { CreepContract } from "resources/contracts/creep_contract";

interface ContractMap {
	creepContracts: Map<string, CreepContract>;
}

export class ContractManager {
	private creepContractMap: Map<string, CreepContract>;

	constructor() {
		const contractMapObj = this.createContractsFromMemory();
		this.creepContractMap = contractMapObj.creepContracts;
	}

	private createContractsFromMemory(): ContractMap {
		let creepContractMap: Map<string, CreepContract> = new Map();

		if (!Memory.contracts) {
			Memory.contracts = [];
		}

		for (let memory of Memory.contracts) {
			if (memory.kind === ContractKind.CreepContract) {
				const creepContract = CreepContract.deserialize(memory as CreepContractMemory);
				creepContractMap.set(memory.id, creepContract);
			} else {
				throw "Cannot deserialize this contract";
			}
		}

		return {
			creepContracts: creepContractMap
		}
	}

	public createCreepContract(body: Array<BodyPartConstant>): CreepContract {
		const contractId = global.idUtil.createId();
		const creepId = global.idUtil.createId();
		const creepContract = new CreepContract(contractId, body, null, creepId);
		this.creepContractMap.set(contractId, creepContract);
		return creepContract;
	}

	public getCreepContract(contractId: string): CreepContract | null {
		const contract = this.creepContractMap.get(contractId);
		if (!contract) {
			console.log("Attempting to get nonexistent creep contract with ID " + contractId);
			return null;
		}
		return contract;
		// if (this.creepContractMap.has(contractId)) {
		// 	return this.creepContractMap.get(contractId);
		// }
	}

	public serialize(): void {
		console.log('Serializing contracts');
		let memoryArray: Array<CreepContractMemory> = [];
		this.creepContractMap.forEach((mem, key) => memoryArray.push(mem.serialize()));
		console.log('Size of contract map: ' + memoryArray.length);
		Memory.contracts = memoryArray;
	}
}