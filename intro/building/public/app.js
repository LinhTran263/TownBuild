window.addEventListener('load',()=>{
    console.log("hellooo");
    drawHouse();
    let cursor = document.getElementById("cur");
    cursor.addEventListener('mouseenter', function (evt) {
        // console.log("plane");
        // console.log(evt.detail.intersectedEl.id);
        if (evt.detail.intersectedEl.id != undefined) {
            let text = document.getElementById(evt.detail.intersectedEl.id + "text");
            text.setAttribute('opacity', 1);}
    });

    cursor.addEventListener('mouseleave', function (evt) {
        // console.log("plane");
        // console.log(evt.detail.intersectedEl.id);
        if (evt.detail.intersectedEl.id != undefined) {
            let text = document.getElementById(evt.detail.intersectedEl.id + "text");
            text.setAttribute('opacity', 0);}
    });
    let rotateObj;
    let rotateText;
    let rotateMsg;
    cursor.addEventListener('click', (evt)=>{
        if (evt.detail.intersectedEl.id != undefined) {
            let obj = document.getElementById(evt.detail.intersectedEl.id);
            rotateObj = obj.getAttribute('rotation').y + 90;
            // console.log(rotate);
            obj.setAttribute('animation', "property: rotation; to: 0 " + rotateObj + " 0; dur: 1000");
            let text = document.getElementById(evt.detail.intersectedEl.id + "text");
            rotateText = text.getAttribute('rotation').y + 90;
            text.setAttribute('animation', "property: rotation; to: 0 " + rotateText + " 0; dur: 1000");        
            
            let msg = document.getElementById(evt.detail.intersectedEl.id + "msg");
            rotateMsg = text.getAttribute('rotation').y + 90;
            msg.setAttribute('animation', "property: rotation; to: 0 " + rotateMsg + " 0; dur: 1000");          

        }
    })
})

function drawHouse(){
    fetch("/houses")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let allHouse = data.data;
        
        allHouse.forEach((house) => {
            let asset = document.getElementById("scene_asset");
    
            let text = document.createElement('a-text');
            text.setAttribute('height', '50');
            text.setAttribute('width', '50');
            text.setAttribute('align', 'center');
            text.setAttribute('position', {x:0, y:25, z:0.5});
            text.setAttribute('value', house.house.name);
            text.setAttribute('opacity', 0);
            text.id = house.house.type + house.house.name +"text";
            text.setAttribute('font', 'mozillavr');
    
            let msg = document.createElement('a-text');
            msg.setAttribute('value', house.house.msg);
            msg.setAttribute('align', 'center');
            msg.setAttribute('height', '50');
            msg.setAttribute('width', '50');
            msg.setAttribute('position', {x:0, y:30, z:0.5});
            msg.id = house.house.type  + house.house.name +"msg";
            msg.setAttribute('font', 'exo2bold');
            msg.setAttribute('color', house.house.msgColor);
    
            if (house.house.type == "#designhouse"){
                let asset = document.getElementById("scene_asset");
                let base = document.createElement('a-box');
                base.id = house.house.type;
                base.setAttribute('position', {x:house.posX * 20 - 120, y:0.5, z:house.posY * 20 - 100});
                base.setAttribute('height', 20);
                base.setAttribute('width', 10);
                base.setAttribute('depth', 10);
                base.setAttribute('color', house.house.baseColor);
                console.log(house);
                
                let roof = document.createElement('a-cone');
                roof.setAttribute('position', {x:0, y:15, z:0});
                // roof.setAttribute('scale', {x:100, y:1000, z:1000})
                roof.setAttribute('radius-bottom', 10);
                roof.setAttribute('height', 10);
                roof.setAttribute('color', house.house.roofColor);
    
                let door = document.createElement('a-box');
                door.setAttribute('position', {x:0, y:0, z:5});
                // roof.setAttribute('scale', {x:100, y:1000, z:1000})
                door.setAttribute('width', 3);
                door.setAttribute('height', 10);
                door.setAttribute('color', "#FFF");
                door.setAttribute('src', "#door")
    
    
                asset.appendChild(base);
                base.appendChild(roof);
                base.appendChild(door);
                base.appendChild(text);
                base.appendChild(msg);
    
                let winlst = ["-2 7 4.5","2 7 4.5","4.5 7 -2","4.5 7 2","-4.5 7 -2","-4.5 7 2"];
                for (let i = 0; i < winlst.length; i++) {
                    let window = document.createElement('a-box');
                    window.setAttribute('position', winlst[i]);
                    window.setAttribute('scale', {x:2, y:2, z:2})
                    window.setAttribute('color', "#FFF");
                    window.setAttribute('src', "#window");
                    base.appendChild(window);
                }
            }
    
    
            else{
                let item = document.createElement('a-entity');
                item.id = house.house.type + house.house.name;
                item.setAttribute('gltf-model', house.house.type);
                item.setAttribute('position', {x:house.posX * 20 - 100, y:0.5, z:house.posY * 20 - 80});
                if (house.house.type =="#slumhouse"){
                    item.setAttribute('scale', {x:1.5, y:1.5, z:1.5});
                    text.setAttribute('position', {x:0, y:6, z:0.5});
                    text.setAttribute('height', '20');
                    text.setAttribute('width', '20');
                    msg.setAttribute('height', '20');
                    msg.setAttribute('width', '20');
                    msg.setAttribute('position', {x:0, y:8, z:0.5});
                }
                else if (house.house.type == "#hauntedhouse"){
                    item.setAttribute('scale', {x:0.2, y:0.2, z:0.2});
                    text.setAttribute('position', {x:0, y:70, z:0.5});
                    text.setAttribute('height', '120');
                    text.setAttribute('width', '120');
                    msg.setAttribute('position', {x:0, y:80, z:0.5});
                    msg.setAttribute('height', '120');
                    msg.setAttribute('width', '120');
    
                }
                else if (house.house.type == "#redhouse"){
                    item.setAttribute('rotation', {x:0, y:-90, z:0});
                    // plane.setAttribute('position', {x:0, y:60, z:0});
                    text.setAttribute('position', {x:0, y:20, z:0.5});
                    text.setAttribute('height', '50');
                    text.setAttribute('width', '50');
                    text.setAttribute('rotation', {x:0, y:90, z:0});
    
                    msg.setAttribute('position', {x:0, y:25, z:0.5});
                    msg.setAttribute('height', '50');
                    msg.setAttribute('width', '50');
                    msg.setAttribute('rotation', {x:0, y:90, z:0});
    
                }
    
                asset.appendChild(item);
                item.appendChild(text);
                item.appendChild(msg);
            }
        })
    })
    
}
