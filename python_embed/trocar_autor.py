def trocar(entrada,saida,exp,rep):
    texto = open(entrada,"r").read()
    texto_saida = texto.replace(exp,rep)
    
    arquivo_saida = open(saida,"w")
    arquivo_saida.write(texto_saida)

    return texto_saida
