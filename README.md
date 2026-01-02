# itau-serverless-modernization

## 📌 Visão Geral
Projeto de modernização de sistemas utilizando arquitetura serverless na AWS, desenvolvido como case técnico para a vaga Analista Engenharia TI Pleno.

O objetivo é demonstrar práticas reais de engenharia de software, cloud AWS, DevOps, observabilidade, segurança (SecOps) e Clean Architecture, alinhadas a ambientes corporativos críticos e altamente regulados.

---

## 🏗️ Arquitetura e Tecnologias

### Backend
- Linguagem: Python
- Arquitetura: Clean Architecture
- APIs: REST via API Gateway

### AWS
- Lambda
- API Gateway
- SQS / SNS
- DynamoDB
- RDS (PostgreSQL)
- S3

### Plataforma & Qualidade
- Infraestrutura como Código: Terraform
- CI/CD: GitHub Actions
- Observabilidade: Datadog
- Segurança: IAM Least Privilege, HTTPS, Secrets Manager, validações de entrada e SAST

---

## 🎯 Objetivos do Projeto
- Modernizar um sistema monolítico para arquitetura serverless
- Desenvolver APIs escaláveis, observáveis e seguras
- Implementar mensageria e processamento assíncrono
- Aplicar práticas de DevOps e SRE
- Demonstrar maturidade técnica em ambiente cloud corporativo

---

## 📂 Estrutura do Repositório
O projeto segue separação clara de responsabilidades, priorizando manutenibilidade, testabilidade e evolução contínua.

- /src – Código backend (domínio, casos de uso, adapters e interfaces)
- /frontend – Interface web simples para consumo das APIs
- /infra – Infraestrutura AWS via Terraform
- /docs – Documentação técnica e decisões arquiteturais

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18 ou superior
- Python 3.11 ou superior
- Docker
- AWS CLI configurado (para deploy em cloud)

### Backend (dependências locais)
O backend pode ser executado localmente utilizando Docker para dependências, como PostgreSQL.

Comando:
docker-compose up -d

As funções Lambda são projetadas para execução em AWS, mas seguem padrões compatíveis com testes e execução local via mocks e adapters.

---

## 🖥️ Front-end (UI simples)
Para tornar o case mais orientado a produto e facilitar a avaliação, este repositório inclui uma interface web simples para:

- Criar pagamentos
- Listar pagamentos e seus status
- Visualizar o processamento assíncrono (SQS)

Código localizado em: /frontend  
Documentação detalhada em: /frontend/README.md

### Rodar o front localmente
Comandos:
cd frontend
npm install
npm run dev

Configure a variável de ambiente VITE_API_BASE_URL apontando para a URL do API Gateway.

---

## 🔐 Segurança (SecOps)
Este projeto adota práticas de segurança desde o design, incluindo:
- Políticas IAM com menor privilégio
- Comunicação via HTTPS
- Uso de AWS Secrets Manager
- Validação de payloads
- Análises estáticas de segurança no pipeline CI (SAST)

Detalhes completos em: /docs/02_security.md

---

## 📊 Observabilidade
As aplicações são instrumentadas para:
- Logs estruturados
- Traces distribuídos
- Métricas customizadas (latência, erros, throughput)

Monitoramento centralizado via Datadog.

Detalhes em: /docs/03_observability_datadog.md

---

## 📈 Status
Em desenvolvimento contínuo — projeto evolutivo com foco em aprendizado e boas práticas de engenharia.
