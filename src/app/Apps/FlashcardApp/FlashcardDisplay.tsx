import * as React from 'react';
import { useState } from 'react';
import {
  IconButton,
  Tr, Td,
} from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';

import { Flashcard } from './types'

export function FlashcardDisplay (props: {item: Flashcard, key:number, onDelete:(key:number) => void} ) {
    const [item, setItem] = useState(props.item)
  
    function handleDelete() {
      console.log('deleting:', item)
      props.onDelete(item.key)
    }
  
  // create a table with rows for each flashcard
  return (
    <Tr>
      <Td>{item.front}</Td>
      <Td>{item.back}</Td>
      <Td><ItemDeleteButton onClick={handleDelete} /></Td>
    </Tr>
  )
}
 
function ItemDeleteButton(props: { onClick: () => void }) {
  return (
    <IconButton aria-label='delete' icon={<AiOutlineDelete />} onClick={props.onClick} />
  )
}