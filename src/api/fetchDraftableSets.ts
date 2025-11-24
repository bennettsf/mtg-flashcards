import type { MtgSet } from '@/types/mtg';

export async function fetchDraftableSets(): Promise<MtgSet[]> {
  const res = await fetch('https://api.scryfall.com/sets');
  if (!res.ok) throw new Error('Failed to fetch MTG sets');

  const data = await res.json();

  // Filter draftable sets
  return data.data.filter(
    (set: MtgSet) =>
      (set.set_type === 'expansion' || set.set_type === 'core') && set.card_count > 120
  );
}
