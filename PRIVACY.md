# Política de Privacidade – EchoBubble

Última atualização: Novembro de 2026

## Visão geral

O EchoBubble traduz automaticamente mensagens do WhatsApp Web, facilitando a comunicação entre pessoas de diferentes idiomas. A privacidade dos usuários é uma prioridade.

## Dados processados

**Texto das mensagens.** Para realizar a tradução, o texto das mensagens exibidas na tela é enviado ao serviço público de tradução MyMemory (https://mymemory.translated.net). O EchoBubble não possui servidores próprios e não armazena, registra ou compartilha essas mensagens em nenhum servidor controlado pelo desenvolvedor.

**E-mail (opcional).** O usuário pode informar seu e-mail na tela da extensão. Ele serve apenas para ampliar o limite diário gratuito do serviço MyMemory (de 5.000 para 50.000 caracteres por dia). Quando informado, o e-mail é enviado ao MyMemory junto com as solicitações de tradução. Informar o e-mail é totalmente opcional, e a extensão funciona sem ele.

## Armazenamento no navegador

A extensão utiliza a API chrome.storage para salvar, apenas no navegador do usuário:

- Idioma de origem e idioma de destino
- Estado da tradução (ativada ou desativada)
- E-mail opcional, se informado
- Cache de traduções recentes, que inclui o texto das mensagens traduzidas, mantido por até 7 dias para evitar traduzir a mesma mensagem novamente

As configurações podem ser sincronizadas entre os dispositivos do usuário pela conta do Chrome. Todos esses dados são removidos ao desinstalar a extensão.

## Dados que não coletamos

O EchoBubble não coleta nome, senhas, localização, dados financeiros ou de saúde, histórico de navegação nem atividade do usuário.

## Compartilhamento de dados

O EchoBubble não vende dados e não os compartilha com terceiros, exceto o envio do texto a ser traduzido (e do e-mail, se informado) ao serviço MyMemory, necessário para o funcionamento da extensão. O tratamento dos dados por esse serviço segue as políticas dele.

## Alterações nesta política

Esta política poderá ser atualizada conforme novas funcionalidades forem adicionadas.

## Contato

GitHub: https://github.com/Renan-Casagrande/EchoBubble