import type { MtgCard } from '@/types/mtg';

export async function fetchAnswers(
  setCode: string | null,
  manaValue: number | null,
  manaOpen: string | null
): Promise<MtgCard[]> {
  console.log('Fetching answers for set:', setCode, 'manaValue:', manaValue, 'manaOpen:', manaOpen);
  // Fetching answers for set: tla manaValue: 2 manaOpen: BB
  const query = `(t:instant or (o:flash -o:flashback)) set:${setCode} cmc<=${manaValue}`.trim();

  const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=cards`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch cards for set ${setCode}`);

  const data = await res.json();
  const answers: MtgCard[] = [];
  for (const card of data.data) {
    const cardCost = card.mana_cost.replaceAll('{', '').replaceAll('}', '').replaceAll('X', '');
    const cardCostArr = cardCost.split('');
    // ["1", "U"] 1 + Island
    const manaOpenArr = manaOpen?.toUpperCase().split('') || [];
    // ["B", "B"] Black + Black

    console.log(card.name);
    if (isCastable(manaOpenArr, cardCostArr)) {
      answers.push(card);
    }
  }
  // const answers: MtgCard[];
  console.log(answers);
  return answers;
}

function isCastable(manaOpen: string[], cardCost: string[]): boolean {
  for (let i = 0; i < cardCost.length; i++) {
    // looking for the first appearance of the cost in the open mana
    const toPayIdx = manaOpen.indexOf(cardCost[i]);
    //TODO(dhalden) consider implementing CheckForHybrid, here and consider two-brid/Phyrexian
    if (toPayIdx > -1) {
      cardCost.splice(i, 1);
      manaOpen.splice(toPayIdx, 1);
      i--;
    }
  }
  // if all costs have been paid by open mana, we're clear.
  console.log('Cost: ', cardCost);
  console.log('Open: ', manaOpen);
  if (cardCost.length == 0) {
    return true;
  } else if (cardCost.length == 1) {
    const genericCost = Number(cardCost[0]);
    console.log('genericCost: ', genericCost);
    // If remaining mana hasn't been reduced to a number, we can't cast it.
    if (isNaN(genericCost)) {
      return false;
      // if remaining mana is less than open mana, we CAN cast it.
    } else if (genericCost <= manaOpen.length) {
      return true;
      // if remaining mana is more than open mana, we can't cast it.
    } else {
      return false;
    }
  } // TODO(dhalden): Figure out how to deal with hybrid mana...
  return false;
}
