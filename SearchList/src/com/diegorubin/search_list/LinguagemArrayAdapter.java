package com.diegorubin.search_list;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

/*
 * Criaremos um ArrayAdapter para uma lista de objetos json.
 * Podemos criar um ArrayAdapter para qualquer tipo de objeto.
 * 
 */
public class LinguagemArrayAdapter extends ArrayAdapter<JSONObject> {
  private static final String tag = "LinguagemArrayAdapter";
  private Context context;
  private String directory;

  // Elementos de cada linha da lista
  private TextView txtLinguagem;
  private TextView txtDescricao;
  
  private List<JSONObject> elements = new ArrayList<JSONObject>();

  public LinguagemArrayAdapter(Context context, int textViewResourceId,
      List<JSONObject> objects) {
    super(context, textViewResourceId, objects);
   
    // Salva o contexto da aplicação
    this.context = context;
    
    // Lista de elementos que serão utilizados para a contrução da lista
    this.elements = objects;
  }

  public int getCount() {
    return this.elements.size();
  }
  
  public JSONObject getItem(int index) {
    return this.elements.get(index);
  }
  
  /*
   * Setando os valores dos objetos em cada linha da lista
   */
  public View getView(int position, View convertView, ViewGroup parent) {
    View row = convertView;
    if (row == null) {
      LayoutInflater inflater = (LayoutInflater) this.getContext()
          .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
      
      // layout que será utilizado na criação de cada linha da lista
      row = inflater.inflate(R.layout.linguagem, parent, false);
    }

    // Get item
    JSONObject category = getItem(position);

    // Recuperando referencia dos elementos da interface
    txtLinguagem = (TextView) row.findViewById(R.id.txtLinguagem);
    txtDescricao = (TextView) row.findViewById(R.id.txtDescricao);
    
    // Setando valores
    txtLinguagem.setText(category.optString("nome", ""));
    txtDescricao.setText(category.optString("descricao", ""));
    
    return row;
  }
}
