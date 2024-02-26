import { Flashcard, FlashcardFrequency } from "./types";

/**
 * Adds a flashcard to the most frequent flash card bin to be studied.
 * 
 * @param flashcardBins Map of study frequency to flashcards
 * @param newFlashcard Flashcard to add to the most frequent bin
 * @returns Updated map of flashcard bins with the new flashcard added
 */
export function addFlashcardToBin(flashcardBins: Map<number, Flashcard[]>, newFlashcard: Flashcard): Map<number, Flashcard[]>{
    let updatedFlashcards = flashcardBins.has(FlashcardFrequency[0])? flashcardBins.get(FlashcardFrequency[0]).concat(newFlashcard) : [newFlashcard];
    return flashcardBins.set(FlashcardFrequency[0], updatedFlashcards);
}

/**
 * Removes the flashcard with the given id from the flashcard bins.
 * 
 * @param flashcardBins Map of study frequency to flashcards
 * @param idToRemove ID of flashcard to remove
 */
export function removeFlashcard(flashcardBins: Map<number, Flashcard[]>, idToRemove: number): Map<number, Flashcard[]>{
    let updatedFlashcards = flashcardBins;
    updatedFlashcards.forEach((flashCards: Flashcard[], freq: number) => {
        updatedFlashcards.set(freq, flashCards.filter((card: Flashcard) => card.key !== idToRemove));
    });
    return updatedFlashcards;
}

/**
 * Move the card to a new bin based on the given moveIndex to shift the card by. 
 * If the card cannot be moved in the given direction, it will remain in the same bin.
 * 
 * @param flashcardBins Map of study frequency to flashcards
 * @param card Flashcard to move
 * @param moveIndex Amount of bins to shift the card by
 * 
 * @returns Updated map of flashcard bins
 */
export function moveCard(flashcardBins: Map<number, Flashcard[]>, card: Flashcard, moveIndex: number): Map<number, Flashcard[]>{
    let updatedFlashcards = flashcardBins;

    // Set the start and end index based on the move direction
    const startIndex = moveIndex > 0? 0 : -moveIndex;
    const endIndex = moveIndex > 0? FlashcardFrequency.length - moveIndex : FlashcardFrequency.length;
    for (let i = startIndex; i < endIndex; i++){
        const currentIndex = FlashcardFrequency[i];
        const targetIndex = FlashcardFrequency[i + moveIndex];
        const currentBin = flashcardBins.get(currentIndex)

        if (currentBin.includes(card)){
            // Remove the card from the current bin and add it to the target bin
            updatedFlashcards.set(currentIndex, currentBin.filter((c: Flashcard) => c.key !== card.key));
            updatedFlashcards.set(targetIndex, updatedFlashcards.has(targetIndex)? 
                                    updatedFlashcards.get(targetIndex).concat(card) : [card]);
            break;
        }
    }
    return updatedFlashcards;
}

/**
 * Create a list of cards that should be studied today
 * 
 * @param flashcardBins Map of study frequency to flashcards
 * @param today Current day
 * @returns List of cards to study
 */
export function studyList(flashcardBins: Map<number, Flashcard[]>, today: Date): Flashcard[] {
    let toStudy = [];
    flashcardBins.forEach((flashcards: Flashcard[], freq: number) => {
        flashcards.forEach((card: Flashcard) => {
            if (card.date.getDate() == today.getDate() || card.date.getDate() - today.getDate() >= freq) {
                toStudy = toStudy.concat(card);
            }
        });
    });
    return toStudy;
}