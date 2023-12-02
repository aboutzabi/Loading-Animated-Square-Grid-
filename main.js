const loading = document.querySelector('.loading');
const canvas = document.querySelector('#square');
const ctx = canvas.getContext('2d');

const canvasGap = document.querySelector('#gap');
const ctxGap = canvasGap.getContext('2d');

let squareSize = 150;
const gap = 0;
const shadowColor = "rgba(0, 0, 0, 0.5)";
const shadowBlur = 10;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvasGap.width = window.innerWidth;
canvasGap.height = window.innerHeight;

const columns = Math.floor(canvasGap.width / (squareSize + gap));
const rows = Math.floor(canvasGap.height / (squareSize + gap));

const shuffledPositionsArray = [];

// Function to draw gap lines
const drawGapLines = (c, r) => {
    ctxGap.clearRect(0, 0, canvasGap.width, canvasGap.height);

    for (let i = 0; i <= r; i++) {
        for (let j = 0; j <= c; j++) {
            const  getGapPathX = j * (squareSize + gap);
            const  getGapPathY = i * (squareSize + gap);

            const lineWidth = 10;
            const lineHeight = squareSize + 10;
            const lineColor = 'black';

            ctxGap.fillStyle = lineColor;
            ctxGap.fillRect(getGapPathX + squareSize, getGapPathY, lineWidth, lineHeight);
            ctxGap.fillRect(getGapPathX, getGapPathY + squareSize, squareSize, lineWidth);
        }
    }
};

// Function to draw squares step by step
const drawStepByStep = (positions, step) => {
    if (step >= positions.length) {
        // Drawing animation completed, start the removal after a delay
        setTimeout(() => {
            removeStepByStep(shuffledPositionsArray, 0);
        }, 2000); // Adjust this delay time (in milliseconds) as needed
        return;
    } else {
        const [x, y] = positions[step];
        const randomValue = Math.random();
        if (randomValue < 0.3) {
            ctx.fillStyle = 'blue';
        } else {
            ctx.fillStyle = '#333';
        }
        ctx.shadowBlur = shadowBlur;
        ctx.shadowColor = shadowColor;
        ctx.fillRect(x, y, squareSize, squareSize);

        // Reset shadow properties
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        // Continue to the next step of the animation
        requestAnimationFrame(() => drawStepByStep(positions, step + 1));
    }
};

// Function to remove squares step by step
const removeStepByStep = (positions, step) => {
    if (step >= positions.length) {
        loading.style.opacity = 0
        }
     canvasGap.style.opacity = 0;
    const [x, y] = positions[step];
    
    ctx.clearRect(x, y, squareSize, squareSize);
    
    // Continue to the next step of the removal animation
    requestAnimationFrame(() => removeStepByStep(positions, step + 1));
};

// Main function to draw squares
const drawSquares = (c, r) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const positionsArray = [];
    for (let i = 0; i <= r; i++) {
        for (let j = 0; j <= c; j++) {
            const x = j * (squareSize + gap);
            const y = i * (squareSize + gap);
            positionsArray.push([x, y]);
        }
    }

    shuffledPositionsArray.length = 0; // Clear the array

    while (positionsArray.length > 0) {
        let randomIndex = Math.floor(Math.random() * positionsArray.length);
        shuffledPositionsArray.push(positionsArray[randomIndex]);
        positionsArray.splice(randomIndex, 1);
    }

    // Call the drawing animation with the shuffled positions array and start at step 0
    drawStepByStep(shuffledPositionsArray, 0);
};

// Initial draw
drawGapLines(columns, rows);
drawSquares(columns, rows);
