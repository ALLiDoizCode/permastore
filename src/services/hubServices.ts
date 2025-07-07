import type { JWKInterface } from "arweave/node/lib/wallet.js";
import { event, fetchEvents } from "../utils/relay";
import type { Tag } from "../types/Tag";

export interface HubService {
  createEvent: (
    signer: JWKInterface,
    hubId: string,
    tags: Tag[],
    data?: string,
  ) => Promise<Record<string, unknown>[]>;
  fetch: (hubId: string, since: string, kinds: string[],) => Promise<Array<Record<string, unknown>>>;
  get: (hubId: string, id: string, kinds: string[],) => Promise<Record<string, unknown>>;
  search: (
    hubId: string,
    value: string,
    kinds: string[],
  ) => Promise<Array<Record<string, unknown>>>;
}
//search
const service = (): HubService => {
  return {
    createEvent: async (
      signer: JWKInterface,
      hubId: string,
      tags: Tag[],
      data?: string,
    ): Promise<Record<string, unknown>[]> => {
      try {
        await event(signer, hubId, tags, data);
        return tags;
      } catch {
        return tags;
      }
    },
    fetch: async (hubId: string, since: string, kinds: string[],): Promise<Array<Record<string, unknown>>> => {
      const filter = {
        kinds: kinds,
        limit: 100,
        since: since
      };
      const _filters = JSON.stringify([filter]);
      try {
        return await fetchEvents(hubId, _filters);
      } catch {
        return [filter];
      }
    },
    get: async (
      hubId: string,
      id: string,
      kinds: string[],
    ): Promise<Record<string, unknown>> => {
      const filter = {
        ids: [id],
        kinds: kinds,
        limit: 1, // Only need one result for get operation
      };
      const _filters = JSON.stringify([filter]);
      const _events = await fetchEvents(hubId, _filters);
      if (_events.length == 0) throw "Not Found";
      return _events[0];
    },
    search: async (
      hubId: string,
      value: string,
      kinds: string[],
    ): Promise<Array<Record<string, unknown>>> => {
      const filter = {
        kinds: kinds,
        limit: 100, // Default limit as per VIP-01
        search: value,
      };
      const _filters = JSON.stringify([filter]);

      try {
        return await fetchEvents(hubId, _filters);
      } catch {
        // Error fetching events - silent for MCP compatibility
        return [filter];
      }
    },
  };
};

/*function memoryFactory(event: Record<string, unknown>): Memory {
  const memory: Memory = {
    content: event.Content as string,
    id: event.Id as string,
    p: event.p as string,
    role: event.r as string,
    timestamp: event.Timestamp as string,
  };
  return memory;
}*/

export const hubService = service();