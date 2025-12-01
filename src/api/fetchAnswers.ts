import type { MtgCard } from '@/types/mtg';

export async function fetchAnswers(
  setCode: string,
  manaValue: number,
  manaCost: string, 
): Promise<MtgCard[]> {
  const query = `(t:instant or (o:flash -o:flashback)) set:${setCode} cmc<=${manaValue}`.trim();

  const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=prints`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch cards for set ${setCode}`);

  const data = await res.json();
  console.log(data)
  // return data.data as MtgCard[];
}
