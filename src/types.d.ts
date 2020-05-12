declare var global: any;

interface Memory {
  	current_memory_version: string;
	globalId: number;
	bases: { [baseId: string]: BaseMemory };
	contracts: Array<ContractMemory>;
	headquarters: HeadquartersMemory;
}

//
// Base Memory
//

const enum BaseKind {
	Unknown,
	StarterBase,
}

interface BaseMemory {
	kind: BaseKind;
}

interface StarterBaseMemory extends BaseMemory {
	resource_requester: ResourceRequesterMemory;
	tasks: TaskMemory[];
}

//
// Task Memory
//

const enum TaskKind {
	Unknown,
	BasicHarvestTask,
	BasicUpgradeTask,
}

interface TaskMemory {
	kind: TaskKind;
}

interface BasicHarvestTaskMemory {
	kind: TaskKind.BasicHarvestTask;
}

interface BasicUpgradeTaskMemory {
	kind: TaskKind.BasicUpgradeTask;
	contractId: string;
	currentState: number;
}

// Other uncategorized stuff

interface RoomMemory {
}

interface HeadquartersMemory {
	bases: { [baseId: string]: BaseMemory };
}

interface CreepContractMemory {
	id: string;
	creepId: string | null;
}