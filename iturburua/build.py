import pathlib, html
src = pathlib.Path("src"); out = pathlib.Path("dist"); out.mkdir(exist_ok=True)
tpl = (src/"template.html").read_text(); css = (src/"common.css").read_text(); js = (src/"common.js").read_text()
pages = [
 dict(file="46-lauzak.html", js="p46.js", NUM="46", KIND="zkh", TITLE="Logelako lauzak", VIEWBOX="0 0 640 360",
      ALT="520 cm × 240 cm-ko logela, lauza karratuz betetzen",
      STATEMENT="<p>Logela laukizuzen batean lauza karratuak jarri nahi ditugu, ahalik eta handienak, baina bat bera ere moztu gabe. Logelak 520 cm luze eta 240 cm zabal ditu. Zer neurri izan behar du lauza bakoitzak?</p>"),
 dict(file="47-alarmak.html", js="p47.js", NUM="47", KIND="mkt", TITLE="Oihanaren alarmak", VIEWBOX="0 0 760 352",
      ALT="Hiru erlojuren alarmen denbora-lerroa, 8:00etatik 16:00etara",
      STATEMENT="<p>Oihanak alarma programatuta duten hiru erloju ditu. Lehenak 30 minutuz behin jotzen du, bigarrenak 90 minutuz behin eta hirugarrenak 150 minutuz behin. Goizeko 8:00etan hirurek batera jo dute.</p><p>a) Zenbat denbora igaro behar da lehenengo bi erlojuek berriz batera jotzeko? b) Eta bigarrenak eta hirugarrenak batera jotzeko?</p>"),
 dict(file="48-kuboak.html", js="p48.js", NUM="48", KIND="mkt", TITLE="Lierniren kubo-zutabeak", VIEWBOX="0 0 540 600",
      ALT="Kubo urdinen eta gorrien bi zutabe, garaiera bera lortu arte pilatzen",
      STATEMENT="<p>Liernik kubo urdinak eta gorriak ditu. Urdinen ertzak 55 mm ditu, eta gorrienak 45 mm. Bi zutabe egin ditu, kolore bakoitzeko bat. Gutxienez zenbat kubo behar ditu kolore bakoitzeko, bi zutabeak garaiera berekoak izateko?</p>"),
 dict(file="49-liburuak.html", js="p49.js", NUM="49", KIND="mkt", TITLE="Apalategiko liburuak", VIEWBOX="0 0 640 300",
      ALT="Liburuak 4ko, 6ko eta 9ko piletan berrantolatzen",
      STATEMENT="<p>Apalategi bateko liburuak 4, 6 edo 9 liburuko piletan jar daitezke, bat bera ere soberan geratu gabe. Gutxienez zenbat liburu egon daitezke apalategian?</p>"),
 dict(file="110-botilak.html", js="p110.js", NUM="110", KIND="zatitzaileak", TITLE="Biltegiko botilak", VIEWBOX="0 0 640 274",
      ALT="84 botila kutxetan antolatzen, zatitzaile bakoitzeko modu bat",
      STATEMENT="<p>Biltegi batean, 84 botila banatu nahi dituzte kutxatan, bat ere sobratu gabe. Zenbat modutara bana ditzakete, kutxa bakoitzean botila kopuru bera jarrita?</p>"),
 dict(file="111-ogitartekoak.html", js="p111.js", NUM="111", KIND="zkh", TITLE="Cateringeko ogitartekoak", VIEWBOX="0 0 640 310",
      ALT="Urdaiazpiko- eta tortilla-ogitartekoak kutxa berdinetan sartzen",
      STATEMENT="<p>Catering batean, 240 urdaiazpiko-ogitarteko eta 225 tortilla-ogitarteko sartu nahi dituzte kutxatan. Kutxa guztiak tamaina berekoak dira, ez dituzte zaporeak nahastu nahi, eta ahalik eta ogitarteko gehien sartu nahi dute. Zenbat ogitarteko egongo dira kutxa bakoitzean? Zenbat kutxa egongo dira guztira?</p>"),
 dict(file="112-aireportua.html", js="p112.js", NUM="112", KIND="mkt", TITLE="Aireportua hustu", VIEWBOX="0 0 760 352",
      ALT="Aireportuko hegazkinen kopurua denboran zehar, aireratze eta lurreratzeekin",
      STATEMENT="<p>Aireportu batek bi pista ditu: aireratzeko bat eta lurreratzeko beste bat. Goizeko 08:00etan 9 hegazkin daude. Ordu horretatik aurrera, hegazkin bat aireratzen da 10 minutuz behin, eta beste bat lurreratzen da 4 minutuz behin. Zer ordutan geratuko da aireportua hegazkin gabe?</p>"),
 dict(file="113-taldeak.html", js="p113.js", NUM="113", KIND="zatitzaileak", TITLE="Gelako taldeak", VIEWBOX="0 0 640 238",
      ALT="32 ikasle kide kopuru bereko taldetan antolatzen",
      STATEMENT="<p>32 ikasleko gela batean, taldeak egin behar dituzte zientzia-ikasgaiko proiektu baterako. Talde bakoitzak bi kide izan behar ditu gutxienez, eta ez dugu ikaslerik bakarrik geratzea nahi. Zenbat talde osa daitezke gutxienez? Eta gehienez?</p>"),
]
for p in pages:
    s = tpl.replace("{{CSS}}", css).replace("{{JS}}", js).replace("{{PAGE}}", (src/p["js"]).read_text())
    for k in ("NUM","KIND","TITLE","VIEWBOX","ALT","STATEMENT"):
        s = s.replace("{{"+k+"}}", p[k])
    (out/p["file"]).write_text(s)
    print(p["file"], len(s))
