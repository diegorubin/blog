/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package listachamada;

import java.io.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import java.util.ArrayList;


/**
 *
 * @author diego
 */
public class ListaChamada {
    private String professor;
    private ArrayList<String> alunos;
    private String template;
    private String output;
    private File fTemplate;
    private boolean bTemplate = true;
    
    Document doc;
    
    public ListaChamada(){
        bTemplate = false;
    }
    
    public ListaChamada(String template){
        importTemplate(template);
    }
    
    public void setAlunos(ArrayList<String> alunos){
        this.alunos = alunos;
    }
    
    public void setProfessor(String professor){
        this.professor = professor;
    }
    
    public boolean templateOk(){
        return bTemplate && fTemplate.exists();
    }
    
    public boolean setTemplate(String template){
        importTemplate(template);
        
        return templateOk();
    }
    
    public void setOutput(String output){
        this.output = output;
    }
    
    public boolean saveOutput(){
        generateOutput();
        
        return templateOk();
    }
    
    private void importTemplate(String template){
                
        this.template = template;
        try{
            fTemplate = new File(template);
            bTemplate = true;
        }catch(Exception e){
            bTemplate = false;
        }
    }
    
    private String createPath(Integer x, Integer y, Integer distance){
        String path;
        distance += x;
        path = "M " +
               x.toString() + " "+
               y.toString() + " L "+
               distance.toString() + " " +
               y.toString() +" z";
        
        return path;
    }
    
    private void generateOutput(){
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        try{
            /*open template*/
            DocumentBuilder db = dbf.newDocumentBuilder();
            doc = db.parse(fTemplate);
            Element root = doc.getDocumentElement();
            
            /* setar variaveis */
            NodeList texts = root.getElementsByTagName("text");
            Node text;
            for(int i = 0; i <= texts.getLength()-1; i++){
                text = texts.item(i);
                if(text.getAttributes().getNamedItem("id").getTextContent().equals("professor")){
                    text.setTextContent(text.getTextContent() + professor);
                }
            }
            
            //inicio do retangulo x:40 y:164
            /* Criação de um novo layer para a listagem de alunos */
            Integer x = 45;
            Integer y = 185;
            
            Element layer = doc.createElement("g");
            layer.setAttribute("id", "layer_listagem");
            root.appendChild(layer);
            
            for(String aluno: alunos ){
                Element txtAluno = doc.createElement("text");
                txtAluno.setTextContent(aluno);
                txtAluno.setAttribute("style","font-size:16px;font-style:arial;font-weight:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:Sans");
                txtAluno.setAttribute("x", x.toString());
                txtAluno.setAttribute("y", y.toString());
                layer.appendChild(txtAluno);
                
                y += 10;
                
                Element pthAluno = doc.createElement("path");
                pthAluno.setAttribute("d",createPath(x-5, y, 669));
                pthAluno.setAttribute("stroke", "black");
                pthAluno.setAttribute("stroke-width","1");
                layer.appendChild(pthAluno);
                
                y += 20;
            }           
            
            /* gerando xml de saida */
            TransformerFactory transfac = TransformerFactory.newInstance();
            Transformer trans = transfac.newTransformer();
            trans.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            trans.setOutputProperty(OutputKeys.INDENT, "yes");

            /* criação da string */
            StringWriter sw = new StringWriter();
            StreamResult result = new StreamResult(sw);
            DOMSource source = new DOMSource(doc);
            trans.transform(source, result);
            String xmlString = sw.toString();

            /* arquivo de saida */
            File fOutput = new File(output);
            FileOutputStream saida = new FileOutputStream(fOutput);
            saida.write(xmlString.getBytes());
            
            saida.close();
        }catch(Exception e){
            e.printStackTrace();
            bTemplate = false;
        }
    }
}
