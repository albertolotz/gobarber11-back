# Recuperação de senha

**RF** //requisitos funcionais
  - O usuário deve poder recuperar sua senha informando seu email;
  - O usuário deve receber um email com instruções de recuperação de senha;
  - O usuário deve poder resetar sua senha;

**RNF** // requisitos não funcionais, técnicos
  - Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
  - Utilizar amazon SES para envios em produção;
  - O envio de email deve acontecer em segundo plano (backgroud job);

**RNF** // regras de negócios
  - O link enviar por email para resetar a senha deve expirar em 2h;
  - O usuário precisa confirmar a senha antes de resetar sua senha;

# Atualização do perfil

**RF** //requisitos funcionais
  - O usuário deve poder atualizar seu nome, email e senha;


**RNF** // requisitos não funcionais, técnicos

NA

**RNF** // regras de negócios

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário precisa confirmar a nova senha;

# Painel de prestador

**RF** //requisitos funcionais
  - O usuário deve poder listar seus agendamentos de um dia específico;
  - O prestador deve receber uma notoficação sempre que houver novo agendamento;
  - O prestador deve poder visualizar as notificações não lidas.
**RNF** // requisitos não funcionais, técnicos
  - Os agendamentos do prestador em um dia pode ser armazenado em cache.
  - As noticiações do prestdor devem ser armazenadas no MongoDB.
  - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RNF** // regras de negócios
  - A notificação deve ter um status de lida ou não lida para controle do prestador.

# Agendamento de serviços

**RF** //requisitos funcionais
- O usuário deve poder listar todos prestadores de serviço cadastrado.
- O usuário deve poder listar os dias de um mês com pelo menos um horario disponivel de um prestador;
- O usuário deve poder listas horários disponíveis em um dia específico de um prestador.
- O usuário deve poder poder realizar um novo agendamento com um prestador.




**RNF** // requisitos não funcionais, técnicos

- A listagem de prestadores deve ser armazenada em cache;

**RNF** // regras de negócios

- Cada agendamento devi duar 1 hora;
- Os agendamentos devem estar disponiveis entre 8h às 18h (primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que á passou;
- O usuário não pode agendar um seviço para si próprio;




# Tamplate
**RF** //requisitos funcionais
  -
**RNF** // requisitos não funcionais, técnicos
  -

**RNF** // regras de negócios



