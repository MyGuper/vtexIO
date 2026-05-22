# RewardsTopBar

## O que faz

O componente `RewardsTopBar` exibe saldo cashback do usuário logado.

Pode ser utilizado:

- Header
- Barra superior
- Área cliente
- Navegação

---

# Hooks utilizados

## useRewards()

Busca:

- Cashback
- Saldo usuário

---

## useRenderSession()

Busca:

- Sessão VTEX
- E-mail usuário

---

# Comportamento

## Usuário logado

Exibe:

- Saldo cashback
- E-mail

---

## Usuário deslogado

Não renderiza nada:

```tsx
if(!email)
```

---

# Props

| Prop | Tipo | Objetivo |
|---|---|---|
| typeHeader | string | Layout header |

---

# Layouts

## Header

Quando:

```tsx
typeHeader
```

Texto:

```txt
Mi Cashback
```

---

## Default

Texto:

```txt
Mi Saldo Cashback
```

---

# Formatação monetária

Formato:

```tsx
es-MX
MXN
```

---

# Exemplo

```tsx
<RewardsTopBar typeHeader="header" />
```

---

# Exemplo VTEX

```json
{
  "rewards-top-bar": {
    "props": {
      "typeHeader": "header"
    }
  }
}
```

---

# O que pode ser configurado via CMS

Atualmente:

- typeHeader



Evitar:

```tsx
as any
```

---

# Possíveis usos

- Wallet
- Cashback
- Fidelidade
- Pontuação
- Créditos usuário
