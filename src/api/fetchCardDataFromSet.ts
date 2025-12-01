import type { MtgCard } from '@/types/mtg';

export async function fetchCardDataFromSet(
  setCode: string,
): Promise<MtgCard[]> {
  const query = `set:${setCode}`.trim();

  const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=cards`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch cards for set ${setCode}`);

  const data = await res.json();
  return data.data as MtgCard[];
}
