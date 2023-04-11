import { Vector } from '../types';


export class Paddle {
    private paddleImage: HTMLImageElement = new Image();
    private moveLeft: boolean;
    private moveRight: boolean;

    constructor(
        private speed: number,
        private paddleWidth: number,
        private paddleHieght: number,
        private postition: Vector,
        image: string
    ){
        this.speed = speed;
        this.paddleWidth = paddleWidth;
        this.paddleHieght = paddleHieght;
        this.postition = postition;
        this.moveLeft = false;
        this.moveRight = false;
        this.paddleImage. src = image;

        //event listeners for movement
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }


    //getters for paddle

    get width(): number {
        return this.paddleWidth
    }

    get height(): number {
        return this.paddleHieght;
    }
    
    get pos(): Vector {
        return this.postition;
    }

    get image(): HTMLImageElement {
        return this.paddleImage;
    }

    get isMovingLeft(): boolean{
        return this.moveLeft;
    }

    get isMovingRight(): boolean {
        return this.moveRight;
    }

    //methods for paddle

    movePaddle(): void{
        if(this.moveLeft) this.pos.x -= this.speed;
        if(this.moveRight) this.pos.x += this.speed;
        
    }

    handleKeyUp = (event: KeyboardEvent): void => {
        if (event.code === 'ArrowLeft' || event.key === 'ArrowLeft') this.moveLeft = false;
        if (event.code === 'ArrowRight' || event.key === 'ArrowRight') this.moveRight = false;


    }
    
    handleKeyDown = (event: KeyboardEvent): void => {
        if (event.code === 'ArrowLeft' || event.key === 'ArrowLeft') this.moveLeft = true;
        if (event.code === 'ArrowRight' || event.key === 'ArrowRight') this.moveRight = true;


    }



}