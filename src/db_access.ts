const UPDATE_DESPITE_LOCK_TIME = 120000

function saveToDb(db: any, key: string, currentData: any) {
  return db.set(key, JSON.stringify(currentData));
}

async function getDb(db: any, key: string): Promise<any> {
  const dbData = await db.get(key);
  return JSON.parse(dbData);
}


async function acquireUpdateLock(lock: any, key: string) {
  return await lock.acquire([key + 'updateLock'], UPDATE_DESPITE_LOCK_TIME);
}

async function releaseUpdateLock(lock: any) {
  await lock.release().catch((error:any) => console.log("Couldn't release lock", error));
}

export { saveToDb, getDb, acquireUpdateLock, releaseUpdateLock }