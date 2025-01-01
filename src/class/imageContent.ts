interface ImageContentProps {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  zoomFactor: number;
  alpha: number;
}

export class ImageContent {
    private ctx: CanvasRenderingContext2D;
    private img: HTMLImageElement;
    private alpha: number;
    private padding: number;
    private scaleFactor: number;
    private scaledWidth: number;
    private scaledHeight: number;
    private x: number;
    private y: number;
    
    constructor({ ctx, canvas, zoomFactor, alpha }: ImageContentProps, img: HTMLImageElement) {
        this.padding = 70;
        this.ctx = ctx;
        this.img = img;
        this.alpha = alpha;
            

        // Calcular proporção de redimensionamento da imagem
        this.scaleFactor = Math.min((canvas.width - 2 * this.padding) / (img.width * zoomFactor), (canvas.height - 2 * this.padding) / (img.height * zoomFactor));

        this.scaledWidth = img.width * this.scaleFactor;
        this.scaledHeight = img.height * this.scaleFactor;

        this.x = (canvas.width - this.scaledWidth) / 2;
        this.y = (canvas.height - this.scaledHeight) / 2;
    };

    createImage(){
        this.ctx.globalAlpha = this.alpha;
        this.ctx.drawImage(this.img, this.x + this.padding, this.y + this.padding, this.scaledWidth - 2 * this.padding, this.scaledHeight - 2 * this.padding);
        this.ctx.globalAlpha = 1;
    };
}