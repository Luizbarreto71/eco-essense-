# Eco Essence — Loja de Perfumes (React + Supabase)

Projeto completo e responsivo com:
- Login/Registro via Supabase
- Catálogo com busca e filtros (masculino, feminino, árabe, importado, nacional)
- Cards modernos de produtos
- Carrinho simples (local)
- Calculadora de frete (stub com valores estimados, fácil trocar por API dos Correios ou transportadora)
- Painel **Administrador** para cadastrar produtos (nome, descrição, preço, imagem), com **código automático** (ECO-XXXXX)
- Dashboard de vendas (mais vendidos, sem vendas, total do mês etc.)
- SQL pronto com tabelas, RLS e *seed*

## 1) Como rodar

1. Crie um projeto no [Supabase](https://supabase.com).
2. No **SQL Editor** cole o conteúdo de `supabase.sql` e execute.
3. Em **Storage**, crie um bucket público chamado `product-images`.
4. Em **Authentication > Providers**, mantenha **Email** habilitado.
5. Copie `.env.example` para `.env` e preencha:
   ```bash
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
6. Instale e rode:
   ```bash
   npm install
   npm run dev
   ```

## 2) Tornar seu usuário ADMIN

- Crie sua conta pelo **Registro** da aplicação.
- Pegue seu `auth.uid()` (em **Authentication > Users**).
- No **SQL Editor**, rode:
  ```sql
  update public.profiles set role = 'admin' where id = '<SEU-UUID>';
  ```

## 3) Fluxo

- Página inicial: catálogo com busca e filtros.
- **Login/Registro**: canto superior direito.
- **Painel**: após logado como admin, aparece no menu. Cadastre produtos e suba imagens para o bucket `product-images`.
- **Dashboard**: métricas de vendas (baseadas nas tabelas `orders` e `order_items`).

## 4) Frete (stub)
Arquivo `src/utils/shipping.ts` contém um cálculo **estimado** por CEP e peso. Troque essa função por chamada real (ex.: API dos Correios **CalcPrecoPrazo**).

## 5) Observações
- Preços são salvos em **centavos** (inteiros) para evitar erros de arredondamento.
- Políticas RLS permitem leitura pública dos produtos e restringem escrita a **admin**.
- O carrinho e checkout estão prontos para gravar pedidos; integração de pagamento pode ser plugar depois.

Boa venda e bom deploy! 🚀
