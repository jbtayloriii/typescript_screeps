'use strict';

import {ErrorMapper} from "./utils/error_mapper";
import {ContractManager} from "./resources/contract_manager";

import { Headquarters } from "headquarters";
import { MemoryInitializer } from "./memory/memory_initializer";
// import { MemoryManager } from "memory/memory_manager";
import { IdUtil } from "./utils/id_util";
// import { RequestScheduler} from "./request_scheduler";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {


  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  // Map top level memory
  if (MemoryInitializer.shouldReboot()) { 
    MemoryInitializer.Initialize();
  }

  // Initialize global objects
  // if (!global.memoryManager) {
  //   console.log('-----Initializing Memory manager-----');
  //   global.memoryManager = new MemoryManager();
  // }

  if (!global.idUtil) {
    global.idUtil = new IdUtil(Memory.globalId);
  }

  if (!global.contractManager) {
    global.contractManager = new ContractManager();
  }

  // if (!global.requestScheduler) {
  //   global.requestScheduler = global.memoryManager.getSingletonRequestScheduler();
  // }
  if (!global.hq) {
    console.log('-----Initializing HQ-----');
    const headquarters = Headquarters.deserialize();
    global.hq = headquarters;
  }

  // Check world state
  global.hq.checkWorld();

  // Process requests
  // global.requestScheduler.processRequests();

  // Perform actions
  // global.hq.execute();

  // Serialize at end
  // global.memorySerializer.serializeObjects(global.hq);
  // global.memoryManager.serializeObjects();

  // if (Memory.debug.showOverlay) {
  //   // TODO: add visuals here
  // }

  // Serialize
  Memory.globalId = global.idUtil.currentId;

  console.log('----- Finishing tick -----');
});
