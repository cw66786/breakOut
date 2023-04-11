import { Brick } from '../sprites/Brick';
import { Paddle } from '../sprites/Paddle';
import { Ball } from '../sprites/Ball';


export class CanvasView {
    canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private scoreDisplay: HTMLObjectElement | null;
    private startButton: HTMLObjectElement | null;
    private info: HTMLObjectElement | null;



    constructor(canvasName: string){
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        
    }
   
}