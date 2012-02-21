package com.diegorubin.search_list;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

public class LinguagemDataSource {

  private SQLiteDatabase db;
  private DatabaseHelper helper;
  
  public LinguagemDataSource(Context context) {
    helper = new DatabaseHelper(context);
    db = helper.getDatabase();
  }
  
  /**
   * Filtrando as linguagens cadastradas no banco.
   * Este método será utilizado ao pressionar o botão de busca.
   */
  public List<JSONObject> filterByNome(String nome) {
    List<JSONObject> result = new ArrayList<JSONObject>();
    Cursor cursor = 
      db.query("linguagens", new String[]{"nome", "descricao"}, 
               "nome like '%" + nome + "%'",
               null, null, null, "nome ASC" /*ordenando pelo nome*/);

    cursor.moveToFirst();
    while(!cursor.isAfterLast()) {
      result.add(readRow(cursor));
      
      cursor.moveToNext();
    }
    
    cursor.close();
    return result;
  }
  
  /**
   * Recuperando todas a linguagens cadastradas no nosso
   * banco de dados.
   * Iremos retorna-los em List<JSONObject>, pois é o 
   * formato que o nosso adapter espera.
   */
  public List<JSONObject> allLinguagens() {
    List<JSONObject> result = new ArrayList<JSONObject>();
    
    // Iremos buscar todas as linguagens cadastradas no banco
    // As colunas que iremos selecionar serão nome e descricao
    // O objeto de retorno contém a referencias das linhas retornadas
    Cursor cursor = 
      db.query("linguagens", new String[]{"nome", "descricao"}, 
               null, /* buscaremos todas, nao precisamos de nenhuma condicao*/
               null, null, null, "nome ASC" /*ordenando pelo nome*/);
    
    cursor.moveToFirst();
    while(!cursor.isAfterLast()) {
      result.add(readRow(cursor));
      
      cursor.moveToNext();
    }
    
    cursor.close();
    return result;
  }
  
  /**
   * Método auxiliar para ler resultado da query
   */
  private JSONObject readRow(Cursor cursor) {
    JSONObject obj = new JSONObject();
    
    try{
      // As colunas são recuperadas na ordem que foram selecionadas
      obj.put("nome", cursor.getString(0));
      obj.put("descricao",cursor.getString(1));
    }catch (JSONException e) {
    }
    
    return obj;
  }
}
