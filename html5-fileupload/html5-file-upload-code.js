// Criação da nossa "classe" de controle.
// Não entrarei neste detalhe aqui, mas por favor,
// se você ouvir alguém falar que javascript é uma
// linguagem orientada a objetos, no mínimo, não
// acredite nele. Javascript é uma linguagem prototipada.
// Essa maneira de programar javascript é uma preferencia
// minha. Prefiro este estilo a criar várias funções perdidas.
function FileFrame(fileArea, fileTitle) {
  var self = this;

  this.fileArea = fileArea;
  this.fileTitle = fileTitle;

  this.init = function() {
    // Registrando eventos de drag and drop
    self.fileArea.addEventListener("dragleave", self.dragHover, false);
    self.fileArea.addEventListener("dragover", self.dragHover, false);
    self.fileArea.addEventListener("drop", self.drop, false);
 
  };

  this.dragHover = function(e) {
    // Impede possíveis tratamentos dos arquivos
    // arrastados pelo navegador, por exemplo, exibir
    // o conteudo do mesmo.
    e.stopPropagation();  
    e.preventDefault();  

    // Quando o arquivo está sobre área alteramos o seu estilo
    self.fileArea.className = (e.type == "dragover" ? "hover" : "");  
  };

  this.drop = function(e) {
    self.dragHover(e);  

    // Volta um array com os arquivos arratados,
    // porém neste exemplo iremos tratar apenas
    // o primeiro arquivo
    self.file = e.dataTransfer.files[0];  
   
    self.fileTitle.innerHTML = self.file.name;


    self.read(self.file);
    
    // Neste ponto podemos implementar uma função para
    // enviar os arquivos via ajax.
    // Irei deixar um exemplo, qualquer dúvida eu peço
    // que utilize o sistema de comentários do site.
    /*
    for (var i = 0, f; f = self.files[i]; i++) {  
      self.sendFile(f);  
    }
    */
  };

  // Esse método irá ler o arquivo na memória,
  // depois iremos mostrá-lo no nosso frame
  this.read = function(file) {
    // Iremos ler apenas imagens nesse exemplo
    // e iremos exibi-lo no frame
    if (file.type.match('image.*')) {
      var reader = new FileReader();

      // Callback que será executado após a leitura do arquivo
      reader.onload = function(f) {
        self.fileArea.innerHTML = "";
        self.fileArea.setAttribute("style", "padding: 0px !important;");

        var img = document.createElement("img");
        img.setAttribute("src", f.target.result);
        img.setAttribute("height", "350");

        self.fileArea.appendChild(img);
      }

      // Irá ler o arquivo para ser acessado através de uma url
      reader.readAsDataURL(file);
    }
  }

  // Essa função pode ser utilizada como 
  this.sendFile = function(file) {

    // Criaremos um formulário
    var f = new FormData();
    // Passando o arquivo para o formulário
    f.append("file", file);

    var request = new XMLHttpRequest();
    request.open("POST", "", true);
    request.send(f);
    request.onreadystatechange=function(){
      // Término do envio do formulário
      if(request.readyState==4) {
      }
    }
  };

}

var area = document.getElementById("image-area");
var title = document.getElementById("title");

var fileFrameArea = new FileFrame(area, title);
fileFrameArea.init();
