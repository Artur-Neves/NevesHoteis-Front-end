const campoCamera = document.querySelector("#imagemEscolhida");
const btnsFile = document.querySelector("[btnsFile]");
const btnTirarFoto = document.querySelector("#btnTirarFoto");
const imgPerfil = document.querySelector("[imgPerfil]");
// tem que de algum jeito passar o off canvas
const inputFiles = document.querySelector("#inputFile");
const canvas = document.querySelector("canvas");
let imagemURL = "";
if(campoCamera){
let campoCameraPai = campoCamera.parentElement;  }  
if(inputFiles){
inputFiles.addEventListener("change", mostrarImagem);
}
export async function pegarImagemPorCamera(){
   imgPerfil.classList.add("d-none");
   canvas.classList.add("d-none");
   const iniciarFoto = await navigator.mediaDevices
   .getUserMedia({video: true, audio: false});
   
 
   campoCamera.srcObject = iniciarFoto;
   campoCameraPai.classList.remove("d-none");
  
   btnsFile.classList.add("d-none");
   btnTirarFoto.classList.remove("d-none")
   btnTirarFoto.addEventListener("click", ()=>{tirarFoto();
      let tracks = iniciarFoto.getTracks();
        tracks.forEach(track => track.stop());
   });
}

function tirarFoto(){
   campoCameraPai.classList.add("d-none");
   canvas.classList.remove("d-none");
   btnTirarFoto.classList.add("d-none");
   canvas.getContext("2d").drawImage(campoCamera, -100, -20, canvas.width+180, canvas.height+30);
    btnsFile.classList.remove("d-none");
   imagemURL =canvas.toDataURL("image/jpeg");
}

export function mostrarImagem(){
   if( canvas && !canvas.classList.contains("d-none")){
   canvas.classList.add("d-none");
   campoCameraPai.classList.remove("d-none");}
   if(inputFiles.files.length==1){
      console.log(inputFiles.files[0]);
      imgPerfil.classList.remove("d-none");
      let url = URL.createObjectURL(inputFiles.files[0]);
      imgPerfil.setAttribute("src", url);
   }
}

export async function mostrarMultiplasImagens(campoFiles){
   let campoWrapper = document.querySelector(".swiper-wrapper");
   if( (campoWrapper.childElementCount+campoFiles.files.length)<=10){
    
      for (let index = 0; index < campoFiles.files.length; index++) {
         let url = URL.createObjectURL(campoFiles.files[index]);
         campoWrapper.innerHTML+=`
         <div class="swiper-slide"><img src='${url}' class='w-100'></div>
         `
      }
   }
   else{
      window.alert("O número máximo de fotos por hotel é 10!");
   }
}
