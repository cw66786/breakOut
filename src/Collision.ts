// for types
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import { Ball } from './sprites/Ball';
import { CanvasView } from './View/CanvasView';

export class Collision {
    //ball hits brick
    isCollidingBrick(ball: Ball, brick: Brick): boolean {
        if(
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.width > brick.pos.x &&
            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y + ball.height > brick.pos.y
        ){
            return true;
        }
        return false;
    }

    isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
        let colliding = false;
        
        bricks.forEach((brick, i)=>{
            if(this.isCollidingBrick(ball, brick)){

                ball.changeYDirection();

                
                        if(brick.energy === 1){
                            bricks.splice(i,1);
                        }else{
                            brick.energy -= 1;
                        }
                        colliding = true;
            }
            

            
        });
        return colliding;
    }

    //other collisions
    checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
        //ball hits paddle
        if(
            ball.pos.x + ball.width > paddle.pos.x &&
            ball.pos.x < paddle.pos.x + paddle.width &&
            ball.pos.y + ball.height === paddle.pos.y
        ){
            ball.changeYDirection();
        }
        //check ball collision with walls
        //x check
        if(ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0 ){
            ball.changeXDirection();
        }
        //y check
        if(ball.pos.y < 0 + ball.height){
            ball.changeYDirection();
        }
    }
}
