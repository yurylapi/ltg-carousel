import { Lightning } from 'wpe-lightning-sdk';

export default class HoleShader extends Lightning.shaders.WebGLDefaultShader {
  constructor(context) {
    super(context);
    this._position = { x: 0, y: 0, w: 0, h: 0 };
  }

  set position(v) {
    this._position = v;
    this.redraw();
  }

  setupUniforms(operation) {
    super.setupUniforms(operation);
    this._setUniform('left', this._position.x, this.gl.uniform1f);
    this._setUniform('right', this._position.x + this._position.w, this.gl.uniform1f);
    this._setUniform('top', this._position.y, this.gl.uniform1f);
    this._setUniform('bottom', this._position.y + this._position.h, this.gl.uniform1f);
  }

  useDefault() {
    return this._left === 0 && this._top === 0 && this._right === 0 && this._bottom === 0;
  }
}
HoleShader.vertexShaderSource = `
  #ifdef GL_ES
  precision lowp float;
  #endif
  attribute vec2 aVertexPosition;
  attribute vec2 aTextureCoord;
  attribute vec2 aNoiseTextureCoord;
  attribute vec4 aColor;
  uniform vec2 projection;
  varying vec2 vTextureCoord;
  varying vec4 vColor;
  void main(void){
    gl_Position = vec4(aVertexPosition.x * projection.x - 1.0, aVertexPosition.y * -abs(projection.y) + 1.0, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
    vColor = aColor;
    gl_Position.y = -sign(projection.y) * gl_Position.y;
  }
`;
HoleShader.fragmentShaderSource = `
  #ifdef GL_ES
  precision lowp float;
  #endif
  varying vec2 vTextureCoord;
  varying vec4 vColor;
  uniform sampler2D uSampler;
  uniform float left;
  uniform float right;
  uniform float bottom;
  uniform float top;
  void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord);
    if (gl_FragCoord.x > left && gl_FragCoord.x < right && gl_FragCoord.y > top && gl_FragCoord.y < bottom) {
      discard;
    } else {
      gl_FragColor = color * vColor;
    }
  }
`;
