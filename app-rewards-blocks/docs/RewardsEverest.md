# RewardsEverest

## O que faz

O componente `RewardsEverest` exibe um popup/modal promocional com:

- Banner
- Overlay
- Formulário dinâmico
- Controle de exibição via cookie
- Mensagem de sucesso

O objetivo principal é:

- Captura de leads
- Cadastro promocional
- Programa de cashback/rewards
- Campanhas sazonais

---

# Hooks utilizados

## useForm()

Busca o schema do formulário dinamicamente.

Exemplo:

```tsx
const { data: formData } = useForm()
```

---

# Controle de abertura

O componente verifica:

- Se o formulário já foi enviado
- Se existe cookie salvo

---

# Controle por cookie

## Chave utilizada

```tsx
form_${formData.submissionKey}=true
```

---

# Fluxo

1. Componente carrega
2. Busca schema formulário
3. Verifica cookie
4. Caso usuário ainda não tenha enviado:
   - Popup abre
5. Usuário envia formulário
6. Popup fecha

---

# Controle de estado

## Estado do popup

```tsx
const [isOpen, setIsOpen]
```

---

# Abertura

Controlada automaticamente:

```tsx
setIsOpen(!alreadySubmitted)
```

---

# Fechamento

Feito via:

```tsx
setIsOpen(false)
```

---

# Estrutura visual

O componente renderiza:

- Overlay escuro
- Container modal
- Botão fechar
- Banner
- Formulário

---

# Banner

Imagem renderizada:

```tsx
<img alt="popup banner" src={imageUrl} />
```

---

# Formulário

Renderiza:

```tsx
<DynamicForm />
```

Com:

- Schema dinâmico
- Submit
- Fechamento automático

---

# Props disponíveis

| Prop | Tipo | Objetivo |
|---|---|---|
| imageUrl | string | Banner do popup |
| isEnabled | boolean | Ativa/desativa componente |
| sucessText | string | Mensagem sucesso |

---

# Schema VTEX

O componente possui schema VTEX configurado.

---

# Configurações disponíveis no CMS/Site Editor

## isEnabled

### Tipo

```json
boolean
```

### Objetivo

Ativar/desativar popup.

---

## sucessText

### Tipo

```json
string
```

### Objetivo

Mensagem após envio formulário.

---

## imageUrl

### Tipo

```json
string
```

### Widget

```json
image-uploader
```

### Objetivo

Upload do banner promocional.

---

# Exemplo VTEX

```json
{
  "RewardsEverest": {
    "props": {
      "isEnabled": true,
      "sucessText": "Cadastro realizado com sucesso!",
      "imageUrl": "https://cdn.site.com/banner.png"
    }
  }
}
```

---

# Exemplo de uso

```tsx
<RewardsEverest
  isEnabled={true}
  sucessText="Obrigado!"
  imageUrl="https://cdn.site.com/banner.png"
/>
```

---

# O que pode ser feito via CMS

## Alterar campanhas

Troca de:

- Banner
- Promoções
- Comunicação visual

Sem deploy.

---

## Ativar/desativar popup

Ideal para:

- Encerrar campanhas
- Eventos sazonais
- Black Friday
- Testes A/B

---

## Alterar mensagem de sucesso

Exemplo:

```txt
Obrigado por participar!
```

---

# Casos de uso

## Captação de leads

- Newsletter
- Cashback
- Fidelidade

---

## Promoções

- Cupons
- Sorteios
- Benefícios

---

## Cadastro usuário

- Perfil
- CRM
- Marketing

---
# Dependências

## DynamicForm

Responsável pelo formulário dinâmico.

---

## useForm

Busca schema backend.

---

#  arquitetura

```txt
RewardsEverest
    ↓
useForm()
    ↓
Busca schema
    ↓
DynamicForm
    ↓
Submit backend
    ↓
Cookie salvo
    ↓
Popup não abre novamente
```
