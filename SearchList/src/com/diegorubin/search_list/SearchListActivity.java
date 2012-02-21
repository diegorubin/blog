package com.diegorubin.search_list;

import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.app.SearchManager;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Toast;

public class SearchListActivity extends Activity {
  
    private ListView lstLinguagens;
    private List<JSONObject> linguagens;
    private LinguagemArrayAdapter adapter;
    private LinguagemDataSource source;
  
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        // Buscando o elemento Listview da nossa interface principal interface 
        lstLinguagens = (ListView) findViewById(R.id.lstLinguagens);
        
        source = new LinguagemDataSource(getApplicationContext());
        
        //Verifica se a activity foi chamada através do callback de busca 
        Intent intent = getIntent();
        if (Intent.ACTION_SEARCH.equals(intent.getAction())) {
          String query = intent.getStringExtra(SearchManager.QUERY);
          
          // Recupera do banco as informações filtradas
          linguagens = source.filterByNome(query);
          
        } else {
        
          // Recupera do banco as informações que serão uitlizados em nosso adapter
          linguagens = source.allLinguagens();
        }         
        
        // Passamos a lista de exemplo para gerar nosso adpater
        adapter = new LinguagemArrayAdapter(getApplicationContext(), R.layout.linguagem, linguagens);
        
        // Setando o adapter em nossa ListView
        lstLinguagens.setAdapter(adapter);
        
        // Setando callback ao selecionar um item da lista
        lstLinguagens.setOnItemClickListener(new OnItemClickListener() {
          
          public void onItemClick(AdapterView<?> parent, View view,
                                  int position, long id) {
            
            try{
              JSONObject linguagem = linguagens.get(position);
              String descricao = linguagem.getString("descricao");
              Toast.makeText(getApplicationContext(), descricao, 10000).show();
            }catch (JSONException e) {
            }
          }
          
        });
      
      }
}