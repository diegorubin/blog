# -*- coding: utf-8 -*-

import os
import sys

# Esse é o diretório padrão de extensions
# do inkscape no linux.
# Se estiver em outro sistema, como mac
# ou windows, eese diretorio deve ser
# trocado.
sys.path.append('/usr/share/inkscape/extensions')
import inkex
from simplestyle import *


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
                default="São os votos de", help="Mensagem personalizada")

    def effect(self):

        # Carregar elemento raiz do svg
        self.svg = self.document.getroot()

        # Criação de uma novo grupo que servirá de camada	
        self.layer = inkex.etree.SubElement(self.svg, 'g')
        self.layer.set(inkex.addNS('label', 'inkscape'), 'Mensagem')

        # Esse é o atributo que define o grupo como uma camada
        self.layer.set(inkex.addNS('groupmode', 'inkscape'), 'layer')

        self.create_message()


    def create_message(self):
        text_element = inkex.etree.Element(inkex.addNS('text', 'svg'))  
        
        # Cria um id unico para ser utilizado no elemento text
        textId = self.uniqueId('text')
        text_element.set('id', textId)

        # O texto fica em um element tspan, que fica dentro do element text
        tspan = inkex.etree.SubElement(text_element, 'tspan')
        tspanId = self.uniqueId('tspan')

        tspan.text = unicode(self.options.para) + ","
        # Indica que o span será uma nova linha
        tspan.set(inkex.addNS('role', 'sodipodi'), 'line')

        tspan = inkex.etree.SubElement(text_element, 'tspan')
        tspanId = self.uniqueId('tspan')

        tspan.text = unicode(self.options.mensagem, 'utf-8')
        tspan.set(inkex.addNS('role', 'sodipodi'), 'line')

        tspan = inkex.etree.SubElement(text_element, 'tspan')
        tspanId = self.uniqueId('tspan')

        tspan.text = unicode(self.options.de)
        tspan.set(inkex.addNS('role', 'sodipodi'), 'line')

        # Estido do texto
        style = {'font-size' : '58px', 'font-family' :'URW Chancery L',
                 '-inkscape-font-specification' : 'URW Chancery L Bold Italic',
                 'fill' : '#ff0000'}
        # Transformando o dict em uma string
        text_element.set('style', formatStyle(style))
        text_element.set('x', '362')
        text_element.set('y', '340')

        self.svg.append(text_element)

c = C()
c.affect()

