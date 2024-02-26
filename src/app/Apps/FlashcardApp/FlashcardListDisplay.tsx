import * as React from 'react';
import {
    Table, Th, Tbody, Tr,
} from '@chakra-ui/react';

import { Flashcard } from './types'
import { FlashcardDisplay } from './FlashcardDisplay'

// Create a table to display the flashcards
export function FlashcardListDisplay(props: { bins: Map<number, Flashcard[]>, onDelete:(key:number) => void }) {
  // Get all flashcards and sort from newest to oldest
  const flashcardList = Array.from(props.bins.values()).flat().sort((c1, c2) => c2.key - c1.key);
  return (
    <Table>      
      <Tbody>
      <Tr>
        <Th>Front</Th>
        <Th>Back</Th>
        <Th>Delete</Th>
      </Tr>
        {
          flashcardList.map((eachItem) => 
              <FlashcardDisplay item={eachItem} key={eachItem.key} onDelete={props.onDelete} />)
        }
      </Tbody>
    </Table>
  )
}




