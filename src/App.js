import React, { useState, useEffect, useRef } from 'react';

const items = [
  { id: 1, label: 'A' },
  { id: 2, label: 'B' },
  { id: 3, label: 'C' },
  { id: 4, label: 'D' },
  // Add more items as needed
];

const MatchingGame = () => {
  const [shuffledItems, setShuffledItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [matchedItemIds, setMatchedItemIds] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Shuffle the items array and set it to state on component mount
    shuffleItems();
  }, []);

  useEffect(() => {
    // Draw lines after each render
    drawLines();
  });

  const shuffleItems = () => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledItems(shuffled);
  };

  const handleItemClick = (itemId) => {
    // Ignore clicks if the item is already matched or two items are already selected
    if (selectedItemIds.length === 2 || selectedItemIds.includes(itemId)) {
      return;
    }

    setSelectedItemIds((prev) => [...prev, itemId]);

    // Check for a match after a short delay (to allow the user to see the second selected item)
    if (selectedItemIds.length === 1) {
      setTimeout(() => checkForMatch(itemId), 500);
    }
  };

  const checkForMatch = (itemId) => {
    const [firstId, secondId] = selectedItemIds;
    if (shuffledItems[firstId - 1].label === shuffledItems[itemId - 1].label) {
      // Match found
      setMatchedItemIds((prev) => [...prev, firstId, itemId]);
      setSelectedItemIds([]);
    } else {
      // No match, reset selected items after a short delay (to allow the user to see the second selected item)
      setTimeout(() => setSelectedItemIds([]), 500);
    }
  };

  const drawLines = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (matchedItemIds.length >= 2) {
      // Draw lines for matched items
      const firstItem = shuffledItems[matchedItemIds[0] - 1];
      const secondItem = shuffledItems[matchedItemIds[1] - 1];

      const firstItemElement = document.getElementById(`item-${firstItem.id}`);
      const secondItemElement = document.getElementById(`item-${secondItem.id}`);

      const firstItemRect = firstItemElement.getBoundingClientRect();
      const secondItemRect = secondItemElement.getBoundingClientRect();

      const canvasRect = canvas.getBoundingClientRect();

      const startX = firstItemRect.left + firstItemRect.width / 2 - canvasRect.left;
      const startY = firstItemRect.top + firstItemRect.height / 2 - canvasRect.top;

      const endX = secondItemRect.left + secondItemRect.width / 2 - canvasRect.left;
      const endY = secondItemRect.top + secondItemRect.height / 2 - canvasRect.top;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  return (
    <div>
      <h1>Matching Game</h1>
      <div className="game-board">
        {shuffledItems.map((item) => (
          <div
            key={item.id}
            id={`item-${item.id}`}
            className={`game-item ${selectedItemIds.includes(item.id) ? 'selected' : ''} ${
              matchedItemIds.includes(item.id) ? 'matched' : ''
            }`}
            onClick={() => handleItemClick(item.id)}
          >
            {selectedItemIds.includes(item.id) || matchedItemIds.includes(item.id) ? item.label : '?'}
          </div>
        ))}
      </div>
      <canvas ref={canvasRef} className="game-canvas" />
    </div>
  );
};

export default MatchingGame;
