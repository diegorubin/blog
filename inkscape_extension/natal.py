# coding: utf-8

import os
import sys

# Esse é o diretório padrão de extensions
# do inkscape no linux.
# Se estiver em outro sistema, como mac
# ou windows, eese diretorio deve ser
# trocado.
sys.path.append('/usr/share/inkscape/extensions')
import inkex, copy


class C(inkex.Effect):
    def __init__(self):

        inkex.Effect.__init__(self)

        self.OptionParser.add_option("-d", "--de", action="store", 
                type="string", dest="de", 
                default="Fulano", help="Remetente da Mensagem")

        self.OptionParser.add_option("-p", "--para", action="store", 
                type="string", dest="para", 
                default="Destinatário", help="Destinatário da Mensagem")

        self.OptionParser.add_option("-m", "--mensagem", action="store", 
                type="string", dest="mensagem", 
                default="São os votos de", help="Destinatário da Mensagem")

    def effect(self):

	# Carregar elemento raiz do svg
        self.svg = self.document.getroot()

	# Criação de uma novo grupo que servirá de camada	
        self.layer = inkex.etree.SubElement(self.svg, 'g')
        self.layer.set(inkex.addNS('label', 'inkscape'), 'Mensagem')
        # Esse é o atributo que define o grupo como uma camada
        self.layer.set(inkex.addNS('groupmode', 'inkscape'), 'layer')


c = C()
c.affect()

