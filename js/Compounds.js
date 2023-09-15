AFRAME.registerComponent("atoms", {
  init:async function (){
    var compounds=await this.getCompounds()

    var barcode=Object.keys(compounds)
    barcode.map(barcode=>{
        var element = compounds[barcode]
        this.createAtoms(element)
    })

  },
  getCompounds: async function(){
        return fetch("js/compoundList.json")
        .then(res=>res.json())
        .then(data=>data)
},
elementColor: async function(){
    return fetch("js/elementColors.json")
    .then(res=>res.json())
        .then(data=>data)
},
createAtoms:async function(element){
    var elementName = element.element_name
    var barcodeValue=element.barcode_value
    var number_of_electrons=element.number_of_electrons

    var colors= await this.elementColor()
    // scene
    var scene=document.querySelector("a-scene")
    // marker
    var marker=document.createElement("a-marker")
    marker.setAttribute("id",`marker-${barcodeValue}`)
    marker.setAttribute("type","barcode")
    marker.setAttribute("element_name",elementName)
    marker.setAttribute("value",barcodeValue)

    scene.appendChild(marker)

    // atom
    var atom=document.createElement("a-entity")
    atom.setAttribute("id",`${elementName}-${barcodeValue}`)
    marker.appendChild(atom)

    var card=document.createElement("a-entity")
    card.setAttribute("id",`card-${elementName}`)
    card.setAttribute("geometry",{
        primitive:"plane",
        width:1,
        height:1
    })
    card.setAttribute("material",{
        src:`./assets/atom_cards/card_${elementName}.png`
    })

    card.setAttribute("position",{x:0,y:0,z:0})
    card.setAttribute("rotation",{x:-90,y:0,z:0})
    atom.appendChild(card)
    var nucleus=document.createElement("a-entity")
    nucleus.setAttribute("id",`nuclues-${elementName}`)
    nucleus.setAttribute("geometry",{
        primitive: "sphere",
        radius: 0.2,

    })
    nucleus.setAttribute("material",{
        color: colors[elementName]

    })
    nucleus.setAttribute("position",{x:0,y:1,z:0})
    nucleus.setAttribute("rotation",{x:0,y:0,z:0})
    atom.appendChild(nucleus)
    var watermelon = document.createElement("a-entity")
    watermelon.setAttribute("id",`watermelon-${elementName}`)
    watermelon.setAttribute("position",{x:0,y:0.1,z:-1})
    watermelon.setAttribute("rotation",{x:-90,y:0,z:0})
    watermelon.setAttribute("text",{
        font: "monoid",
        width: 3,
        color: "black",
        align: "center",
        value: elementName
    })
    nucleus.appendChild(watermelon)

    var orbitAngle= -180
    var electronAngle= 30
    for (var number = 1;number<=number_of_electrons;number++) {
        console.log(number)
        var orbit= document.createElement("a-entity")
        orbit.setAttribute("id",`orbit-${number}`)
        orbit.setAttribute("geometry",{
            primitive: "torus",
            radius: 0.28,
            arc: 360,
            radiusTubular: 0.001
        })
        orbit.setAttribute("material",{
            color: "black",
            opacity: 1
        })
        orbit.setAttribute("position",{x:0,y:1.2,z:0.1})
        orbit.setAttribute("rotation",{x:0,y:orbitAngle,z:0})
        orbitAngle+=45
        atom.appendChild(orbit)
        console.log(orbit)


        var electronGroup= document.createElement("a-entity")
        electronGroup.setAttribute("id",`electronGroup-${elementName}`)
        electronGroup.setAttribute("rotation",{x:0,y:0,z:electronAngle})
        electronAngle +=65
        electronGroup.setAttribute("animation",{
            property:"rotation",
            loop:"true",
            easing:"linear",
            dur:3500,
            to: `0 0 -360`
            
        })
        orbit.appendChild(electronGroup)
        
        var electron= document.createElement("a-entity")
        electron.setAttribute("id",`electron-${elementName}`)
        electron.setAttribute("geometry",{
            primitive: "sphere",
            radius: 0.02,
            
        })
        electron.setAttribute("material",{
            color: "red",
            opacity: 0.6
        


        })
        electron.setAttribute("position",{x:0.2,y:0.2,z:0})
        electron.setAttribute("rotation",{x:0,y:0,z:0})
        electronGroup.appendChild(electron)

    }
    
    
}

  
  
  
  
});
