import * as React from 'react';
import { useState } from 'react';
import {
  Button, Box,
  FormControl,
  FormLabel,
  VStack, Tr, Td, Table, Tbody, TableContainer, HStack, Input
} from '@chakra-ui/react';

export function FlashcardEntryForm (props: {onAdd:(title:string, priority:string)=>void}) {
    // state variables for this form
    const [front,setFront] = useState<string>("")
    const [back,setBack] = useState("")
    const [key, setKey] = useState(1)     // key is assigned when the item is created.
  
    function handleClick(event) {
      event.preventDefault() 
      
      if (front === '') {return}   // ignore blank button presses
      props.onAdd(front, back)    // tell the parent about the new item
      setFront('')   // resetting the values redisplays the placeholder
      setBack('')   // resetting the values redisplays the placeholder
      setKey(key + 1)   // increment the key for the next item
    }
  
    return (    
      <VStack spacing={0} align='left'>
        <form>
          <FormControl>
            <VStack align='left' spacing={0}>
            <FormLabel as="b">Add a new flashcard here:</FormLabel>
            <HStack w='200' align='left'>
            
            <Input
              name="front"
              value={front}
              placeholder='type front of card here'
              onChange={(event => {
                setFront(event.target.value);
              })}
            />
            <Input
              name="back"
              value={back}
              placeholder= 'type back of card here'
              onChange={(event => setBack(event.target.value))}
            />
            <Box><Button bg='lightblue' type="submit" onClick={handleClick} width={200}> Add flashcard</Button>
            </Box>
            </HStack>
            </VStack>
          </FormControl>
          
                  
        </form>
      </VStack>
    )
  
  }

  //<Box h='4'></Box>
  