import * as React from 'react';
import { useState } from 'react';
import {
  Box, Button,
  Heading,
  VStack, 
} from '@chakra-ui/react';

import { Flashcard } from './types'
import { FlashcardEntryForm } from './FlashcardEntryForm'
import { FlashcardListDisplay } from './FlashcardListDisplay'
import { FlashcardStudyDisplay } from './FlashcardStudyDisplay';
import { addFlashcardToBin, removeFlashcard } from './FlashcardBins';

export default function FlashcardApp () {
  // Create a map of flashcard bins mapping frequency to flashcards
  const [flashcardBins,setFlashcardBins] = useState(new Map());
  const [itemKey,setItemKey] = useState<number>(0);
  const [editMode, setEditMode] = useState(false);
  const [studyMode, setStudyMode] = useState(false);

  // Add flashcard to the most frequent bin when created by user
  function handleAdd (front:string, back:string) {
    if (front === '') {return}   // ignore blank button presses
    setFlashcardBins(addFlashcardToBin(flashcardBins, {front: front, back: back, date: new Date(), key: itemKey}));
    setItemKey(itemKey + 1);
  }

  // Remove flashcard from bins if deleted by user
  function handleDelete(targetKey:number) {
    setFlashcardBins(removeFlashcard(flashcardBins, targetKey));
  }

  // Create a button to toggle the flashcard editor
  function toggleFlashcardEditor(): JSX.Element {
    const onClick = () => setEditMode(!editMode) // toggle editing mode
    return (
      <VStack>
        <Box><Button bg='lightblue' type="submit" onClick={onClick} width={200}> Edit flashcards </Button>
        </Box>
        { editMode ? 
          <div>
            <FlashcardEntryForm onAdd={handleAdd}/>
            <FlashcardListDisplay bins={flashcardBins} onDelete={handleDelete}/>
          </div> 
        : null }
      </VStack>
    )
  }

  // Create a button to toggle the study mode
  function toggleStudyMode(): JSX.Element {
    const onClick = () => {
      setEditMode(!studyMode? false : editMode); // close the editor if opening study mode
      setStudyMode(!studyMode); // toggle study mode
    }
    return (
      <VStack>
        <Box><Button bg='lightblue' type="submit" onClick={onClick} width={200}> Study! </Button>
        </Box>
        { studyMode ? 
          <div>
            <FlashcardStudyDisplay bins={flashcardBins}/>
          </div> 
        : null }
      </VStack>
    )
  }

  return (
  <VStack>
    <Heading>Your Flashcards</Heading>
    {toggleFlashcardEditor()}
    {toggleStudyMode()}
  </VStack>
  )
}





