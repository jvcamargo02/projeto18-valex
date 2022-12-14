# projeto18-valex

# Rotas de criação e gerenciamento de cartões:

## Rota <span style="color:yellow"> **POST** </span>/new-card

Essa é uma rota autenticada com um header http do tipo "x-api-key". Sua função é criar novos cartões para os funcionários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "employeeId": "id_do_funcionario", //number
  "type": "tipo_do_cartão" //string
}
```

## Rota <span style="color:orange"> **POST** </span>/new-card/:id

Essa é uma rota não autenticada. Sua função é ativar os cartões criados.

O "id" passado na rota é o id do cartão criado na rota mencionada anteriormente.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "cvv": "cvc_do_cartao", //string
  "password": "senha_escolhida" //string
}
```

## Rota <span style="color:green"> **GET** </span>/card/:id

Essa é uma rota não autenticada. Sua função é verificar o extrato dos cartões.

O "id" passado na rota é o id do cartão criado.

A resposta da requisição virá no seguinte formato:

```json
"balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
```

## Rotas <span style="color:orange"> **PUT** </span>/card/:id/lock e /card/:id/unlock

Rotas não autenticadas, mesmo funcionamento, com o intuito de permitir ao usuário respectivamente bloquear e desbloquear um cartão.

O "id" passado na rota é o id do cartão criado.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "password": "senha_do_cartão" //string
}
```

# Rotas de compras e recarga:

## Rota <span style="color:yellow"> **POST** </span>/recharge/:id

Essa é uma rota autenticada com um header http do tipo "x-api-key". Sua função é recarregar os cartões para os funcionários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "amount": "valor_escolhido" //number
}
```

## Rota <span style="color:yellow"> **POST** </span>/purchase/:id

Essa é uma rota não autenticada. Sua função é permitir aos funcionários fazerem compras em estabelecimentos **do mesmo tipo** dos seus cartões.

O Body da requisição deve ser feito no seguinte formato:
```json
{
  "password": "senha_do_cartão", //string
  "companyId": "id_do_estabelecimento", //number
  "amount": "valor_da_compra" //number
}
```

## Rota <span style="color:yellow"> **POST** </span>/online-purchase/:id

Essa é uma rota não autenticada. Sua função é permitir aos funcionários fazerem compras *online* em estabelecimentos **do mesmo tipo** dos seus cartões.

O Body da requisição deve ser feito no seguinte formato:
```json
{
  "number": "numero_do_cartao", //string
  "cardholderName": "nome_impresso_no_cartao", //string
  "expirationDate": "MM/YY", //string
  "securityCode": "cvv", //string
  "companyId": "id_do_estabelecimento", //number
  "amount": "valor_da_compra" //number
}
```
