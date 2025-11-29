import type { MtgCard } from '@/types/mtg';

export async function fetchCardDataFromSet(setCode: string): Promise<MtgCard[]> {
  const res = await fetch(
    `https://api.scryfall.com/cards/search?order=set&q=e%3A${setCode}&unique=prints`
  );
  if (!res.ok) throw new Error(`Failed to fetch cards for set ${setCode}`);

  const data = await res.json();
  return data.data;
}
