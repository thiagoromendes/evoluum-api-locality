import NodeCache from 'node-cache';

const cache = new NodeCache();

export function setCache<Obj>(key:string, value: Obj, ttl = 3600): boolean {
    return cache.set(key,value,ttl);
}

export function getCache<Obj>(key:string): Obj | undefined {
    return cache.get<Obj>(key);
}