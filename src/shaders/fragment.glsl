varying vec2 vUv;
varying vec3 vColor;
varying vec3 vNormal;

void main(){
    float distUV = distance(vUv, vec2(0.5));

    gl_FragColor = vec4(vColor, 1.0);
    gl_FragColor = vec4(vNormal.z - 0.2, vNormal.y + 0.5, vNormal.x + 0.6, 1.0);

}