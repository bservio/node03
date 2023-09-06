# App 

Gympass style app.

## RFs (Requisito funcional)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [] Deve ser possível obter o numero de check-ins realizado pelo usuário
- [] Deve ser possível obter o usuário obter o histórico de check-ins
- [] Deve ser possível buscar academias próximas
- [] Deve ser possível buscar academias pelo nome
- [x] Deve ser possível fazer o check-in na academia
- [] Deve ser possível validar um check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## RN (Regras de Negócio)

- [x] O usuário não pode se cadastrar com um email duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário só pode faz check-in se estiver perto (100m) da academia
- [] O check-in só pode ser validado por administrador
- [] O cadastro de academias só pode ser feito por administradores

## RNF (Requisito não-funcional)

- [x] A senha precisa ser criptografada
- [x] Os dados da aplicação devem persistir em um banco PostgreSQL
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [] O usuário deve ser identificado por um JWT (Json WebToken)