# App 

Gympass style app.

## RFs (Requisito funcional)

- [] Deve ser possível se cadastrar
- [] Deve ser possível se autenticar
- [] Deve ser possível obter o perfil de um usuário logado
- [] Deve ser possível obter o numero de check-ins realizado pelo usuário
- [] Deve ser possível obter o usuário obter o histórico de check-ins
- [] Deve ser possível buscar academias próximas
- [] Deve ser possível buscar academias pelo nome
- [] Deve ser possível fazer o check-in na academia
- [] Deve ser possível validar um check-in de um usuário
- [] Deve ser possível cadastrar uma academia

## RN (Regras de Negócio)

- [] O usuário não pode se cadastrar com um email duplicado
- [] O usuário não pode fazer 2 check-ins no mesmo dia
- [] O usuário só pode faz check-in se estiver perto (100m) da academia
- [] O check-in só pode ser validado por administrador
- [] O cadastro de academias só pode ser feito por administradores

## RNF (Requisito não-funcional)

- [] A senha precisa ser criptografada
- [] Os dados da aplicação devem persistir em um banco PostgreSQL
- [] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [] O usuário deve ser identificado por um JWT (Json WebToken)