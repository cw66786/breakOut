import { CanvasView } from "./View/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";

//Images
 import PADDLE_IMAGE from './images/paddle.png'
 import BALL_IMAGE from './images/ball.png';

//level and colors 

import{
    //PADDLE
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    //BALL
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY

} from './setup';

//helpers
import { createBricks } from "./helpers";


// variables 

let gameOver = false;
let score = 0;


function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over');
    gameOver = false;
}

function setGameWin(view: CanvasView){
    view.drawInfo('Winner!');
    gameOver = false;

}



function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    // ball: Ball

){
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);

    //check paddle is in playField
    if(
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ){
        paddle.movePaddle();
    }

    requestAnimationFrame(()=> gameLoop(view, bricks, paddle));
}


function startGame(view: CanvasView){
    //reset display
    score = 0;
    view.drawInfo('');
    view.drawScore(0);

    //create bricks
    const bricks = createBricks();
    //create paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 10
        },
        PADDLE_IMAGE
    )
    gameLoop(view, bricks, paddle)
}


//creates new view
const view = new CanvasView('#playField');
view.initStartButton(startGame);