import pathlib, re
exec(open("build.py").read().split("for p in pages:")[0])
site = pathlib.Path("site"); site.mkdir(exist_ok=True)
HEAD = '<!doctype html>\n<html lang="eu">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
BASE = "*,*::before,*::after{box-sizing:border-box}\n[hidden]{display:none!important}\nbody{margin:0}\n"
def wrap(body):
    body = body.replace("<style>\n", "<style>\n"+BASE, 1)
    body = body.replace('<div class="wrap">', '</head>\n<body>\n<div class="wrap">', 1)
    return HEAD + body + "\n</body>\n</html>\n"
for p in pages:
    nav = '<nav class="site" aria-label="Ariketak"><a class="home" href="./">← Ariketa guztiak</a>' + "".join(
        f'<a href="{q["file"]}"' + (' aria-current="page"' if q is p else '') + f'>{q["NUM"]}</a>' for q in pages) + '</nav>'
    s = tpl.replace("{{CSS}}", css).replace("{{JS}}", js).replace("{{PAGE}}", (src/p["js"]).read_text())
    for k in ("NUM","KIND","TITLE","VIEWBOX","ALT","STATEMENT"):
        s = s.replace("{{"+k+"}}", p[k])
    s = s.replace('<div class="wrap">', '<div class="wrap">\n  '+nav, 1)
    (site/p["file"]).write_text(wrap(s))
idx = (src/"index.html").read_text().replace("{{CSS}}", css)
(site/"index.html").write_text(wrap(idx))
(site/".nojekyll").write_text("")
for f in sorted(site.iterdir()): print(f.name, f.stat().st_size)
