package com.diegorubin.search_list;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
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
  
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        // Criação de uma lista quer será utilizada em nosso adapter
        linguagens = new ArrayList<JSONObject>();
        
        // Informações que serão utilizados no exemplo
        try {
          JSONObject ruby = new JSONObject();
          ruby.put("nome", "Ruby");
          ruby.put("descricao", "Sobre a linguagem Ruby");
          linguagens.add(ruby);
          
          JSONObject python = new JSONObject();
          python.put("nome", "Python");
          python.put("descricao", "Sobre a linguagem Python");
          linguagens.add(python);
          
          JSONObject perl = new JSONObject();
          perl.put("nome", "Perl");
          perl.put("descricao", "Sobre a linuguagem Perl");
          linguagens.add(perl);
          
        } catch (JSONException e) {
          // Tratando possivel exception ao adicionar informacoes no json
        }
        
        // Passamos a lista de exemplo para gerar nosso adpater
        adapter = new LinguagemArrayAdapter(getApplicationContext(), R.layout.linguagem, linguagens);
        
        // Buscando o elemento Listview da nossa interface principal interface 
        lstLinguagens = (ListView) findViewById(R.id.lstLinguagens);
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