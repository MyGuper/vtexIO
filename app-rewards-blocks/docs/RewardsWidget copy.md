# RewardsWidget

## O que faz

O componente `RewardsWidget` é o widget principal de cashback da aplicação.

Ele controla:

- Abertura do popup de cashback
- Exibição do botão flutuante
- Experiência do usuário autenticado e não autenticado
- Navegação entre abas
- Integração com Rewards/Cashback

---

# Estrutura

O componente possui:

- `RewardsButton`
- `RewardsPopup`

---

# RewardsButton

## O que faz

Renderiza o botão flutuante:

```tsx
Mi Saldo
```

Ao clicar:

- Abre popup de cashback
- Alterna estado do modal

---

## Exemplo visual

```tsx
<button>
  Mi Saldo
</button>
```

---

# RewardsPopup

## O que faz

Renderiza o modal principal de cashback.

Possui dois fluxos:

- Usuário autenticado
- Usuário não autenticado

---

# Hooks utilizados

## useRewards()

Busca:

- Saldo cashback
- Informações financeiras do usuário

---

## useForm()

Busca:

- Schema do formulário dinâmico

---

## useRenderSession()

Busca:

- Sessão VTEX
- Dados do usuário logado

---

# Fluxo autenticado

Quando:

```tsx
isAuthenticated === true
```

O usuário visualiza:

- Saldo cashback
- Vigência
- Tabs
- Perfil
- Tutorial
- Formulário

---

# Tabs disponíveis

## Cashback

Exibe:

- Loja
- Valor disponível
- Vigência
- Informações de uso

---

## ¿Cómo usarlo?

Tutorial passo a passo:

1. Login
2. Carrinho
3. Aplicação cashback
4. Finalização da compra

---

## Mi perfil

Renderiza:

```tsx
<DynamicForm />
```

Com formulário dinâmico.

---

# Fluxo não autenticado

Quando o usuário não está logado:

```tsx
isAuthenticated === false
```

O popup exibe:

- Benefícios cashback
- Informações promocionais
- CTA de login
- Promoções
- Benefícios extras

---

# Benefícios exibidos

## Cashback online

```txt
20% em cada compra
```

---

## Cashback em loja

```txt
Até 600 MXN de bônus
```

---

## Promoções

- Benefício aniversário
- Pré-venda exclusiva

---

# Navegação

Utiliza:

```tsx
<Link to="/login" />
```

Para login VTEX.

---

# Controle do Popup

## Estado

```tsx
const [popupOpen, setPopupOpen]
```

---

## Abertura

```tsx
setPopupOpen(true)
```

---

## Fechamento

```tsx
setPopupOpen(false)
```

---

# O que pode ser configurado via CMS

Atualmente o componente não possui schema VTEX.

Mas poderia receber:

| Campo | Tipo | Objetivo |
|---|---|---|
| cashbackPercentage | string | Percentual cashback |
| storeBonus | string | Valor bônus |
| expirationDate | string | Vigência |
| tutorialSteps | array | Tutorial |
| promotionalImages | array | Imagens |
| loginText | string | CTA login |
| termsText | string | Texto termos |

# Exemplo de uso

```json
{
  "rewards-widget": {
    "props": {}
  }
}
```

---

# Possíveis usos

- Programa fidelidade
- Cashback
- Clube vantagens
- Área de benefícios
- Wallet virtual
- Experiência gamificada
