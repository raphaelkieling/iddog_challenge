# IDWALL CHALLENGE

## Sobre
A aplicação foi feita utilizando:
- React
- Query-string
- React-modal
- React-router
- React-toastify
- Muicss

As tecnologias utilizas foram o menos possível para manter a produtividade e a qualidade. Já que pra que reinventar a roda? Muicss mesmo sendo muito útil ele acabou sendo utilizados apenas nos containers e formulários.

A base do feed de fotos foi feita com flexbox. O "lightbox" foi criado com o react-modal que adaptei para funcionar com a animação do animate.css e estilizei para parecer com um card do material pra manter o design.

O código final também foi adaptado um memoize baseado em promises que criei. Não fui atrás de libs ou código pronto, pois é algo simples e uma técnica utilizada de forma parecida em patterns pub,sub de forma pura. Um Map pra guardar os valores. 

> Lembrando que estou ciente que os dados podem ser modificados com o tempo e normalmente utiliza-se um _age_ pra determinar quanto tempo vai durar o armazenamento, mas como eu estava tendo problemas com a API caindo em alguns momentos e não são adicionadas imagens frequentementes, já está ótimo deste jeito.

```js
// Guarda as respostas referentes aos atributos
let memoise_map = new Map();

export const memoize_promise = (fn) => {
    return (...attr) => {
        // Verifica se está no Map, se estiver retorna um promisse com a resposta guardada
        if (memoise_map.has(...attr)) return new Promise((resolve) => resolve(memoise_map.get(...attr)));

        //Executa a função
        return fn.apply(this, attr)
            .then(res => {
                //coloca o valor que veio de uma API por exemplo no map, para caso seja chamado novamente já esteja disponível.
                memoise_map.set(...attr, res);
                return res;
            });
    };
};
```


## Quer dar uma olhada no cógido?

```sh
#Clonar o repositório
git clone https://github.com/raphaelkieling/iddog_challenge

#Instalar os pacotes
npm install

#Iniciar
npm start
```
