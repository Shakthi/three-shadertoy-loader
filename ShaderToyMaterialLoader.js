import * as THREE from 'three'
import ShaderToyMaterial from 'three-shadertoy-material'
import assert from 'assert'

export default class ShaderToyMaterialLoader extends THREE.FileLoader  {

    constructor(manager) {
        super(manager);
    }

    setAppKey(key){
        this.appKey = key;
    }

    appendKeyIfrequired(url){
        
        if(!url.includes("?key=")){
            url+=`?key=${this.appKey}`;
        }
        return url;
    }

    load(url, onLoad, onProgress , onError){
        url = this.appendKeyIfrequired(url);
        super.load(url,(data)=>{

            var parsed = this.parser(data);
            
            if(parsed.textures.length){
                var textureLoader = new THREE.TextureLoader(this.manager); 
                var threeTextures = parsed.textures.map((element)=>{
                    return textureLoader.load(element);
                })
            }

            var options = {};
            if(threeTextures && threeTextures.length){
                options.map = threeTextures;
            }

            onLoad(new ShaderToyMaterial(parsed.code,options));
             

        }, onProgress , onError);
    }

    parser(data){
        var object = JSON.parse(data);
        assert(object.Shader.ver == "0.1","Version mismatch");
        assert(object.Shader.renderpass.length == 1,"Multi pass shaders not supported");
        var firstpass = object.Shader.renderpass[0];

        var code = firstpass.code;
        
        var validchannels =firstpass.inputs.map(element => {
            assert(element.ctype=="texture","Only 2d texture supported");
            if(!element.src.startsWith("http"))
                element.src = "https://www.shadertoy.com"+element.src;
            return element;
        });

        validchannels = validchannels.sort((a,b)=>a.channel-b.channel);
        validchannels = validchannels.map(element=>element.src);

        return {code:code,textures:validchannels};
        
    }



}
