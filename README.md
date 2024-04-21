                                                                 *****Instruções*****

1)utilize o seguinte link para fazer o download do NODE.JS: https://nodejs.org/en/download

2)inicie o CMD e use o comando "para entrar na pasta onde se encontram os itens desta atividade".

3)crie o diretório usando o seguinte comando: "npx create-react-app my-react-app".

4)entre na pasta criada no item anterior com "cd my-react-app".

5)ultilize o comando "npm start"

6)use este comando para definir o local da pasta onde a atividade se encontra: "npm config set prefix C:\path\to\desired\directory", substituindo as palavras "path", "to", "desired" e "directory"com o caminho da pasta.

7)instale o banco de dados JSON usando seguinte comando: npm install -g json-server

8)ultilize este comando para definir a porta localhost: npx json-server --watch db.json --port 3001

9)instale axios usando seguinte comando: "npm install axios" ou "yarn add axios" se preferir.

                                                                  *****Explicação*****

Link do canal do CHATGPT usado para auxilio na atividade: https://chat.openai.com/share/2c106dad-3e13-41b8-b53e-2b03349da352

A função readItems é responsável por ler todos os itens JSON encontrados no banco de dados e mostrando na tela para o usuário poder ver itens previamente inseridos, sendo chamada ao carregar a página.

A função createItem é responsável pela criação de novos elementos nos itens de acordo com os inputs do usuário, chamando a função readItems.

A função UpdateItem é responsável por editar elementos de acordo com os inputs prévios do usuário. Esta função deleta o item da lista mostrada na tela e preenche os campos do item nos inputs, possibilitando o usuário alterar estes valores, depois clicando no botão "salvar" para inserir o item editado na lista exibida na tela, após isso chamando a função readItems.

A função DeleteItem é responsável por deletar elementos de acordo com os inputs prévios do usuário, deletando o item usando o index dentro do array, chamando a função readItems após isso e atualizando a página.
