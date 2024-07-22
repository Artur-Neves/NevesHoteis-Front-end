const campoCamera = document.querySelector("#imagemEscolhida");
const btnsFile = document.querySelector("[btnsFile]");
const btnTirarFoto = document.querySelector("#btnTirarFoto");
const imgPerfil = document.querySelector("[imgPerfil]");
const iconPerfil = document.getElementById("iconPerfil");
const btnIconX = document.querySelector(".btnExcluirImage")
// tem que de algum jeito passar o off canvas
const inputFiles = document.querySelector("#inputFile");
const canvas = document.querySelector("canvas");
let campoWrapper =null;
let campoCameraPai;
let imagemURL = "";
let iniciarFoto;
if(campoCamera){
campoCameraPai = campoCamera.parentElement;  }  

export async function pegarImagemPorCamera(){
   iniciarFoto = await navigator.mediaDevices
   .getUserMedia({video: true, audio: false});
   imgPerfil.classList.add("d-none");campoCameraPai.classList.add("d-none");
   canvas.classList.remove("d-none");
   canvas.classList.add("d-none");
   campoCamera.classList.remove("d-none");
   btnIconX.classList.add("d-none");
   campoCamera.srcObject = iniciarFoto;
   campoCameraPai.classList.remove("d-none");
   btnsFile.classList.add("d-none");
   btnTirarFoto.classList.remove("d-none")   
}

export function tirarFoto(){
   campoCameraPai.classList.add("d-none");
   canvas.classList.remove("d-none");
   let tracks = iniciarFoto.getTracks();
   tracks.forEach(track => track.stop());
   btnTirarFoto.classList.add("d-none");
   btnIconX.classList.remove("d-none");
   const width =  canvas.width-60
   const height = canvas.height+30
   canvas.getContext("2d").drawImage(campoCamera, 30, -17, width, height );
    btnsFile.classList.remove("d-none");
   imagemURL =canvas.toDataURL("image/jpeg").split(",")[1];
   mostrarImagem(imagemURL)
   return transformBase64InFile(imagemURL);
}


export function mostrarImagem(imgSrc) {
   campoWrapper = document.querySelector(".swiper-wrapper");
   resetImage();
   if (inputFiles.files.length === 1 ||  imgSrc) {
      imgPerfil.classList.remove("d-none");
      btnIconX.classList.remove("d-none");
      let url = (imgSrc) ? `data:image/jpg;base64, ${imgSrc}` : URL.createObjectURL(inputFiles.files[0]);
      iconPerfil.classList.add("d-none")
      imgPerfil.setAttribute("src", url);
      if(!imgSrc){
      return inputFiles.files[0];}  
      else{
         return transformBase64InFile(imgSrc)
      }
  }

}


export async function mostrarMultiplasImagens(campoFiles, images){
   campoWrapper = document.querySelector(".swiper-wrapper");
   const fotos=[];
   if( (campoWrapper.childElementCount+campoFiles.files.length)<=10){
      for (let index = 0; index < campoFiles.files.length; index++) {
         showMostrarMultiplasImagens(campoWrapper, URL.createObjectURL( campoFiles.files[index]), false)
         fotos[index] = campoFiles.files[index];
      }
      return fotos
   }
   else{
      window.alert("O número máximo de fotos por hotel é 10!");
   }
}

export function showMostrarMultiplasImagens(campoWrapper, url, base64){
   const index = campoWrapper.childElementCount;
   const base = base64 ?  "data:image/jpg;base64, " : "";
   campoWrapper.innerHTML+=`
   <div class="position-relative swiper-slide p-2" id="identificador-${index}">
                 <img src="${base}${url}" class='w-100'>   
                <span class="position-absolute btnExcluirImageHoteis translate-middle p-2 bg-danger border border-light rounded-circle">
                  <i class="bi bi-x-circle iconExcluirImage position-absolute" id="identificador-${index}"></i>
                </span>             
              </div>
  
   `

   if(base64)
   return transformBase64InFile(url)
}

function base64ParaArrayBuffer(base64) {
   var binaryString = window.atob(base64);
   var len = binaryString.length;
   var bytes = new Uint8Array(len);
   for (var i = 0; i < len; i++) {
       bytes[i] = binaryString.charCodeAt(i);
   }
   return bytes.buffer;
}


function transformBase64InFile(imagemURL){
   var arrayBuffer = base64ParaArrayBuffer(imagemURL);
var blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
return new File([blob], "imagem_convertida.png", { type: 'image/jpeg' });
}

export function resetImage(){
   if (canvas && !canvas.classList.contains("d-none")) {
      campoCameraPai.classList.remove("d-none");
      canvas.classList.add("d-none");
      campoCamera.classList.add("d-none");
  }
  imgPerfil.classList.add("d-none");
  iconPerfil.classList.remove("d-none")
  btnIconX.classList.add("d-none");
}