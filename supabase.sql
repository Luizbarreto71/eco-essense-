
-- Schema Eco Essence (Supabase)

-- PERFIS (para controle de admin)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user', -- 'user' | 'admin'
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles_self_select"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_self_upsert"
on public.profiles for insert
with check (auth.uid() = id);

-- PRODUCTS
create type gender as enum ('masculino','feminino','unissex');
create type family as enum ('arabe','amadeirado','cítrico','floral','oriental','outros');
create type origin as enum ('importado','nacional');

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text not null,
  price_cents integer not null check (price_cents >= 0),
  gender gender not null,
  family family not null,
  origin origin not null,
  stock integer not null default 0,
  image_url text,
  created_at timestamp with time zone default now()
);

alter table public.products enable row level security;

-- leitura pública
create policy "products_public_read"
on public.products for select
using (true);

-- somente admin pode escrever
create policy "products_admin_write"
on public.products for all
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ORDERS
create type order_status as enum ('pending','paid','canceled');

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total_cents integer not null default 0,
  status order_status not null default 'pending',
  created_at timestamp with time zone default now()
);

alter table public.orders enable row level security;

-- usuário vê seus pedidos; admin vê todos
create policy "orders_owner_read"
on public.orders for select
using (auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role='admin'));

create policy "orders_owner_insert"
on public.orders for insert
with check (auth.uid() = user_id);

-- ORDER ITEMS
create table if not exists public.order_items (
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete restrict,
  qty integer not null check (qty > 0),
  price_cents integer not null check (price_cents >= 0),
  primary key (order_id, product_id)
);

alter table public.order_items enable row level security;

-- usuário só vê itens de seus pedidos; admin vê todos
create policy "order_items_owner_read"
on public.order_items for select
using (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid()
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role='admin')))
);

create policy "order_items_owner_insert"
on public.order_items for insert
with check (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);

-- VIEWS / FUNÇÕES p/ dashboard
create or replace view public.sales_by_product as
select
  oi.product_id,
  p.name,
  sum(oi.qty) as total_qty,
  sum(oi.qty * oi.price_cents) as total_cents
from public.order_items oi
join public.products p on p.id = oi.product_id
join public.orders o on o.id = oi.order_id and o.status in ('paid')
group by 1,2
order by total_qty desc;

create or replace function public.kpi_totals()
returns table(total_orders bigint, total_revenue_cents bigint)
language sql
security definer
as $$
  select
    count(*) as total_orders,
    coalesce(sum(total_cents),0) as total_revenue_cents
  from public.orders
  where status in ('paid');
$$;

-- TRIGGER: criar perfil após sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- SEED opcional
insert into public.products (code,name,description,price_cents,gender,family,origin,stock,image_url)
values
('ECO-ALPHA','Alpha Essence','Notas cítricas e amadeiradas.', 19990,'masculino','cítrico','importado', 20, null),
('ECO-BELLA','Bella Bloom','Floral marcante com fundo doce.', 17990,'feminino','floral','nacional', 15, null)
on conflict (code) do nothing;
