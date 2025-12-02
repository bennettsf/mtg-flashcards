import type { MtgCard } from '@/types/mtg';

interface CompareManaParams {
  manaOpen: string;
  possibleCards: MtgCard[];
}

export function compareMana({ manaOpen, possibleCards }: CompareManaParams): MtgCard | undefined {
  for (const card of possibleCards) {
    // Card Mana Cost looks like (e.g., "{2}{U}")
    // Need to convert to array of symbols: ["2", "U"]
    // Also need to handle costs like "{1}{B/G} // {4}{G/W}{G/W}"
    // check the type_line and match it with the correct mana_cost (e.g. split by " // " => "Instant // Sorcery")
    // they SHOULD match in index to mana_cost split by " // "
  }
}
