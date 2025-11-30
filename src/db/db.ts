import { Dexie, type EntityTable } from 'dexie';
import type { MtgCard } from '@/types/mtg';

const db = new Dexie('MtgFlashcardsDB') as Dexie & {
  cards: EntityTable<MtgCard, 'id'>;
};

db.version(1).stores({
  cards: 'id, name, set, type_line, oracle_text, mana_cost, rarity',
});

export { db };
