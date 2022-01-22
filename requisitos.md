# Cadastro de carro

**RF**
 - Deve ser possível cadastrar um carro

**RN**
  - Não deve ser possível cadastrar um carro com uma placa já existente.
  - O carro deve ser cadastrado, por padão, com disponibilidade.
  - Apenas usuário administrador pode cadastrar um carro.

# Listagem de carro

**RF**
  - Deve ser possível listar todos os carros disponíveis.
  - Deve ser possível disponíveis pelao nome da categoria.
  - Deve ser possível disponíveis pelao nome da marca.
  - Deve ser possível disponíveis pelao nome do carro.

**RN**
  - O usuário não precisa estar logado no sistema.

# Cadastro de especificação do carro

**RF**
  - Deve ser possível cadastrar uma especificação para um carro.

**RN**
  - Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
  - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
  - Apenas usuário administrador pode cadastrar uma especificação.

# Cadastro de imagem do carro

**RF**
  - Deve ser possível cadastrar a imagem do carro.

**RNF**
  - Utilizar o multer para upload dos arquivos.

**RN**
  - O usuário deve poder cadastrar mais de uma imagem par ao mesmo carro.
  - O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
  - Deve ser possível cadastrar um aluguel.
  
**RNF**
  - O aluguel deve ter duração mínima de 24 horas.
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto par o mesmo usuário
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto par o mesmo carro
  - O usuário deve estar logado na aplicação