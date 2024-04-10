---
layout: ../../layouts/ProjectLayout.astro
title: React site em APP
description: Transforme seus projetos React em Aplicativos de forma simples
image:
  {
    url: https://i9.ytimg.com/vi_webp/_yysNI3Xi7g/maxresdefault.webp?v=6498b5fa&sqp=CJzV2rAG&rs=AOn4CLAqsyAhIWHzbzC89VhwSUa0AM1K7w,
    alt: thumbnail,
  }
date: 2023-06-25
---

[Veja no YouTube](https://youtu.be/_yysNI3Xi7g)

### Vamos criar um site que instala no device do user?

Nesse vídeo eu mostro como faço para que minhas aplicações sejam instaláveis em computadores e smartphones de forma simples e objetiva.

Se você não tem ideia de qual ícone ou cores usar, no vídeo faço uma busca rápida e ensino a converter, cortar e configurar tudo!

Espero que seja útil para seu portfólio! 💙

#### Recursos
- Arquivo Manifest
```bash 
/public/manifest.json
```

```json
{
  "short_name": "Title",
  "name": "Description",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#10060d",
  "background_color": "#10060d"
}
```

[GitHub](https://github.com/jhonatec-dev/revisao-front)
