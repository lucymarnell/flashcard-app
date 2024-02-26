export type Flashcard = {
    front: string; // the text on the front of the card
    back: string; // the text on the back of the card
    date: Date;
    key: number; // unique id
  };

// study frequency in days to create flashcard bins
export const FlashcardFrequency = [1, 7, 30, 365];