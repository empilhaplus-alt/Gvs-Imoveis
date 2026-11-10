# Catálogo imobiliário GVS — fase piloto

## Objetivo
Cadastro real de imóveis lançamentos/na planta, novos e usados. Visitantes só veem ofertas **publicadas**. Cada anúncio tem fotos, bairro, cidade, características, descrição, preço opcional e botão de WhatsApp com o código do imóvel.

## URLs
- Vitrine: `/imoveis/ofertas`
- Filtros: `/imoveis/ofertas?tipo=lancamento`, `?tipo=novo`, `?tipo=usado`
- Detalhe: `/imoveis/<slug>`
- Painel: `/admin/imoveis`

## Administração
A GVS usa o projeto Supabase `xwybcdmaykycuwmctuya` separado do EPSA Core. Já existem as tabelas `public.gvs_properties` e `public.gvs_property_admins`, com RLS, e o bucket `gvs-property-photos`.

**Importante:** a base foi criada vazia, sem imóveis, sem usuários e sem administradores. Nenhum visitante tem permissão para cadastrar imóveis. Para habilitar o primeiro administrador:
1. No Supabase do projeto GVS, acesse **Authentication → Users → Add user** e crie uma conta de e-mail e senha controlada pela GVS. Não configure registro aberto no site.
2. Localize o UID desse usuário.
3. Execute, no SQL Editor do projeto GVS, substituindo `<UUID_DO_ADMIN>` pelo UID verificado:

```sql
insert into public.gvs_property_admins(user_id)
values ('<UUID_DO_ADMIN>'::uuid)
on conflict(user_id) do nothing;
```

4. Entre em `/admin/imoveis` usando essa conta. O acesso é confirmado no servidor pelas policies RLS e não por um parâmetro do navegador.

## Fluxo de cadastro
1. Novo imóvel → informe título, tipo, bairro, cidade, preço e informações verificadas.
2. Envie fotografias autorizadas de até 5 MB cada (máximo de 12 por oferta).
3. Salve como **Rascunho** para revisão.
4. Quando o conteúdo estiver verificado, altere para **Publicado** e salve.
5. Confira a vitrine e o detalhe. Se a oferta sair do mercado, altere para **Indisponível**.

Não use imóveis ou preços fictícios. O sistema exige descrição, cidade, bairro e uma foto antes de permitir a publicação. A equipe precisa confirmar a veracidade dos anúncios.

## Segurança e limites
- Chave de frontend é **publishable**, não é `service_role`.
- RLS restringe inserções, alterações, exclusões e upload a administradores cadastrados.
- `anon` lê apenas ofertas com `status = 'publicado'`.
- O bucket de fotos é **público**; não envie documentos, imagens privadas ou dados sensíveis.
- Fotos removidas do formulário não são excluídas automaticamente do Storage; limpeza deve ser implementada em etapa posterior.
- O login da fase piloto não persiste sessão após recarregamento e não possui rotina de refresh; recomenda-se autenticar novamente caso a sessão expire.
- O cadastro e a vitrine ainda precisam de testes funcionais na prévia da Cloudflare e validação responsiva.
- O banco já recebeu as alterações pelo Supabase; não executar novamente migrations SQL de criação sem revisar o estado atual.

## Publicação
Manter PR #1 em rascunho até testar:
- sem imóveis: estado vazio correto;
- login de usuário não autorizado: acesso negado;
- login de usuário autorizado e cadastro de rascunho;
- upload das fotos e publicação;
- filtros, detalhe e link do WhatsApp;
- indisponibilização;
- layouts mobile e desktop;
- informação cadastral/CRECI, autorização para fotos e dados publicados.
