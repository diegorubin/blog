/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package listachamada;

import junit.framework.TestCase;
import java.util.ArrayList;

/**
 *
 * @author drubin
 */
public class ListaChamadaTest extends TestCase {
    
    public ListaChamadaTest(String testName) {
        super(testName);
    }
    
    @Override
    protected void setUp() throws Exception {
        super.setUp();
    }
    
    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
    }

    /**
     * Test of templateOk method, of class ListaChamada.
     */
    public void testTemplateOk() {
        ListaChamada lista = new ListaChamada("test/listachamada/template.svg");
        assertTrue(lista.templateOk());

        
        lista = new ListaChamada();
        assertFalse(lista.templateOk());
        
        lista = new ListaChamada("um_arquivo_que_nunca_existira.svg");
        assertFalse(lista.templateOk());
        
        lista = new ListaChamada();
        lista.setTemplate("test/listachamada/template.svg");
        assertTrue(lista.templateOk());
    }
    
    public void testSaveOutput() {
        ListaChamada lista = new ListaChamada("test/listachamada/template.svg");
        lista.setOutput("test/listachamada/lista.svg");
        
        lista.setProfessor("Fernando da Silva");
        
        ArrayList<String> alguns_alunos = new ArrayList<String>();
        alguns_alunos.add("João da Silva");
        alguns_alunos.add("Maria de Souza");
        alguns_alunos.add("Fulano de Tal");
        
        lista.setAlunos(alguns_alunos);
        
        assertTrue(lista.saveOutput());
    }
}
