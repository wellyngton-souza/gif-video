interface BackgroundColorProps {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
}
  
export class BackgroundColorContent {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    // Agora a classe recebe as propriedades com tipagem
    constructor({ ctx, canvas }: BackgroundColorProps) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    createBackground(): void {
        // Definir o fundo branco
        this.ctx.fillStyle = "#405";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
  