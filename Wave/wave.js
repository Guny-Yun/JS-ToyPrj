import { Point } from './point.js';

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = []; // 추가
        // this.numberOfPoints = 6; // 추가
    }
    // constructor(color) {
    //     this.color = color;
    //     this.points = []; // 추가
    //     this.numberOfPoints = 6; // 추가
    // }
    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        /* 중간을 각각 넓이, 높이를 2로 나눈 값 지정 */
        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        /* 추가 : 각 점의 간격을 전체넓이 / 점개수 -1  */
        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }
    init() {
        /* 하나의 점 만들기 */
        // this.point = new Point(this.centerX, this.centerY);
        this.points = [];
        /* 추가 : 여러개의 점 */
        for (let i = 0; i < this.totalPoints; i++) {
            // this.points[i] = new Point(i, this.pointGap * i, this.centerY);
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY,
            );
            this.points[i] = point;
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        // /* 원 그리기 */
        // ctx.arc(this.points[i].x, this.points[i].y, 30, 0, 2 * Math.PI);

        /* 직선모양의 꿀렁꿀렁 */
        // ctx.moveTo(this.points[0].x, this.points[0].y);

        /* 곡선 모양의 꿀렁꿀렁 */
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.totalPoints; i++) {
            /* 직선 파도 */
            // ctx.lineTo(this.points[i].x, this.points[i].y);

            // if (i != 0 && i != this.numberOfPoints - 1) {
            //     this.points[i].update();
            // }

            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            /* 곡선 파도 */
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;

            // if (i != 0 && i != this.numberOfPoints - 1) {
            //     this.points[i].update();
            // }
        }
        /* 붓을 오른쪽 모서리부터 왼쪽 모서리 그리고 첫번째 점 위치까지 옮기면서 색칠 */
        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(0, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.points[0].y);

        /* 색 채우기 */
        ctx.fill();
        ctx.closePath();

        /* 위치 변경 */
        // this.point.update();

        // /* 위치 변경 추가 */
        // if (i != 0 && i != this.numberOfPoints - 1) {
        //     this.points[i].update();
        // }

    }
}