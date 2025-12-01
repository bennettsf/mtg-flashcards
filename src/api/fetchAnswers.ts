import type { MtgCard } from '@/types/mtg';

export async function fetchAnswers(
  setCode: string,
  manaValue: number,
  manaOpen: string, 
): Promise<MtgCard[]> {
  const query = `(t:instant or (o:flash -o:flashback)) set:${setCode} cmc<=${manaValue}`.trim();

  const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=cards`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch cards for set ${setCode}`);

  const data = await res.json();
  let answers: MtgCard[] = [];
  for(const card of data.data) {
    const cardCost = card.mana_cost.replaceAll("{", "").replaceAll("}", "").replaceAll("X", "");
    const cardCostArr = cardCost.split('');
    const manaOpenArr = manaOpen.toUpperCase().split('');
    if(isCastable(manaOpenArr, cardCostArr)) {
        answers.push(card)
    }
  }
  // const answers: MtgCard[];
  console.log(answers);
  return answers;
}

function isCastable(manaOpen: string[], cardCost: string[]): boolean {
    const filteredCosts = cardCost.filter(x => !manaOpen.includes(x));
    const filteredOpen = manaOpen.filter(x => !cardCost.includes(x));
    // if all costs have been paid by open mana, we're clear.
    if (filteredCosts.length == 0) {
        return true;
    } else if (filteredCosts.length == 1) {
        const genericCost = Number(filteredCosts[0]);
        // If remaining mana hasn't been reduced to a number, we can't cast it.
        if (isNaN(genericCost)) {
            return false;
        // if remaining mana is less than open mana, we CAN cast it.
        } else if (genericCost <= filteredOpen.length) {
            return true;
        // if remaining mana is more than open mana, we can't cast it.
        } else {
            return false;
        }
    } // TODO(dhalden): Figure out how to deal with hybrid mana...
    return false;
}
