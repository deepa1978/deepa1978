const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the game speed
const gameSpeed = 10000; // milliseconds per move

// Create the snake
const snake = [
  { x: 10, y: 10 },
  { x: 11, y: 10 },
  { x: 12, y: 10 },
];

// Create the food
const food = {
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
};

// Draw the game
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the snake
  ctx.fillStyle = 'green';
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });

  // Draw the food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);
}

// Update the game
function update() {
  // Move the snake
  const head = snake[0];
  const newHead = {
    x: head.x + (head.dx || 0),
    y: head.y + (head.dy || 0),
  };

  // Check if the snake has eaten the food
  if (newHead.x === food.x && newHead.y === food.y) {
    // Grow the snake
    snake.push({ x: newHead.x, y: newHead.y });

    // Create new food
    food.x = Math.random() * canvas.width;
    food.y = Math.random() * canvas.height;
  }

  // Check if the snake has hit itself or a wall
  if (
    newHead.x < 0 ||
    newHead.x >= canvas.width ||
    newHead.y < 0 ||
    newHead.y >= canvas.height ||
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    // Game over
    alert('Game over!');
    return;
  }

  // Update the snake's position
  snake.unshift(newHead);
  snake.pop();
}

// Start the game loop
setInterval(update, gameSpeed);

// Draw the initial game state
draw();