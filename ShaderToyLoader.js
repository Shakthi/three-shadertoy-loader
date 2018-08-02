import * as THREE from 'three'
import ShaderToyMaterial  from 'three-shadertoy-material'


class ShaderToyMaterialLoader extends THREE.Loader{

    constructor(manager){
        this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

    }

    setAppKey(key){
        this.appKey = key;
    }

	load( url, onLoad, onProgress, onError ) {

		//var materil = new ShaderToyMaterial();

		var loader = new THREE.FileLoader( this.manager );
		loader.setCrossOrigin( this.crossOrigin );
        
		
        loader.load("https://www.shadertoy.com/api/v1/shaders/XslyRH?key=Ndntwh", responce =>{
            debugger;
        }, onProgress, onError);
    }
}

ShaderToyMaterialLoader.prototype.crossOrigin =  'anonymous';

var l = new ShaderToyMaterialLoader();

l.load();

