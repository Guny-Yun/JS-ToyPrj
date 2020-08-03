// import { Wave } from './wave.js';
import { WaveGroup } from './wavegroup.js';

class App {
    constructor() {
        /* 캔버스 엘리먼트 생성 */
        this.canvas = document.createElement('canvas');

        /* 그리기 함수 사용하기 위한 getContext 함수 */
        this.ctx = this.canvas.getContext('2d');

        /* 현재 html 문서 body에 캔버스 엘리먼트 추가 */
        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup();

        /* 사이즈 변할 때 대응하는 리스너 */
        window.addEventListener('resize', this.resize.bind(this), {
            once: false,
            passive: false,
            capture: false,
        });

        /* Wave 객체 생성 */
        // this.wave = new Wave();

        /* 초기 사이즈를 기준으로 resize 함수 실행 */
        this.resize();

        /* css로 처리하기 어려운 애니메이션이나 Canvas, SVG 등의 애니메이션 구현에 이용하는 함수 */
        requestAnimationFrame(this.animate.bind(this));
    }

    /* 사이즈가 변할 때 실행되는 콜백 */
    resize() {

        /* 레티나 디스플레이에서 올바른 화면을 보여주기 위해 설정 */
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        /* 캔버스의 크기를 스테이지의 2배로 잡음 */
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;

        /* 캔버스에서 1개의 픽셀이 차지할 크기 정함 */
        this.ctx.scale(2, 2);

        /* 웨이브에 리사이즈 적용 */
        this.waveGroup.resize(this.stageWidth, this.stageHeight);
    }

    /* 애니메이션 관련 루틴 정의 */
    animate(t) {

        /* 지정된 사각 영역을 rgba(0,0,0,0) 의 색상으로 */
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        /* 애니메이션이 실행되면 웨이브가 그려지도록 설정 */
        this.waveGroup.draw(this.ctx);

        /* this를 바인드한 채로 애니메이션 프레임 요청 */
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};