/**
 * Provides build-time access to the catalog's publisher list.
 *
 * This helper reads the canonical publisher rows from the local SQLite database
 * so Astro pages and filters stay aligned with the same source of truth used
 * during static generation.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Returns every publisher in the catalog, ordered alphabetically by name.
 *
 * @param db - Shared Drizzle database client used to query the local SQLite database.
 * @returns A list of publisher records sorted by `name` in ascending order.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({ id: row.id, name: row.name }));
}
