import * as React from 'react';
import { useState } from 'react';
import {
  VStack, HStack, Button
} from '@chakra-ui/react';

import { Flashcard } from './types'
import { moveCard } from './FlashcardBins';

const CARD_WIDTH = 500;
const CARD_HEIGHT = 300;

// Display a random flashcard
export function FlashcardStudyDisplay (props: { bins: Map<number, Flashcard[]>} ) {
    const flashcardList = Array.from(props.bins.values()).flat().sort((c1, c2) => c2.key - c1.key);

    // Pick a random card from props
    function pickRandomCard(): Flashcard {
        return flashcardList[Math.floor(Math.random() * flashcardList.length)];
    }

    const [card, setCard] = useState(pickRandomCard());
    const [cardSideUp, setCardSideUp] = useState(card.front);

    // Flip the card when clicked
    const onCardClick = () => {
        setCardSideUp(cardSideUp === card.front ? card.back : card.front);
    }

    const newCard = () => {
        setCard(pickRandomCard());
        setCardSideUp(card.front);
    }

    // When user clicks incorrect, move this card to the next less frequent bin 
    // if such a bin exists. Then, pick a new card.
    const onCorrect = () => {
        moveCard(props.bins, card, 1);
        newCard();
    }
    // When user clicks incorrect, move this card to the next more frequent bin 
    // if such a bin exists. Then, pick a new card.
    const onIncorrect = () => {
        moveCard(props.bins, card, -1);
        newCard();
    }
    
    return (
        <VStack>
            <Button bg='white' border='solid' type="submit" onClick={onCardClick} width={CARD_WIDTH} height={CARD_HEIGHT}> 
                {cardSideUp} 
            </Button>
            <HStack>
                <Button bg='lightgreen' type="submit" onClick={onCorrect} width={CARD_WIDTH / 2}></Button>
                <Button bg='lightpink' type="submit" onClick={onIncorrect} width={CARD_WIDTH / 2}></Button>
            </HStack>
        </VStack>
    )
}