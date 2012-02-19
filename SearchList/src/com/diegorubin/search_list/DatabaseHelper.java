package com.diegorubin.search_list;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseHelper extends SQLiteOpenHelper {

  /*
   * O construtor necessita do contexto da aplicação
   */
  public DatabaseHelper(Context context) {
    /* O primeiro argumento é o contexto da aplicacao
     * O segundo argumento é o nome do banco de dados
     * O terceiro é um pondeiro para manipulação de dados, 
     *   não precisaremos dele.
     * O quarto é a versão do banco de dados
     */
    super(context, "linguagens.sqlite", null, 1);
  }
  
  /*
   * Os métodos onCreate e onUpgrade precisam ser sobreescrito
   */
  @Override
  public void onCreate(SQLiteDatabase db) {
    db.execSQL("CREATE TABLE linguagens(" +
    		       "id INT AUTO_INCREMENT," +
    		       "nome VARCHAR(100)," +
    		       "descricao VARCHAR(200)," +
    		       "primary key(id));");
   
    ContentValues values = new ContentValues();
    
    /*
     * Inserindo os valores de exemplo em nosso
     * banco de dados.
     * 
     * É, estou sem muita imaginação :)
     */
    values.put("nome", "Ruby");
    values.put("descricao", "Sobre a linguagem Ruby");
    db.insert("linguagens", null, values);
    
    values.put("nome", "Python");
    values.put("descricao", "Sobre a linguagem Python");
    db.insert("linguagens", null, values);
    
    values.put("nome", "Perl");
    values.put("descricao", "Sobre a linguagem Perl");
    db.insert("linguagens", null, values);
    
    values.put("nome", "Lua");
    values.put("descricao", "Sobre a linguagem Lua");
    db.insert("linguagens", null, values);
  }
  
  @Override
  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    /*
     * Estamos criando a primeira versão do nosso banco de dados,
     * então não precisamos fazer nenhuma alteração neste método.
     * 
     */
  }
  
  public SQLiteDatabase getDatabase() {
    return this.getWritableDatabase();
  }
}
