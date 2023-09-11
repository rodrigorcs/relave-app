import { useState } from 'react';

export const useSelection = (): [string[], (item: string) => void, (item: string) => void] => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const addToSelection = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems((prevSelected) => [...prevSelected, item]);
    }
  };

  const removeFromSelection = (item: string) => {
    setSelectedItems((prevSelected) => prevSelected.filter(id => id !== item));
  };

  return [selectedItems, addToSelection, removeFromSelection];
}