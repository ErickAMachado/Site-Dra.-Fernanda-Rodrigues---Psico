# Site profissional — Psicóloga infantil e adolescente

Landing page institucional em Next.js 15 para psicóloga que atende crianças e adolescentes, com captação de leads, depoimentos via Supabase e botão flutuante de WhatsApp.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- React Hook Form + Zod
- Lucide React
- Framer Motion

## Estrutura principal

```txt
src/
  app/
    page.tsx
    layout.tsx
    globals.css
    api/leads/route.ts
  components/
  lib/
  types/
supabase/schema.sql
.env.example
```

## Pré-requisitos

- Node.js 18.18 ou superior
- Conta no [Supabase](https://supabase.com)
- Conta na [Vercel](https://vercel.com) (deploy)

## Como rodar localmente

1. Entre na pasta do projeto:

```bash
cd psicologa-infantil-site
```

2. Instale as dependências:

```bash
npm install
```

3. Copie as variáveis de ambiente:

```bash
cp .env.example .env.local
```

No Windows (PowerShell):

```powershell
Copy-Item .env.example .env.local
```

4. Configure o `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

Use o WhatsApp no formato internacional, sem `+` ou espaços.

5. Crie as tabelas no Supabase:

- Abra o projeto no Supabase
- Vá em **SQL Editor**
- Execute o conteúdo de `supabase/schema.sql`

6. Edite os textos principais em:

```txt
src/lib/content.ts
```

7. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Supabase

### Tabela `leads`

Recebe contatos enviados pelo formulário do site.

Políticas:

- insert público permitido
- select público bloqueado

### Tabela `testimonials`

Armazena depoimentos exibidos na landing page.

Políticas:

- select público apenas com `is_active = true`

Para cadastrar depoimentos, insira registros diretamente no Supabase (Table Editor ou SQL).

Exemplo:

```sql
insert into public.testimonials (author_name, rating, comment, source, review_date, is_active)
values ('Ana L.', 5, 'Atendimento acolhedor e profissional.', 'Google', '2025-12-01', true);
```

## Deploy na Vercel

1. Faça push do projeto para um repositório Git (GitHub, GitLab ou Bitbucket).

2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório.

3. Configure as variáveis de ambiente no painel da Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

4. Faça o deploy.

A Vercel detecta automaticamente um projeto Next.js.

## Scripts úteis

```bash
npm run dev      # desenvolvimento
npm run build    # build de produção
npm run start    # servidor de produção
npm run lint     # ESLint
```

## Personalização rápida

Edite em `src/lib/content.ts`:

- nome da psicóloga
- textos das seções
- FAQ
- áreas de atuação

Substitua também placeholders como CRP, endereço e foto profissional no Hero.

## Observações

- Sem painel administrativo nesta versão
- Depoimentos mockados aparecem automaticamente se o Supabase não estiver configurado
- Formulário salva leads via API route em `/api/leads`
