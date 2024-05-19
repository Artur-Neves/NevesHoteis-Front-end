const campoCamera = document.querySelector("#imagemEscolhida");
const btnsFile = document.querySelector("[btnsFile]");
const btnTirarFoto = document.querySelector("#btnTirarFoto");
const imgPerfil = document.querySelector("[imgPerfil]");
// tem que de algum jeito passar o off canvas
const inputFiles = document.querySelector("#inputFile");
let imagemURL = "";
inputFiles.addEventListener("change", mostrarImagem);
export async function pegarImagemPorCamera(canvas){
   imgPerfil.classList.add("d-none");
   canvas.classList.add("d-none");
   const iniciarFoto = await navigator.mediaDevices
   .getUserMedia({video: true, audio: false});
   let campoCameraPai = campoCamera.parentElement;    
 
   campoCamera.srcObject = iniciarFoto;
   campoCameraPai.classList.remove("d-none");
  
   btnsFile.classList.add("d-none");
   btnTirarFoto.classList.remove("d-none")
   btnTirarFoto.addEventListener("click", ()=>{tirarFoto(campoCamera,campoCameraPai,  canvas);
      let tracks = iniciarFoto.getTracks();
        tracks.forEach(track => track.stop());
   });
}

function tirarFoto(campoCamera,campoCameraPai , canvas){
   campoCameraPai.classList.add("d-none");
   canvas.classList.remove("d-none");
   btnTirarFoto.classList.add("d-none");
   canvas.getContext("2d").drawImage(campoCamera, -100, -20, canvas.width+180, canvas.height+30);
    btnsFile.classList.remove("d-none");
   imagemURL =canvas.toDataURL("image/jpeg");
}

function mostrarImagem(){
   //canvas.classList.add("d-none");
   if(inputFiles.files.length==1){
      console.log(inputFiles.files[0]);
      imgPerfil.classList.remove("d-none");
      let url = URL.createObjectURL(inputFiles.files[0]);
      imgPerfil.setAttribute("src", url);
   }
}
