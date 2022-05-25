"use strict";
(self.webpackChunkbook = self.webpackChunkbook || []).push([[179], {
    388: (Pe,Z,T)=>{
        var D = T(808)
          , w = T(923);
        class X extends D.w_ {
            constructor() {
                super(...arguments),
                this.supportsDOMEvents = !0
            }
        }
        class J extends X {
            static makeCurrent() {
                (0,
                D.HT)(new J)
            }
            onAndCancel(m, g, C) {
                return m.addEventListener(g, C, !1),
                ()=>{
                    m.removeEventListener(g, C, !1)
                }
            }
            dispatchEvent(m, g) {
                m.dispatchEvent(g)
            }
            remove(m) {
                m.parentNode && m.parentNode.removeChild(m)
            }
            createElement(m, g) {
                return (g = g || this.getDefaultDocument()).createElement(m)
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            isElementNode(m) {
                return m.nodeType === Node.ELEMENT_NODE
            }
            isShadowRoot(m) {
                return m instanceof DocumentFragment
            }
            getGlobalEventTarget(m, g) {
                return "window" === g ? window : "document" === g ? m : "body" === g ? m.body : null
            }
            getBaseHref(m) {
                const g = function _e() {
                    return U = U || document.querySelector("base"),
                    U ? U.getAttribute("href") : null
                }();
                return null == g ? null : function xe(E) {
                    ye = ye || document.createElement("a"),
                    ye.setAttribute("href", E);
                    const m = ye.pathname;
                    return "/" === m.charAt(0) ? m : `/${m}`
                }(g)
            }
            resetBaseElement() {
                U = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            getCookie(m) {
                return (0,
                D.Mx)(document.cookie, m)
            }
        }
        let ye, U = null;
        const pe = new w.OlP("TRANSITION_ID")
          , k = [{
            provide: w.ip1,
            useFactory: function Y(E, m, g) {
                return ()=>{
                    g.get(w.CZH).donePromise.then(()=>{
                        const C = (0,
                        D.q)()
                          , b = m.querySelectorAll(`style[ng-transition="${E}"]`);
                        for (let W = 0; W < b.length; W++)
                            C.remove(b[W])
                    }
                    )
                }
            },
            deps: [pe, D.K0, w.zs3],
            multi: !0
        }];
        let ce = (()=>{
            class E {
                build() {
                    return new XMLHttpRequest
                }
            }
            return E.\u0275fac = function(g) {
                return new (g || E)
            }
            ,
            E.\u0275prov = w.Yz7({
                token: E,
                factory: E.\u0275fac
            }),
            E
        }
        )();
        const te = new w.OlP("EventManagerPlugins");
        let fe = (()=>{
            class E {
                constructor(g, C) {
                    this._zone = C,
                    this._eventNameToPlugin = new Map,
                    g.forEach(b=>b.manager = this),
                    this._plugins = g.slice().reverse()
                }
                addEventListener(g, C, b) {
                    return this._findPluginFor(C).addEventListener(g, C, b)
                }
                addGlobalEventListener(g, C, b) {
                    return this._findPluginFor(C).addGlobalEventListener(g, C, b)
                }
                getZone() {
                    return this._zone
                }
                _findPluginFor(g) {
                    const C = this._eventNameToPlugin.get(g);
                    if (C)
                        return C;
                    const b = this._plugins;
                    for (let W = 0; W < b.length; W++) {
                        const se = b[W];
                        if (se.supports(g))
                            return this._eventNameToPlugin.set(g, se),
                            se
                    }
                    throw new Error(`No event manager plugin found for event ${g}`)
                }
            }
            return E.\u0275fac = function(g) {
                return new (g || E)(w.LFG(te),w.LFG(w.R0b))
            }
            ,
            E.\u0275prov = w.Yz7({
                token: E,
                factory: E.\u0275fac
            }),
            E
        }
        )();
        class Se {
            constructor(m) {
                this._doc = m
            }
            addGlobalEventListener(m, g, C) {
                const b = (0,
                D.q)().getGlobalEventTarget(this._doc, m);
                if (!b)
                    throw new Error(`Unsupported event target ${b} for event ${g}`);
                return this.addEventListener(b, g, C)
            }
        }
        let Me = (()=>{
            class E {
                constructor() {
                    this._stylesSet = new Set
                }
                addStyles(g) {
                    const C = new Set;
                    g.forEach(b=>{
                        this._stylesSet.has(b) || (this._stylesSet.add(b),
                        C.add(b))
                    }
                    ),
                    this.onStylesAdded(C)
                }
                onStylesAdded(g) {}
                getAllStyles() {
                    return Array.from(this._stylesSet)
                }
            }
            return E.\u0275fac = function(g) {
                return new (g || E)
            }
            ,
            E.\u0275prov = w.Yz7({
                token: E,
                factory: E.\u0275fac
            }),
            E
        }
        )()
          , Ue = (()=>{
            class E extends Me {
                constructor(g) {
                    super(),
                    this._doc = g,
                    this._hostNodes = new Map,
                    this._hostNodes.set(g.head, [])
                }
                _addStylesToHost(g, C, b) {
                    g.forEach(W=>{
                        const se = this._doc.createElement("style");
                        se.textContent = W,
                        b.push(C.appendChild(se))
                    }
                    )
                }
                addHost(g) {
                    const C = [];
                    this._addStylesToHost(this._stylesSet, g, C),
                    this._hostNodes.set(g, C)
                }
                removeHost(g) {
                    const C = this._hostNodes.get(g);
                    C && C.forEach(B),
                    this._hostNodes.delete(g)
                }
                onStylesAdded(g) {
                    this._hostNodes.forEach((C,b)=>{
                        this._addStylesToHost(g, b, C)
                    }
                    )
                }
                ngOnDestroy() {
                    this._hostNodes.forEach(g=>g.forEach(B))
                }
            }
            return E.\u0275fac = function(g) {
                return new (g || E)(w.LFG(D.K0))
            }
            ,
            E.\u0275prov = w.Yz7({
                token: E,
                factory: E.\u0275fac
            }),
            E
        }
        )();
        function B(E) {
            (0,
            D.q)().remove(E)
        }
        const Ce = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/MathML/"
        }
          , q = /%COMP%/g;
        function M(E, m, g) {
            for (let C = 0; C < m.length; C++) {
                let b = m[C];
                Array.isArray(b) ? M(E, b, g) : (b = b.replace(q, E),
                g.push(b))
            }
            return g
        }
        function A(E) {
            return m=>{
                if ("__ngUnwrap__" === m)
                    return E;
                !1 === E(m) && (m.preventDefault(),
                m.returnValue = !1)
            }
        }
        let R = (()=>{
            class E {
                constructor(g, C, b) {
                    this.eventManager = g,
                    this.sharedStylesHost = C,
                    this.appId = b,
                    this.rendererByCompId = new Map,
                    this.defaultRenderer = new F(g)
                }
                createRenderer(g, C) {
                    if (!g || !C)
                        return this.defaultRenderer;
                    switch (C.encapsulation) {
                    case w.ifc.Emulated:
                        {
                            let b = this.rendererByCompId.get(C.id);
                            return b || (b = new Je(this.eventManager,this.sharedStylesHost,C,this.appId),
                            this.rendererByCompId.set(C.id, b)),
                            b.applyToHost(g),
                            b
                        }
                    case 1:
                    case w.ifc.ShadowDom:
                        return new Ae(this.eventManager,this.sharedStylesHost,g,C);
                    default:
                        if (!this.rendererByCompId.has(C.id)) {
                            const b = M(C.id, C.styles, []);
                            this.sharedStylesHost.addStyles(b),
                            this.rendererByCompId.set(C.id, this.defaultRenderer)
                        }
                        return this.defaultRenderer
                    }
                }
                begin() {}
                end() {}
            }
            return E.\u0275fac = function(g) {
                return new (g || E)(w.LFG(fe),w.LFG(Ue),w.LFG(w.AFp))
            }
            ,
            E.\u0275prov = w.Yz7({
                token: E,
                factory: E.\u0275fac
            }),
            E
        }
        )();
        class F {
            constructor(m) {
                this.eventManager = m,
                this.data = Object.create(null),
                this.destroyNode = null
            }
            destroy() {}
            createElement(m, g) {
                return g ? document.createElementNS(Ce[g] || g, m) : document.createElement(m)
            }
            createComment(m) {
                return document.createComment(m)
            }
            createText(m) {
                return document.createTextNode(m)
            }
            appendChild(m, g) {
                (Be(m) ? m.content : m).appendChild(g)
            }
            insertBefore(m, g, C) {
                m && (Be(m) ? m.content : m).insertBefore(g, C)
            }
            removeChild(m, g) {
                m && m.removeChild(g)
            }
            selectRootElement(m, g) {
                let C = "string" == typeof m ? document.querySelector(m) : m;
                if (!C)
                    throw new Error(`The selector "${m}" did not match any elements`);
                return g || (C.textContent = ""),
                C
            }
            parentNode(m) {
                return m.parentNode
            }
            nextSibling(m) {
                return m.nextSibling
            }
            setAttribute(m, g, C, b) {
                if (b) {
                    g = b + ":" + g;
                    const W = Ce[b];
                    W ? m.setAttributeNS(W, g, C) : m.setAttribute(g, C)
                } else
                    m.setAttribute(g, C)
            }
            removeAttribute(m, g, C) {
                if (C) {
                    const b = Ce[C];
                    b ? m.removeAttributeNS(b, g) : m.removeAttribute(`${C}:${g}`)
                } else
                    m.removeAttribute(g)
            }
            addClass(m, g) {
                m.classList.add(g)
            }
            removeClass(m, g) {
                m.classList.remove(g)
            }
            setStyle(m, g, C, b) {
                b & (w.JOm.DashCase | w.JOm.Important) ? m.style.setProperty(g, C, b & w.JOm.Important ? "important" : "") : m.style[g] = C
            }
            removeStyle(m, g, C) {
                C & w.JOm.DashCase ? m.style.removeProperty(g) : m.style[g] = ""
            }
            setProperty(m, g, C) {
                m[g] = C
            }
            setValue(m, g) {
                m.nodeValue = g
            }
            listen(m, g, C) {
                return "string" == typeof m ? this.eventManager.addGlobalEventListener(m, g, A(C)) : this.eventManager.addEventListener(m, g, A(C))
            }
        }
        function Be(E) {
            return "TEMPLATE" === E.tagName && void 0 !== E.content
        }
        class Je extends F {
            constructor(m, g, C, b) {
                super(m),
                this.component = C;
                const W = M(b + "-" + C.id, C.styles, []);
                g.addStyles(W),
                this.contentAttr = function de(E) {
                    return "_ngcontent-%COMP%".replace(q, E)
                }(b + "-" + C.id),
                this.hostAttr = function De(E) {
                    return "_nghost-%COMP%".replace(q, E)
                }(b + "-" + C.id)
            }
            applyToHost(m) {
                super.setAttribute(m, this.hostAttr, "")
            }
            createElement(m, g) {
                const C = super.createElement(m, g);
                return super.setAttribute(C, this.contentAttr, ""),
                C
            }
        }
        class Ae extends F {
            constructor(m, g, C, b) {
                super(m),
                this.sharedStylesHost = g,
                this.hostEl = C,
                this.shadowRoot = C.attachShadow({
                    mode: "open"
                }),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const W = M(b.id, b.styles, []);
                for (let se = 0; se < W.length; se++) {
                    const ae = document.createElement("style");
                    ae.textContent = W[se],
                    this.shadowRoot.appendChild(ae)
                }
            }
            nodeOrShadowRoot(m) {
                return m === this.hostEl ? this.shadowRoot : m
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
            appendChild(m, g) {
                return super.appendChild(this.nodeOrShadowRoot(m), g)
            }
            insertBefore(m, g, C) {
                return super.insertBefore(this.nodeOrShadowRoot(m), g, C)
            }
            removeChild(m, g) {
                return super.removeChild(this.nodeOrShadowRoot(m), g)
            }
            parentNode(m) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(m)))
            }
        }
        let Dt = (()=>{
            class E extends Se {
                constructor(g) {
                    super(g)
                }
                supports(g) {
                    return !0
                }
                addEventListener(g, C, b) {
                    return g.addEventListener(C, b, !1),
                    ()=>this.removeEventListener(g, C, b)
                }
                removeEventListener(g, C, b) {
                    return g.removeEventListener(C, b)
                }
            }
            return E.\u0275fac = function(g) {
                return new (g || E)(w.LFG(D.K0))
            }
            ,
            E.\u0275prov = w.Yz7({
                token: E,
                factory: E.\u0275fac
            }),
            E
        }
        )();
        const Bt = ["alt", "control", "meta", "shift"]
          , bt = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
          , Ht = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5",
            F: "6",
            G: "7",
            H: "8",
            I: "9",
            J: "*",
            K: "+",
            M: "-",
            N: ".",
            O: "/",
            "`": "0",
            "\x90": "NumLock"
        }
          , ot = {
            alt: E=>E.altKey,
            control: E=>E.ctrlKey,
            meta: E=>E.metaKey,
            shift: E=>E.shiftKey
        };
        let Te = (()=>{
            class E extends Se {
                constructor(g) {
                    super(g)
                }
                supports(g) {
                    return null != E.parseEventName(g)
                }
                addEventListener(g, C, b) {
                    const W = E.parseEventName(C)
                      , se = E.eventCallback(W.fullKey, b, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(()=>(0,
                    D.q)().onAndCancel(g, W.domEventName, se))
                }
                static parseEventName(g) {
                    const C = g.toLowerCase().split(".")
                      , b = C.shift();
                    if (0 === C.length || "keydown" !== b && "keyup" !== b)
                        return null;
                    const W = E._normalizeKey(C.pop());
                    let se = "";
                    if (Bt.forEach(we=>{
                        const Tt = C.indexOf(we);
                        Tt > -1 && (C.splice(Tt, 1),
                        se += we + ".")
                    }
                    ),
                    se += W,
                    0 != C.length || 0 === W.length)
                        return null;
                    const ae = {};
                    return ae.domEventName = b,
                    ae.fullKey = se,
                    ae
                }
                static getEventFullKey(g) {
                    let C = ""
                      , b = function or(E) {
                        let m = E.key;
                        if (null == m) {
                            if (m = E.keyIdentifier,
                            null == m)
                                return "Unidentified";
                            m.startsWith("U+") && (m = String.fromCharCode(parseInt(m.substring(2), 16)),
                            3 === E.location && Ht.hasOwnProperty(m) && (m = Ht[m]))
                        }
                        return bt[m] || m
                    }(g);
                    return b = b.toLowerCase(),
                    " " === b ? b = "space" : "." === b && (b = "dot"),
                    Bt.forEach(W=>{
                        W != b && ot[W](g) && (C += W + ".")
                    }
                    ),
                    C += b,
                    C
                }
                static eventCallback(g, C, b) {
                    return W=>{
                        E.getEventFullKey(W) === g && b.runGuarded(()=>C(W))
                    }
                }
                static _normalizeKey(g) {
                    return "esc" === g ? "escape" : g
                }
            }
            return E.\u0275fac = function(g) {
                return new (g || E)(w.LFG(D.K0))
            }
            ,
            E.\u0275prov = w.Yz7({
                token: E,
                factory: E.\u0275fac
            }),
            E
        }
        )();
        const qr = (0,
        w.eFA)(w._c5, "browser", [{
            provide: w.Lbi,
            useValue: D.bD
        }, {
            provide: w.g9A,
            useValue: function Ko() {
                J.makeCurrent()
            },
            multi: !0
        }, {
            provide: D.K0,
            useFactory: function Rn() {
                return (0,
                w.RDi)(document),
                document
            },
            deps: []
        }])
          , Qr = new w.OlP("")
          , Et = [{
            provide: w.rWj,
            useClass: class le {
                addToWindow(m) {
                    w.dqk.getAngularTestability = (C,b=!0)=>{
                        const W = m.findTestabilityInTree(C, b);
                        if (null == W)
                            throw new Error("Could not find testability for element.");
                        return W
                    }
                    ,
                    w.dqk.getAllAngularTestabilities = ()=>m.getAllTestabilities(),
                    w.dqk.getAllAngularRootElements = ()=>m.getAllRootElements(),
                    w.dqk.frameworkStabilizers || (w.dqk.frameworkStabilizers = []),
                    w.dqk.frameworkStabilizers.push(C=>{
                        const b = w.dqk.getAllAngularTestabilities();
                        let W = b.length
                          , se = !1;
                        const ae = function(we) {
                            se = se || we,
                            W--,
                            0 == W && C(se)
                        };
                        b.forEach(function(we) {
                            we.whenStable(ae)
                        })
                    }
                    )
                }
                findTestabilityInTree(m, g, C) {
                    if (null == g)
                        return null;
                    const b = m.getTestability(g);
                    return null != b ? b : C ? (0,
                    D.q)().isShadowRoot(g) ? this.findTestabilityInTree(m, g.host, !0) : this.findTestabilityInTree(m, g.parentElement, !0) : null
                }
            }
            ,
            deps: []
        }, {
            provide: w.lri,
            useClass: w.dDg,
            deps: [w.R0b, w.eoX, w.rWj]
        }, {
            provide: w.dDg,
            useClass: w.dDg,
            deps: [w.R0b, w.eoX, w.rWj]
        }]
          , Ut = [{
            provide: w.zSh,
            useValue: "root"
        }, {
            provide: w.qLn,
            useFactory: function Pn() {
                return new w.qLn
            },
            deps: []
        }, {
            provide: te,
            useClass: Dt,
            multi: !0,
            deps: [D.K0, w.R0b, w.Lbi]
        }, {
            provide: te,
            useClass: Te,
            multi: !0,
            deps: [D.K0]
        }, {
            provide: R,
            useClass: R,
            deps: [fe, Ue, w.AFp]
        }, {
            provide: w.FYo,
            useExisting: R
        }, {
            provide: Me,
            useExisting: Ue
        }, {
            provide: Ue,
            useClass: Ue,
            deps: [D.K0]
        }, {
            provide: fe,
            useClass: fe,
            deps: [te, w.R0b]
        }, {
            provide: D.JF,
            useClass: ce,
            deps: []
        }, []];
        let Wn = (()=>{
            class E {
                constructor(g) {}
                static withServerTransition(g) {
                    return {
                        ngModule: E,
                        providers: [{
                            provide: w.AFp,
                            useValue: g.appId
                        }, {
                            provide: pe,
                            useExisting: w.AFp
                        }, k]
                    }
                }
            }
            return E.\u0275fac = function(g) {
                return new (g || E)(w.LFG(Qr, 12))
            }
            ,
            E.\u0275mod = w.oAB({
                type: E
            }),
            E.\u0275inj = w.cJS({
                providers: [...Ut, ...Et],
                imports: [D.ez, w.hGG]
            }),
            E
        }
        )();
        "undefined" != typeof window && window;
        var Ve = T(579);
        const Qe = {
            now: ()=>(Qe.delegate || Date).now(),
            delegate: void 0
        };
        class ht extends Ve.x {
            constructor(m=1 / 0, g=1 / 0, C=Qe) {
                super(),
                this._bufferSize = m,
                this._windowTime = g,
                this._timestampProvider = C,
                this._buffer = [],
                this._infiniteTimeWindow = !0,
                this._infiniteTimeWindow = g === 1 / 0,
                this._bufferSize = Math.max(1, m),
                this._windowTime = Math.max(1, g)
            }
            next(m) {
                const {isStopped: g, _buffer: C, _infiniteTimeWindow: b, _timestampProvider: W, _windowTime: se} = this;
                g || (C.push(m),
                !b && C.push(W.now() + se)),
                this._trimBuffer(),
                super.next(m)
            }
            _subscribe(m) {
                this._throwIfClosed(),
                this._trimBuffer();
                const g = this._innerSubscribe(m)
                  , {_infiniteTimeWindow: C, _buffer: b} = this
                  , W = b.slice();
                for (let se = 0; se < W.length && !m.closed; se += C ? 1 : 2)
                    m.next(W[se]);
                return this._checkFinalizedStatuses(m),
                g
            }
            _trimBuffer() {
                const {_bufferSize: m, _timestampProvider: g, _buffer: C, _infiniteTimeWindow: b} = this
                  , W = (b ? 1 : 2) * m;
                if (m < 1 / 0 && W < C.length && C.splice(0, C.length - W),
                !b) {
                    const se = g.now();
                    let ae = 0;
                    for (let we = 1; we < C.length && C[we] <= se; we += 2)
                        ae = we;
                    ae && C.splice(0, ae + 1)
                }
            }
        }
        var Ct = T(754)
          , on = T(421)
          , kn = T(482)
          , sn = T(403)
          , Wt = T(4);
        const et = {
            schedule(E, m) {
                const g = setTimeout(E, m);
                return ()=>clearTimeout(g)
            },
            scheduleBeforeRender(E) {
                if ("undefined" == typeof window)
                    return et.schedule(E, 0);
                if (void 0 === window.requestAnimationFrame)
                    return et.schedule(E, 16);
                const m = window.requestAnimationFrame(E);
                return ()=>window.cancelAnimationFrame(m)
            }
        };
        let He;
        function wn(E, m, g) {
            let C = g;
            return function _t(E) {
                return !!E && E.nodeType === Node.ELEMENT_NODE
            }(E) && m.some((b,W)=>!("*" === b || !function pt(E, m) {
                if (!He) {
                    const g = Element.prototype;
                    He = g.matches || g.matchesSelector || g.mozMatchesSelector || g.msMatchesSelector || g.oMatchesSelector || g.webkitMatchesSelector
                }
                return E.nodeType === Node.ELEMENT_NODE && He.call(E, m)
            }(E, b) || (C = W,
            0))),
            C
        }
        class Ee {
            constructor(m, g) {
                this.componentFactory = g.get(w._Vd).resolveComponentFactory(m)
            }
            create(m) {
                return new In(this.componentFactory,m)
            }
        }
        class In {
            constructor(m, g) {
                this.componentFactory = m,
                this.injector = g,
                this.eventEmitters = new ht(1),
                this.events = this.eventEmitters.pipe(function an(E, m) {
                    return (0,
                    kn.e)((g,C)=>{
                        let b = null
                          , W = 0
                          , se = !1;
                        const ae = ()=>se && !b && C.complete();
                        g.subscribe((0,
                        sn.x)(C, we=>{
                            null == b || b.unsubscribe();
                            let Tt = 0;
                            const cn = W++;
                            (0,
                            on.Xf)(E(we, cn)).subscribe(b = (0,
                            sn.x)(C, dn=>C.next(m ? m(we, dn, cn, Tt++) : dn), ()=>{
                                b = null,
                                ae()
                            }
                            ))
                        }
                        , ()=>{
                            se = !0,
                            ae()
                        }
                        ))
                    }
                    )
                }(C=>(0,
                Ct.T)(...C))),
                this.componentRef = null,
                this.viewChangeDetectorRef = null,
                this.inputChanges = null,
                this.hasInputChanges = !1,
                this.implementsOnChanges = !1,
                this.scheduledChangeDetectionFn = null,
                this.scheduledDestroyFn = null,
                this.initialInputValues = new Map,
                this.unchangedInputs = new Set(this.componentFactory.inputs.map(({propName: C})=>C)),
                this.ngZone = this.injector.get(w.R0b),
                this.elementZone = "undefined" == typeof Zone ? null : this.ngZone.run(()=>Zone.current)
            }
            connect(m) {
                this.runInZone(()=>{
                    if (null !== this.scheduledDestroyFn)
                        return this.scheduledDestroyFn(),
                        void (this.scheduledDestroyFn = null);
                    null === this.componentRef && this.initializeComponent(m)
                }
                )
            }
            disconnect() {
                this.runInZone(()=>{
                    null === this.componentRef || null !== this.scheduledDestroyFn || (this.scheduledDestroyFn = et.schedule(()=>{
                        null !== this.componentRef && (this.componentRef.destroy(),
                        this.componentRef = null,
                        this.viewChangeDetectorRef = null)
                    }
                    , 10))
                }
                )
            }
            getInputValue(m) {
                return this.runInZone(()=>null === this.componentRef ? this.initialInputValues.get(m) : this.componentRef.instance[m])
            }
            setInputValue(m, g) {
                this.runInZone(()=>{
                    null !== this.componentRef ? function Rt(E, m) {
                        return E === m || E != E && m != m
                    }(g, this.getInputValue(m)) && (void 0 !== g || !this.unchangedInputs.has(m)) || (this.recordInputChange(m, g),
                    this.unchangedInputs.delete(m),
                    this.hasInputChanges = !0,
                    this.componentRef.instance[m] = g,
                    this.scheduleDetectChanges()) : this.initialInputValues.set(m, g)
                }
                )
            }
            initializeComponent(m) {
                const g = w.zs3.create({
                    providers: [],
                    parent: this.injector
                })
                  , C = function Ze(E, m) {
                    const g = E.childNodes
                      , C = m.map(()=>[]);
                    let b = -1;
                    m.some((W,se)=>"*" === W && (b = se,
                    !0));
                    for (let W = 0, se = g.length; W < se; ++W) {
                        const ae = g[W]
                          , we = wn(ae, m, b);
                        -1 !== we && C[we].push(ae)
                    }
                    return C
                }(m, this.componentFactory.ngContentSelectors);
                this.componentRef = this.componentFactory.create(g, C, m),
                this.viewChangeDetectorRef = this.componentRef.injector.get(w.sBO),
                this.implementsOnChanges = function z(E) {
                    return "function" == typeof E
                }(this.componentRef.instance.ngOnChanges),
                this.initializeInputs(),
                this.initializeOutputs(this.componentRef),
                this.detectChanges(),
                this.injector.get(w.z2F).attachView(this.componentRef.hostView)
            }
            initializeInputs() {
                this.componentFactory.inputs.forEach(({propName: m})=>{
                    this.initialInputValues.has(m) && this.setInputValue(m, this.initialInputValues.get(m))
                }
                ),
                this.initialInputValues.clear()
            }
            initializeOutputs(m) {
                const g = this.componentFactory.outputs.map(({propName: C, templateName: b})=>m.instance[C].pipe((0,
                Wt.U)(se=>({
                    name: b,
                    value: se
                }))));
                this.eventEmitters.next(g)
            }
            callNgOnChanges(m) {
                if (!this.implementsOnChanges || null === this.inputChanges)
                    return;
                const g = this.inputChanges;
                this.inputChanges = null,
                m.instance.ngOnChanges(g)
            }
            markViewForCheck(m) {
                this.hasInputChanges && (this.hasInputChanges = !1,
                m.markForCheck())
            }
            scheduleDetectChanges() {
                this.scheduledChangeDetectionFn || (this.scheduledChangeDetectionFn = et.scheduleBeforeRender(()=>{
                    this.scheduledChangeDetectionFn = null,
                    this.detectChanges()
                }
                ))
            }
            recordInputChange(m, g) {
                if (!this.implementsOnChanges)
                    return;
                null === this.inputChanges && (this.inputChanges = {});
                const C = this.inputChanges[m];
                if (C)
                    return void (C.currentValue = g);
                const b = this.unchangedInputs.has(m)
                  , W = b ? void 0 : this.getInputValue(m);
                this.inputChanges[m] = new w.WD2(W,g,b)
            }
            detectChanges() {
                null !== this.componentRef && (this.callNgOnChanges(this.componentRef),
                this.markViewForCheck(this.viewChangeDetectorRef),
                this.componentRef.changeDetectorRef.detectChanges())
            }
            runInZone(m) {
                return this.elementZone && Zone.current !== this.elementZone ? this.ngZone.run(m) : m()
            }
        }
        class ln extends HTMLElement {
            constructor() {
                super(...arguments),
                this.ngElementEventsSubscription = null
            }
        }
        let wt = (()=>{
            class E {
                constructor(g) {
                    this.injector = g
                }
                ngDoBootstrap() {
                    T.e(456).then(T.bind(T, 456)).then(g=>{
                        const C = "bkc-camera";
                        if (!customElements.get(C)) {
                            const b = function Kn(E, m) {
                                const g = function Yt(E, m) {
                                    return m.get(w._Vd).resolveComponentFactory(E).inputs
                                }(E, m.injector)
                                  , C = m.strategyFactory || new Ee(E,m.injector)
                                  , b = function tt(E) {
                                    const m = {};
                                    return E.forEach(({propName: g, templateName: C})=>{
                                        m[function no(E) {
                                            return E.replace(/[A-Z]/g, m=>`-${m.toLowerCase()}`)
                                        }(C)] = g
                                    }
                                    ),
                                    m
                                }(g);
                                class W extends ln {
                                    constructor(ae) {
                                        super(),
                                        this.injector = ae
                                    }
                                    get ngElementStrategy() {
                                        if (!this._ngElementStrategy) {
                                            const ae = this._ngElementStrategy = C.create(this.injector || m.injector);
                                            g.forEach(({propName: we})=>{
                                                if (!this.hasOwnProperty(we))
                                                    return;
                                                const Tt = this[we];
                                                delete this[we],
                                                ae.setInputValue(we, Tt)
                                            }
                                            )
                                        }
                                        return this._ngElementStrategy
                                    }
                                    attributeChangedCallback(ae, we, Tt, cn) {
                                        this.ngElementStrategy.setInputValue(b[ae], Tt)
                                    }
                                    connectedCallback() {
                                        let ae = !1;
                                        this.ngElementStrategy.events && (this.subscribeToEvents(),
                                        ae = !0),
                                        this.ngElementStrategy.connect(this),
                                        ae || this.subscribeToEvents()
                                    }
                                    disconnectedCallback() {
                                        this._ngElementStrategy && this._ngElementStrategy.disconnect(),
                                        this.ngElementEventsSubscription && (this.ngElementEventsSubscription.unsubscribe(),
                                        this.ngElementEventsSubscription = null)
                                    }
                                    subscribeToEvents() {
                                        this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe(ae=>{
                                            const we = new CustomEvent(ae.name,{
                                                detail: ae.value
                                            });
                                            this.dispatchEvent(we)
                                        }
                                        )
                                    }
                                }
                                return W.observedAttributes = Object.keys(b),
                                g.forEach(({propName: se})=>{
                                    Object.defineProperty(W.prototype, se, {
                                        get() {
                                            return this.ngElementStrategy.getInputValue(se)
                                        },
                                        set(ae) {
                                            this.ngElementStrategy.setInputValue(se, ae)
                                        },
                                        configurable: !0,
                                        enumerable: !0
                                    })
                                }
                                ),
                                W
                            }(g.CameraComponent, {
                                injector: this.injector
                            });
                            customElements.define(C, b)
                        }
                        return g
                    }
                    )
                }
            }
            return E.\u0275fac = function(g) {
                return new (g || E)(w.LFG(w.zs3))
            }
            ,
            E.\u0275mod = w.oAB({
                type: E
            }),
            E.\u0275inj = w.cJS({
                imports: [Wn]
            }),
            E
        }
        )();
        (0,
        w.G48)(),
        qr().bootstrapModule(wt).catch(E=>console.error(E))
    }
    ,
    306: (Pe,Z,T)=>{
        T.d(Z, {
            y: ()=>Y
        });
        var D = T(961)
          , w = T(727)
          , X = T(822)
          , J = T(671);
        var ye = T(416)
          , xe = T(576)
          , pe = T(806);
        let Y = (()=>{
            class te {
                constructor(Se) {
                    Se && (this._subscribe = Se)
                }
                lift(Se) {
                    const Me = new te;
                    return Me.source = this,
                    Me.operator = Se,
                    Me
                }
                subscribe(Se, Me, Ue) {
                    const B = function ce(te) {
                        return te && te instanceof D.Lv || function le(te) {
                            return te && (0,
                            xe.m)(te.next) && (0,
                            xe.m)(te.error) && (0,
                            xe.m)(te.complete)
                        }(te) && (0,
                        w.Nn)(te)
                    }(Se) ? Se : new D.Hp(Se,Me,Ue);
                    return (0,
                    pe.x)(()=>{
                        const {operator: Ce, source: q} = this;
                        B.add(Ce ? Ce.call(B, q) : q ? this._subscribe(B) : this._trySubscribe(B))
                    }
                    ),
                    B
                }
                _trySubscribe(Se) {
                    try {
                        return this._subscribe(Se)
                    } catch (Me) {
                        Se.error(Me)
                    }
                }
                forEach(Se, Me) {
                    return new (Me = k(Me))((Ue,B)=>{
                        const Ce = new D.Hp({
                            next: q=>{
                                try {
                                    Se(q)
                                } catch (x) {
                                    B(x),
                                    Ce.unsubscribe()
                                }
                            }
                            ,
                            error: B,
                            complete: Ue
                        });
                        this.subscribe(Ce)
                    }
                    )
                }
                _subscribe(Se) {
                    var Me;
                    return null === (Me = this.source) || void 0 === Me ? void 0 : Me.subscribe(Se)
                }
                [X.L]() {
                    return this
                }
                pipe(...Se) {
                    return function _e(te) {
                        return 0 === te.length ? J.y : 1 === te.length ? te[0] : function(Se) {
                            return te.reduce((Me,Ue)=>Ue(Me), Se)
                        }
                    }(Se)(this)
                }
                toPromise(Se) {
                    return new (Se = k(Se))((Me,Ue)=>{
                        let B;
                        this.subscribe(Ce=>B = Ce, Ce=>Ue(Ce), ()=>Me(B))
                    }
                    )
                }
            }
            return te.create = fe=>new te(fe),
            te
        }
        )();
        function k(te) {
            var fe;
            return null !== (fe = null != te ? te : ye.v.Promise) && void 0 !== fe ? fe : Promise
        }
    }
    ,
    579: (Pe,Z,T)=>{
        T.d(Z, {
            x: ()=>ye
        });
        var D = T(306)
          , w = T(727);
        const J = (0,
        T(888).d)(pe=>function() {
            pe(this),
            this.name = "ObjectUnsubscribedError",
            this.message = "object unsubscribed"
        }
        );
        var U = T(737)
          , _e = T(806);
        let ye = (()=>{
            class pe extends D.y {
                constructor() {
                    super(),
                    this.closed = !1,
                    this.currentObservers = null,
                    this.observers = [],
                    this.isStopped = !1,
                    this.hasError = !1,
                    this.thrownError = null
                }
                lift(k) {
                    const le = new xe(this,this);
                    return le.operator = k,
                    le
                }
                _throwIfClosed() {
                    if (this.closed)
                        throw new J
                }
                next(k) {
                    (0,
                    _e.x)(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const le of this.currentObservers)
                                le.next(k)
                        }
                    }
                    )
                }
                error(k) {
                    (0,
                    _e.x)(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.hasError = this.isStopped = !0,
                            this.thrownError = k;
                            const {observers: le} = this;
                            for (; le.length; )
                                le.shift().error(k)
                        }
                    }
                    )
                }
                complete() {
                    (0,
                    _e.x)(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.isStopped = !0;
                            const {observers: k} = this;
                            for (; k.length; )
                                k.shift().complete()
                        }
                    }
                    )
                }
                unsubscribe() {
                    this.isStopped = this.closed = !0,
                    this.observers = this.currentObservers = null
                }
                get observed() {
                    var k;
                    return (null === (k = this.observers) || void 0 === k ? void 0 : k.length) > 0
                }
                _trySubscribe(k) {
                    return this._throwIfClosed(),
                    super._trySubscribe(k)
                }
                _subscribe(k) {
                    return this._throwIfClosed(),
                    this._checkFinalizedStatuses(k),
                    this._innerSubscribe(k)
                }
                _innerSubscribe(k) {
                    const {hasError: le, isStopped: ce, observers: te} = this;
                    return le || ce ? w.Lc : (this.currentObservers = null,
                    te.push(k),
                    new w.w0(()=>{
                        this.currentObservers = null,
                        (0,
                        U.P)(te, k)
                    }
                    ))
                }
                _checkFinalizedStatuses(k) {
                    const {hasError: le, thrownError: ce, isStopped: te} = this;
                    le ? k.error(ce) : te && k.complete()
                }
                asObservable() {
                    const k = new D.y;
                    return k.source = this,
                    k
                }
            }
            return pe.create = (Y,k)=>new xe(Y,k),
            pe
        }
        )();
        class xe extends ye {
            constructor(Y, k) {
                super(),
                this.destination = Y,
                this.source = k
            }
            next(Y) {
                var k, le;
                null === (le = null === (k = this.destination) || void 0 === k ? void 0 : k.next) || void 0 === le || le.call(k, Y)
            }
            error(Y) {
                var k, le;
                null === (le = null === (k = this.destination) || void 0 === k ? void 0 : k.error) || void 0 === le || le.call(k, Y)
            }
            complete() {
                var Y, k;
                null === (k = null === (Y = this.destination) || void 0 === Y ? void 0 : Y.complete) || void 0 === k || k.call(Y)
            }
            _subscribe(Y) {
                var k, le;
                return null !== (le = null === (k = this.source) || void 0 === k ? void 0 : k.subscribe(Y)) && void 0 !== le ? le : w.Lc
            }
        }
    }
    ,
    961: (Pe,Z,T)=>{
        T.d(Z, {
            Hp: ()=>Se,
            Lv: ()=>le
        });
        var D = T(576)
          , w = T(727)
          , X = T(416)
          , J = T(849);
        function U() {}
        const _e = pe("C", void 0, void 0);
        function pe(q, x, ne) {
            return {
                kind: q,
                value: x,
                error: ne
            }
        }
        var Y = T(410)
          , k = T(806);
        class le extends w.w0 {
            constructor(x) {
                super(),
                this.isStopped = !1,
                x ? (this.destination = x,
                (0,
                w.Nn)(x) && x.add(this)) : this.destination = Ce
            }
            static create(x, ne, Q) {
                return new Se(x,ne,Q)
            }
            next(x) {
                this.isStopped ? B(function xe(q) {
                    return pe("N", q, void 0)
                }(x), this) : this._next(x)
            }
            error(x) {
                this.isStopped ? B(function ye(q) {
                    return pe("E", void 0, q)
                }(x), this) : (this.isStopped = !0,
                this._error(x))
            }
            complete() {
                this.isStopped ? B(_e, this) : (this.isStopped = !0,
                this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                super.unsubscribe(),
                this.destination = null)
            }
            _next(x) {
                this.destination.next(x)
            }
            _error(x) {
                try {
                    this.destination.error(x)
                } finally {
                    this.unsubscribe()
                }
            }
            _complete() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
        }
        const ce = Function.prototype.bind;
        function te(q, x) {
            return ce.call(q, x)
        }
        class fe {
            constructor(x) {
                this.partialObserver = x
            }
            next(x) {
                const {partialObserver: ne} = this;
                if (ne.next)
                    try {
                        ne.next(x)
                    } catch (Q) {
                        Me(Q)
                    }
            }
            error(x) {
                const {partialObserver: ne} = this;
                if (ne.error)
                    try {
                        ne.error(x)
                    } catch (Q) {
                        Me(Q)
                    }
                else
                    Me(x)
            }
            complete() {
                const {partialObserver: x} = this;
                if (x.complete)
                    try {
                        x.complete()
                    } catch (ne) {
                        Me(ne)
                    }
            }
        }
        class Se extends le {
            constructor(x, ne, Q) {
                let H;
                if (super(),
                (0,
                D.m)(x) || !x)
                    H = {
                        next: null != x ? x : void 0,
                        error: null != ne ? ne : void 0,
                        complete: null != Q ? Q : void 0
                    };
                else {
                    let de;
                    this && X.v.useDeprecatedNextContext ? (de = Object.create(x),
                    de.unsubscribe = ()=>this.unsubscribe(),
                    H = {
                        next: x.next && te(x.next, de),
                        error: x.error && te(x.error, de),
                        complete: x.complete && te(x.complete, de)
                    }) : H = x
                }
                this.destination = new fe(H)
            }
        }
        function Me(q) {
            X.v.useDeprecatedSynchronousErrorHandling ? (0,
            k.O)(q) : (0,
            J.h)(q)
        }
        function B(q, x) {
            const {onStoppedNotification: ne} = X.v;
            ne && Y.z.setTimeout(()=>ne(q, x))
        }
        const Ce = {
            closed: !0,
            next: U,
            error: function Ue(q) {
                throw q
            },
            complete: U
        }
    }
    ,
    727: (Pe,Z,T)=>{
        T.d(Z, {
            Lc: ()=>_e,
            w0: ()=>U,
            Nn: ()=>ye
        });
        var D = T(576);
        const X = (0,
        T(888).d)(pe=>function(k) {
            pe(this),
            this.message = k ? `${k.length} errors occurred during unsubscription:\n${k.map((le,ce)=>`${ce + 1}) ${le.toString()}`).join("\n  ")}` : "",
            this.name = "UnsubscriptionError",
            this.errors = k
        }
        );
        var J = T(737);
        class U {
            constructor(Y) {
                this.initialTeardown = Y,
                this.closed = !1,
                this._parentage = null,
                this._finalizers = null
            }
            unsubscribe() {
                let Y;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage: k} = this;
                    if (k)
                        if (this._parentage = null,
                        Array.isArray(k))
                            for (const te of k)
                                te.remove(this);
                        else
                            k.remove(this);
                    const {initialTeardown: le} = this;
                    if ((0,
                    D.m)(le))
                        try {
                            le()
                        } catch (te) {
                            Y = te instanceof X ? te.errors : [te]
                        }
                    const {_finalizers: ce} = this;
                    if (ce) {
                        this._finalizers = null;
                        for (const te of ce)
                            try {
                                xe(te)
                            } catch (fe) {
                                Y = null != Y ? Y : [],
                                fe instanceof X ? Y = [...Y, ...fe.errors] : Y.push(fe)
                            }
                    }
                    if (Y)
                        throw new X(Y)
                }
            }
            add(Y) {
                var k;
                if (Y && Y !== this)
                    if (this.closed)
                        xe(Y);
                    else {
                        if (Y instanceof U) {
                            if (Y.closed || Y._hasParent(this))
                                return;
                            Y._addParent(this)
                        }
                        (this._finalizers = null !== (k = this._finalizers) && void 0 !== k ? k : []).push(Y)
                    }
            }
            _hasParent(Y) {
                const {_parentage: k} = this;
                return k === Y || Array.isArray(k) && k.includes(Y)
            }
            _addParent(Y) {
                const {_parentage: k} = this;
                this._parentage = Array.isArray(k) ? (k.push(Y),
                k) : k ? [k, Y] : Y
            }
            _removeParent(Y) {
                const {_parentage: k} = this;
                k === Y ? this._parentage = null : Array.isArray(k) && (0,
                J.P)(k, Y)
            }
            remove(Y) {
                const {_finalizers: k} = this;
                k && (0,
                J.P)(k, Y),
                Y instanceof U && Y._removeParent(this)
            }
        }
        U.EMPTY = (()=>{
            const pe = new U;
            return pe.closed = !0,
            pe
        }
        )();
        const _e = U.EMPTY;
        function ye(pe) {
            return pe instanceof U || pe && "closed"in pe && (0,
            D.m)(pe.remove) && (0,
            D.m)(pe.add) && (0,
            D.m)(pe.unsubscribe)
        }
        function xe(pe) {
            (0,
            D.m)(pe) ? pe() : pe.unsubscribe()
        }
    }
    ,
    416: (Pe,Z,T)=>{
        T.d(Z, {
            v: ()=>D
        });
        const D = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }
    }
    ,
    515: (Pe,Z,T)=>{
        T.d(Z, {
            E: ()=>w
        });
        const w = new (T(306).y)(U=>U.complete())
    }
    ,
    76: (Pe,Z,T)=>{
        T.d(Z, {
            D: ()=>Q
        });
        var D = T(421)
          , w = T(672)
          , X = T(482)
          , J = T(403);
        function U(H, de=0) {
            return (0,
            X.e)((De,M)=>{
                De.subscribe((0,
                J.x)(M, A=>(0,
                w.f)(M, H, ()=>M.next(A), de), ()=>(0,
                w.f)(M, H, ()=>M.complete(), de), A=>(0,
                w.f)(M, H, ()=>M.error(A), de)))
            }
            )
        }
        function _e(H, de=0) {
            return (0,
            X.e)((De,M)=>{
                M.add(H.schedule(()=>De.subscribe(M), de))
            }
            )
        }
        var pe = T(306)
          , k = T(202)
          , le = T(576);
        function te(H, de) {
            if (!H)
                throw new Error("Iterable cannot be null");
            return new pe.y(De=>{
                (0,
                w.f)(De, de, ()=>{
                    const M = H[Symbol.asyncIterator]();
                    (0,
                    w.f)(De, de, ()=>{
                        M.next().then(A=>{
                            A.done ? De.complete() : De.next(A.value)
                        }
                        )
                    }
                    , 0, !0)
                }
                )
            }
            )
        }
        var fe = T(670)
          , Se = T(239)
          , Me = T(144)
          , Ue = T(495)
          , B = T(206)
          , Ce = T(532)
          , q = T(260);
        function Q(H, de) {
            return de ? function ne(H, de) {
                if (null != H) {
                    if ((0,
                    fe.c)(H))
                        return function ye(H, de) {
                            return (0,
                            D.Xf)(H).pipe(_e(de), U(de))
                        }(H, de);
                    if ((0,
                    Me.z)(H))
                        return function Y(H, de) {
                            return new pe.y(De=>{
                                let M = 0;
                                return de.schedule(function() {
                                    M === H.length ? De.complete() : (De.next(H[M++]),
                                    De.closed || this.schedule())
                                })
                            }
                            )
                        }(H, de);
                    if ((0,
                    Se.t)(H))
                        return function xe(H, de) {
                            return (0,
                            D.Xf)(H).pipe(_e(de), U(de))
                        }(H, de);
                    if ((0,
                    B.D)(H))
                        return te(H, de);
                    if ((0,
                    Ue.T)(H))
                        return function ce(H, de) {
                            return new pe.y(De=>{
                                let M;
                                return (0,
                                w.f)(De, de, ()=>{
                                    M = H[k.h](),
                                    (0,
                                    w.f)(De, de, ()=>{
                                        let A, S;
                                        try {
                                            ({value: A, done: S} = M.next())
                                        } catch (R) {
                                            return void De.error(R)
                                        }
                                        S ? De.complete() : De.next(A)
                                    }
                                    , 0, !0)
                                }
                                ),
                                ()=>(0,
                                le.m)(null == M ? void 0 : M.return) && M.return()
                            }
                            )
                        }(H, de);
                    if ((0,
                    q.L)(H))
                        return function x(H, de) {
                            return te((0,
                            q.Q)(H), de)
                        }(H, de)
                }
                throw (0,
                Ce.z)(H)
            }(H, de) : (0,
            D.Xf)(H)
        }
    }
    ,
    421: (Pe,Z,T)=>{
        T.d(Z, {
            Xf: ()=>ce
        });
        var D = T(655)
          , w = T(144)
          , X = T(239)
          , J = T(306)
          , U = T(670)
          , _e = T(206)
          , ye = T(532)
          , xe = T(495)
          , pe = T(260)
          , Y = T(576)
          , k = T(849)
          , le = T(822);
        function ce(q) {
            if (q instanceof J.y)
                return q;
            if (null != q) {
                if ((0,
                U.c)(q))
                    return function te(q) {
                        return new J.y(x=>{
                            const ne = q[le.L]();
                            if ((0,
                            Y.m)(ne.subscribe))
                                return ne.subscribe(x);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        }
                        )
                    }(q);
                if ((0,
                w.z)(q))
                    return function fe(q) {
                        return new J.y(x=>{
                            for (let ne = 0; ne < q.length && !x.closed; ne++)
                                x.next(q[ne]);
                            x.complete()
                        }
                        )
                    }(q);
                if ((0,
                X.t)(q))
                    return function Se(q) {
                        return new J.y(x=>{
                            q.then(ne=>{
                                x.closed || (x.next(ne),
                                x.complete())
                            }
                            , ne=>x.error(ne)).then(null, k.h)
                        }
                        )
                    }(q);
                if ((0,
                _e.D)(q))
                    return Ue(q);
                if ((0,
                xe.T)(q))
                    return function Me(q) {
                        return new J.y(x=>{
                            for (const ne of q)
                                if (x.next(ne),
                                x.closed)
                                    return;
                            x.complete()
                        }
                        )
                    }(q);
                if ((0,
                pe.L)(q))
                    return function B(q) {
                        return Ue((0,
                        pe.Q)(q))
                    }(q)
            }
            throw (0,
            ye.z)(q)
        }
        function Ue(q) {
            return new J.y(x=>{
                (function Ce(q, x) {
                    var ne, Q, H, de;
                    return (0,
                    D.mG)(this, void 0, void 0, function*() {
                        try {
                            for (ne = (0,
                            D.KL)(q); !(Q = yield ne.next()).done; )
                                if (x.next(Q.value),
                                x.closed)
                                    return
                        } catch (De) {
                            H = {
                                error: De
                            }
                        } finally {
                            try {
                                Q && !Q.done && (de = ne.return) && (yield de.call(ne))
                            } finally {
                                if (H)
                                    throw H.error
                            }
                        }
                        x.complete()
                    })
                }
                )(q, x).catch(ne=>x.error(ne))
            }
            )
        }
    }
    ,
    754: (Pe,Z,T)=>{
        T.d(Z, {
            T: ()=>Ue
        });
        var D = T(4)
          , w = T(421)
          , X = T(482)
          , J = T(672)
          , U = T(403)
          , ye = T(576);
        function xe(B, Ce, q=1 / 0) {
            return (0,
            ye.m)(Ce) ? xe((x,ne)=>(0,
            D.U)((Q,H)=>Ce(x, Q, ne, H))((0,
            w.Xf)(B(x, ne))), q) : ("number" == typeof Ce && (q = Ce),
            (0,
            X.e)((x,ne)=>function _e(B, Ce, q, x, ne, Q, H, de) {
                const De = [];
                let M = 0
                  , A = 0
                  , S = !1;
                const R = ()=>{
                    S && !De.length && !M && Ce.complete()
                }
                  , F = re=>M < x ? $(re) : De.push(re)
                  , $ = re=>{
                    Q && Ce.next(re),
                    M++;
                    let Be = !1;
                    (0,
                    w.Xf)(q(re, A++)).subscribe((0,
                    U.x)(Ce, Je=>{
                        null == ne || ne(Je),
                        Q ? F(Je) : Ce.next(Je)
                    }
                    , ()=>{
                        Be = !0
                    }
                    , void 0, ()=>{
                        if (Be)
                            try {
                                for (M--; De.length && M < x; ) {
                                    const Je = De.shift();
                                    H ? (0,
                                    J.f)(Ce, H, ()=>$(Je)) : $(Je)
                                }
                                R()
                            } catch (Je) {
                                Ce.error(Je)
                            }
                    }
                    ))
                }
                ;
                return B.subscribe((0,
                U.x)(Ce, F, ()=>{
                    S = !0,
                    R()
                }
                )),
                ()=>{
                    null == de || de()
                }
            }(x, ne, B, q)))
        }
        var pe = T(671)
          , k = T(515);
        function ce(B) {
            return B[B.length - 1]
        }
        var Me = T(76);
        function Ue(...B) {
            const Ce = function fe(B) {
                return function le(B) {
                    return B && (0,
                    ye.m)(B.schedule)
                }(ce(B)) ? B.pop() : void 0
            }(B)
              , q = function Se(B, Ce) {
                return "number" == typeof ce(B) ? B.pop() : Ce
            }(B, 1 / 0)
              , x = B;
            return x.length ? 1 === x.length ? (0,
            w.Xf)(x[0]) : function Y(B=1 / 0) {
                return xe(pe.y, B)
            }(q)((0,
            Me.D)(x, Ce)) : k.E
        }
    }
    ,
    403: (Pe,Z,T)=>{
        T.d(Z, {
            x: ()=>w
        });
        var D = T(961);
        function w(J, U, _e, ye, xe) {
            return new X(J,U,_e,ye,xe)
        }
        class X extends D.Lv {
            constructor(U, _e, ye, xe, pe, Y) {
                super(U),
                this.onFinalize = pe,
                this.shouldUnsubscribe = Y,
                this._next = _e ? function(k) {
                    try {
                        _e(k)
                    } catch (le) {
                        U.error(le)
                    }
                }
                : super._next,
                this._error = xe ? function(k) {
                    try {
                        xe(k)
                    } catch (le) {
                        U.error(le)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._error,
                this._complete = ye ? function() {
                    try {
                        ye()
                    } catch (k) {
                        U.error(k)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._complete
            }
            unsubscribe() {
                var U;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed: _e} = this;
                    super.unsubscribe(),
                    !_e && (null === (U = this.onFinalize) || void 0 === U || U.call(this))
                }
            }
        }
    }
    ,
    4: (Pe,Z,T)=>{
        T.d(Z, {
            U: ()=>X
        });
        var D = T(482)
          , w = T(403);
        function X(J, U) {
            return (0,
            D.e)((_e,ye)=>{
                let xe = 0;
                _e.subscribe((0,
                w.x)(ye, pe=>{
                    ye.next(J.call(U, pe, xe++))
                }
                ))
            }
            )
        }
    }
    ,
    410: (Pe,Z,T)=>{
        T.d(Z, {
            z: ()=>D
        });
        const D = {
            setTimeout(w, X, ...J) {
                const {delegate: U} = D;
                return null != U && U.setTimeout ? U.setTimeout(w, X, ...J) : setTimeout(w, X, ...J)
            },
            clearTimeout(w) {
                const {delegate: X} = D;
                return ((null == X ? void 0 : X.clearTimeout) || clearTimeout)(w)
            },
            delegate: void 0
        }
    }
    ,
    202: (Pe,Z,T)=>{
        T.d(Z, {
            h: ()=>w
        });
        const w = function D() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }()
    }
    ,
    822: (Pe,Z,T)=>{
        T.d(Z, {
            L: ()=>D
        });
        const D = "function" == typeof Symbol && Symbol.observable || "@@observable"
    }
    ,
    737: (Pe,Z,T)=>{
        function D(w, X) {
            if (w) {
                const J = w.indexOf(X);
                0 <= J && w.splice(J, 1)
            }
        }
        T.d(Z, {
            P: ()=>D
        })
    }
    ,
    888: (Pe,Z,T)=>{
        function D(w) {
            const J = w(U=>{
                Error.call(U),
                U.stack = (new Error).stack
            }
            );
            return J.prototype = Object.create(Error.prototype),
            J.prototype.constructor = J,
            J
        }
        T.d(Z, {
            d: ()=>D
        })
    }
    ,
    806: (Pe,Z,T)=>{
        T.d(Z, {
            O: ()=>J,
            x: ()=>X
        });
        var D = T(416);
        let w = null;
        function X(U) {
            if (D.v.useDeprecatedSynchronousErrorHandling) {
                const _e = !w;
                if (_e && (w = {
                    errorThrown: !1,
                    error: null
                }),
                U(),
                _e) {
                    const {errorThrown: ye, error: xe} = w;
                    if (w = null,
                    ye)
                        throw xe
                }
            } else
                U()
        }
        function J(U) {
            D.v.useDeprecatedSynchronousErrorHandling && w && (w.errorThrown = !0,
            w.error = U)
        }
    }
    ,
    672: (Pe,Z,T)=>{
        function D(w, X, J, U=0, _e=!1) {
            const ye = X.schedule(function() {
                J(),
                _e ? w.add(this.schedule(null, U)) : this.unsubscribe()
            }, U);
            if (w.add(ye),
            !_e)
                return ye
        }
        T.d(Z, {
            f: ()=>D
        })
    }
    ,
    671: (Pe,Z,T)=>{
        function D(w) {
            return w
        }
        T.d(Z, {
            y: ()=>D
        })
    }
    ,
    144: (Pe,Z,T)=>{
        T.d(Z, {
            z: ()=>D
        });
        const D = w=>w && "number" == typeof w.length && "function" != typeof w
    }
    ,
    206: (Pe,Z,T)=>{
        T.d(Z, {
            D: ()=>w
        });
        var D = T(576);
        function w(X) {
            return Symbol.asyncIterator && (0,
            D.m)(null == X ? void 0 : X[Symbol.asyncIterator])
        }
    }
    ,
    576: (Pe,Z,T)=>{
        function D(w) {
            return "function" == typeof w
        }
        T.d(Z, {
            m: ()=>D
        })
    }
    ,
    670: (Pe,Z,T)=>{
        T.d(Z, {
            c: ()=>X
        });
        var D = T(822)
          , w = T(576);
        function X(J) {
            return (0,
            w.m)(J[D.L])
        }
    }
    ,
    495: (Pe,Z,T)=>{
        T.d(Z, {
            T: ()=>X
        });
        var D = T(202)
          , w = T(576);
        function X(J) {
            return (0,
            w.m)(null == J ? void 0 : J[D.h])
        }
    }
    ,
    239: (Pe,Z,T)=>{
        T.d(Z, {
            t: ()=>w
        });
        var D = T(576);
        function w(X) {
            return (0,
            D.m)(null == X ? void 0 : X.then)
        }
    }
    ,
    260: (Pe,Z,T)=>{
        T.d(Z, {
            L: ()=>J,
            Q: ()=>X
        });
        var D = T(655)
          , w = T(576);
        function X(U) {
            return (0,
            D.FC)(this, arguments, function*() {
                const ye = U.getReader();
                try {
                    for (; ; ) {
                        const {value: xe, done: pe} = yield(0,
                        D.qq)(ye.read());
                        if (pe)
                            return yield(0,
                            D.qq)(void 0);
                        yield yield(0,
                        D.qq)(xe)
                    }
                } finally {
                    ye.releaseLock()
                }
            })
        }
        function J(U) {
            return (0,
            w.m)(null == U ? void 0 : U.getReader)
        }
    }
    ,
    482: (Pe,Z,T)=>{
        T.d(Z, {
            e: ()=>X
        });
        var D = T(576);
        function X(J) {
            return U=>{
                if (function w(J) {
                    return (0,
                    D.m)(null == J ? void 0 : J.lift)
                }(U))
                    return U.lift(function(_e) {
                        try {
                            return J(_e, this)
                        } catch (ye) {
                            this.error(ye)
                        }
                    });
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }
    }
    ,
    849: (Pe,Z,T)=>{
        T.d(Z, {
            h: ()=>X
        });
        var D = T(416)
          , w = T(410);
        function X(J) {
            w.z.setTimeout(()=>{
                const {onUnhandledError: U} = D.v;
                if (!U)
                    throw J;
                U(J)
            }
            )
        }
    }
    ,
    532: (Pe,Z,T)=>{
        function D(w) {
            return new TypeError(`You provided ${null !== w && "object" == typeof w ? "an invalid object" : `'${w}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
        }
        T.d(Z, {
            z: ()=>D
        })
    }
    ,
    655: (Pe,Z,T)=>{
        function xe(M, A, S, R) {
            return new (S || (S = Promise))(function($, re) {
                function Be(Dt) {
                    try {
                        Ae(R.next(Dt))
                    } catch (Bt) {
                        re(Bt)
                    }
                }
                function Je(Dt) {
                    try {
                        Ae(R.throw(Dt))
                    } catch (Bt) {
                        re(Bt)
                    }
                }
                function Ae(Dt) {
                    Dt.done ? $(Dt.value) : function F($) {
                        return $instanceof S ? $ : new S(function(re) {
                            re($)
                        }
                        )
                    }(Dt.value).then(Be, Je)
                }
                Ae((R = R.apply(M, A || [])).next())
            }
            )
        }
        function Me(M) {
            return this instanceof Me ? (this.v = M,
            this) : new Me(M)
        }
        function Ue(M, A, S) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var F, R = S.apply(M, A || []), $ = [];
            return F = {},
            re("next"),
            re("throw"),
            re("return"),
            F[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            F;
            function re(ut) {
                R[ut] && (F[ut] = function(bt) {
                    return new Promise(function(Ht, ot) {
                        $.push([ut, bt, Ht, ot]) > 1 || Be(ut, bt)
                    }
                    )
                }
                )
            }
            function Be(ut, bt) {
                try {
                    !function Je(ut) {
                        ut.value instanceof Me ? Promise.resolve(ut.value.v).then(Ae, Dt) : Bt($[0][2], ut)
                    }(R[ut](bt))
                } catch (Ht) {
                    Bt($[0][3], Ht)
                }
            }
            function Ae(ut) {
                Be("next", ut)
            }
            function Dt(ut) {
                Be("throw", ut)
            }
            function Bt(ut, bt) {
                ut(bt),
                $.shift(),
                $.length && Be($[0][0], $[0][1])
            }
        }
        function Ce(M) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var S, A = M[Symbol.asyncIterator];
            return A ? A.call(M) : (M = function le(M) {
                var A = "function" == typeof Symbol && Symbol.iterator
                  , S = A && M[A]
                  , R = 0;
                if (S)
                    return S.call(M);
                if (M && "number" == typeof M.length)
                    return {
                        next: function() {
                            return M && R >= M.length && (M = void 0),
                            {
                                value: M && M[R++],
                                done: !M
                            }
                        }
                    };
                throw new TypeError(A ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }(M),
            S = {},
            R("next"),
            R("throw"),
            R("return"),
            S[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            S);
            function R($) {
                S[$] = M[$] && function(re) {
                    return new Promise(function(Be, Je) {
                        !function F($, re, Be, Je) {
                            Promise.resolve(Je).then(function(Ae) {
                                $({
                                    value: Ae,
                                    done: Be
                                })
                            }, re)
                        }(Be, Je, (re = M[$](re)).done, re.value)
                    }
                    )
                }
            }
        }
        function H(M, A, S, R) {
            if ("a" === S && !R)
                throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof A ? M !== A || !R : !A.has(M))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === S ? R : "a" === S ? R.call(M) : R ? R.value : A.get(M)
        }
        function de(M, A, S, R, F) {
            if ("m" === R)
                throw new TypeError("Private method is not writable");
            if ("a" === R && !F)
                throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof A ? M !== A || !F : !A.has(M))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === R ? F.call(M, S) : F ? F.value = S : A.set(M, S),
            S
        }
        T.d(Z, {
            FC: ()=>Ue,
            KL: ()=>Ce,
            Q_: ()=>H,
            YH: ()=>de,
            mG: ()=>xe,
            qq: ()=>Me
        })
    }
    ,
    808: (Pe,Z,T)=>{
        T.d(Z, {
            HT: ()=>U,
            JF: ()=>so,
            K0: ()=>ye,
            Mx: ()=>wn,
            Ov: ()=>cs,
            PC: ()=>Tt,
            bD: ()=>io,
            ez: ()=>oo,
            q: ()=>X,
            w_: ()=>_e
        });
        var D = T(923);
        let w = null;
        function X() {
            return w
        }
        function U(l) {
            w || (w = l)
        }
        class _e {
        }
        const ye = new D.OlP("DocumentToken");
        function wn(l, h) {
            h = encodeURIComponent(h);
            for (const d of l.split(";")) {
                const p = d.indexOf("=")
                  , [_,N] = -1 == p ? [d, ""] : [d.slice(0, p), d.slice(p + 1)];
                if (_.trim() === h)
                    return decodeURIComponent(N)
            }
            return null
        }
        let Tt = (()=>{
            class l {
                constructor(d, p, _) {
                    this._ngEl = d,
                    this._differs = p,
                    this._renderer = _,
                    this._ngStyle = null,
                    this._differ = null
                }
                set ngStyle(d) {
                    this._ngStyle = d,
                    !this._differ && d && (this._differ = this._differs.find(d).create())
                }
                ngDoCheck() {
                    if (this._differ) {
                        const d = this._differ.diff(this._ngStyle);
                        d && this._applyChanges(d)
                    }
                }
                _setStyle(d, p) {
                    const [_,N] = d.split(".");
                    null != (p = null != p && N ? `${p}${N}` : p) ? this._renderer.setStyle(this._ngEl.nativeElement, _, p) : this._renderer.removeStyle(this._ngEl.nativeElement, _)
                }
                _applyChanges(d) {
                    d.forEachRemovedItem(p=>this._setStyle(p.key, null)),
                    d.forEachAddedItem(p=>this._setStyle(p.key, p.currentValue)),
                    d.forEachChangedItem(p=>this._setStyle(p.key, p.currentValue))
                }
            }
            return l.\u0275fac = function(d) {
                return new (d || l)(D.Y36(D.SBq),D.Y36(D.aQg),D.Y36(D.Qsj))
            }
            ,
            l.\u0275dir = D.lG2({
                type: l,
                selectors: [["", "ngStyle", ""]],
                inputs: {
                    ngStyle: "ngStyle"
                }
            }),
            l
        }
        )();
        class as {
            createSubscription(h, d) {
                return h.subscribe({
                    next: d,
                    error: p=>{
                        throw p
                    }
                })
            }
            dispose(h) {
                h.unsubscribe()
            }
            onDestroy(h) {
                h.unsubscribe()
            }
        }
        class Wu {
            createSubscription(h, d) {
                return h.then(d, p=>{
                    throw p
                }
                )
            }
            dispose(h) {}
            onDestroy(h) {}
        }
        const us = new Wu
          , ls = new as;
        let cs = (()=>{
            class l {
                constructor(d) {
                    this._ref = d,
                    this._latestValue = null,
                    this._subscription = null,
                    this._obj = null,
                    this._strategy = null
                }
                ngOnDestroy() {
                    this._subscription && this._dispose()
                }
                transform(d) {
                    return this._obj ? d !== this._obj ? (this._dispose(),
                    this.transform(d)) : this._latestValue : (d && this._subscribe(d),
                    this._latestValue)
                }
                _subscribe(d) {
                    this._obj = d,
                    this._strategy = this._selectStrategy(d),
                    this._subscription = this._strategy.createSubscription(d, p=>this._updateLatestValue(d, p))
                }
                _selectStrategy(d) {
                    if ((0,
                    D.QGY)(d))
                        return us;
                    if ((0,
                    D.F4k)(d))
                        return ls;
                    throw function nt(l, h) {
                        return new D.vHH(2100,"")
                    }()
                }
                _dispose() {
                    this._strategy.dispose(this._subscription),
                    this._latestValue = null,
                    this._subscription = null,
                    this._obj = null
                }
                _updateLatestValue(d, p) {
                    d === this._obj && (this._latestValue = p,
                    this._ref.markForCheck())
                }
            }
            return l.\u0275fac = function(d) {
                return new (d || l)(D.Y36(D.sBO, 16))
            }
            ,
            l.\u0275pipe = D.Yjl({
                name: "async",
                type: l,
                pure: !1
            }),
            l
        }
        )()
          , oo = (()=>{
            class l {
            }
            return l.\u0275fac = function(d) {
                return new (d || l)
            }
            ,
            l.\u0275mod = D.oAB({
                type: l
            }),
            l.\u0275inj = D.cJS({}),
            l
        }
        )();
        const io = "browser";
        class so {
        }
    }
    ,
    923: (Pe,Z,T)=>{
        T.d(Z, {
            AFp: ()=>Cp,
            ip1: ()=>_p,
            CZH: ()=>es,
            hGG: ()=>sw,
            z2F: ()=>ns,
            sBO: ()=>GC,
            _Vd: ()=>jo,
            EJc: ()=>MC,
            SBq: ()=>Bo,
            qLn: ()=>bo,
            OlP: ()=>Ye,
            zs3: ()=>mn,
            ZZ4: ()=>Ru,
            aQg: ()=>Ou,
            soG: ()=>ts,
            h0i: ()=>tr,
            R0b: ()=>jt,
            Lbi: ()=>CC,
            g9A: ()=>Ip,
            Qsj: ()=>f_,
            FYo: ()=>Ph,
            JOm: ()=>gn,
            WD2: ()=>fs,
            Rgc: ()=>Go,
            dDg: ()=>RC,
            eoX: ()=>Ap,
            GfV: ()=>Rh,
            s_b: ()=>Zi,
            ifc: ()=>Xe,
            hM9: ()=>C_,
            eFA: ()=>Pp,
            G48: ()=>UC,
            _c5: ()=>iw,
            zSh: ()=>la,
            wAp: ()=>he,
            vHH: ()=>x,
            lri: ()=>Tp,
            rWj: ()=>Sp,
            cg1: ()=>nu,
            kL8: ()=>rh,
            dqk: ()=>We,
            sIi: ()=>No,
            QGY: ()=>qa,
            F4k: ()=>lf,
            RDi: ()=>l,
            AaK: ()=>fe,
            TTD: ()=>oo,
            jDz: ()=>Vh,
            xp6: ()=>jc,
            ekj: ()=>Xa,
            Xpm: ()=>Ln,
            lG2: ()=>lr,
            Yz7: ()=>vt,
            cJS: ()=>Pn,
            oAB: ()=>ar,
            Yjl: ()=>cr,
            Y36: ()=>Sr,
            _UZ: ()=>Wa,
            qZA: ()=>Ui,
            TgZ: ()=>$i,
            LFG: ()=>at,
            $8M: ()=>As,
            NdJ: ()=>Qa,
            CRH: ()=>Xh,
            ALo: ()=>Gh,
            lcZ: ()=>zh,
            Q6J: ()=>Ua,
            iGM: ()=>Zh,
            _uU: ()=>Lf,
            Gf: ()=>Jh
        });
        var D = T(579)
          , w = T(727)
          , X = T(306)
          , J = T(754)
          , U = T(76)
          , _e = T(515)
          , ye = T(482)
          , xe = T(403)
          , Y = T(961);
        function le(e, t, ...n) {
            return !0 === t ? (e(),
            null) : !1 === t ? null : t(...n).pipe(function pe(e) {
                return e <= 0 ? ()=>_e.E : (0,
                ye.e)((t,n)=>{
                    let r = 0;
                    t.subscribe((0,
                    xe.x)(n, o=>{
                        ++r <= e && (n.next(o),
                        e <= r && n.complete())
                    }
                    ))
                }
                )
            }(1)).subscribe(()=>e())
        }
        function ce(e) {
            for (let t in e)
                if (e[t] === ce)
                    return t;
            throw Error("Could not find renamed property on target object.")
        }
        function fe(e) {
            if ("string" == typeof e)
                return e;
            if (Array.isArray(e))
                return "[" + e.map(fe).join(", ") + "]";
            if (null == e)
                return "" + e;
            if (e.overriddenName)
                return `${e.overriddenName}`;
            if (e.name)
                return `${e.name}`;
            const t = e.toString();
            if (null == t)
                return "" + t;
            const n = t.indexOf("\n");
            return -1 === n ? t : t.substring(0, n)
        }
        function Se(e, t) {
            return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t
        }
        const Me = ce({
            __forward_ref__: ce
        });
        function Ue(e) {
            return e.__forward_ref__ = Ue,
            e.toString = function() {
                return fe(this())
            }
            ,
            e
        }
        function B(e) {
            return function Ce(e) {
                return "function" == typeof e && e.hasOwnProperty(Me) && e.__forward_ref__ === Ue
            }(e) ? e() : e
        }
        class x extends Error {
            constructor(t, n) {
                super(function ne(e, t) {
                    return `NG0${Math.abs(e)}${t ? ": " + t : ""}`
                }(t, n)),
                this.code = t
            }
        }
        function H(e) {
            return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : function Q(e) {
                return "string" == typeof e ? e : null == e ? "" : String(e)
            }(e)
        }
        function A(e, t) {
            throw new x(-201,!1)
        }
        function ot(e, t) {
            null == e && function Te(e, t, n, r) {
                throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
            }(t, e, null, "!=")
        }
        function vt(e) {
            return {
                token: e.token,
                providedIn: e.providedIn || null,
                factory: e.factory,
                value: void 0
            }
        }
        function Pn(e) {
            return {
                providers: e.providers || [],
                imports: e.imports || []
            }
        }
        function Rn(e) {
            return zn(e, Ut) || zn(e, Zr)
        }
        function zn(e, t) {
            return e.hasOwnProperty(t) ? e[t] : null
        }
        function Et(e) {
            return e && (e.hasOwnProperty(Wn) || e.hasOwnProperty(Jr)) ? e[Wn] : null
        }
        const Ut = ce({
            \u0275prov: ce
        })
          , Wn = ce({
            \u0275inj: ce
        })
          , Zr = ce({
            ngInjectableDef: ce
        })
          , Jr = ce({
            ngInjectorDef: ce
        });
        var ge = (()=>((ge = ge || {})[ge.Default = 0] = "Default",
        ge[ge.Host = 1] = "Host",
        ge[ge.Self = 2] = "Self",
        ge[ge.SkipSelf = 4] = "SkipSelf",
        ge[ge.Optional = 8] = "Optional",
        ge))();
        let tn;
        function je(e) {
            const t = tn;
            return tn = e,
            t
        }
        function ue(e, t, n) {
            const r = Rn(e);
            return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & ge.Optional ? null : void 0 !== t ? t : void A(fe(e))
        }
        function Gt(e) {
            return {
                toString: e
            }.toString()
        }
        var dt = (()=>((dt = dt || {})[dt.OnPush = 0] = "OnPush",
        dt[dt.Default = 1] = "Default",
        dt))()
          , Xe = (()=>{
            return (e = Xe || (Xe = {}))[e.Emulated = 0] = "Emulated",
            e[e.None = 2] = "None",
            e[e.ShadowDom = 3] = "ShadowDom",
            Xe;
            var e
        }
        )();
        const We = (()=>"undefined" != typeof globalThis && globalThis || "undefined" != typeof global && global || "undefined" != typeof window && window || "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self)()
          , Re = {}
          , Oe = []
          , zt = ce({
            \u0275cmp: ce
        })
          , ir = ce({
            \u0275dir: ce
        })
          , nn = ce({
            \u0275pipe: ce
        })
          , eo = ce({
            \u0275mod: ce
        })
          , Pt = ce({
            \u0275fac: ce
        })
          , rn = ce({
            __NG_ELEMENT_ID__: ce
        });
        let On = 0;
        function Ln(e) {
            return Gt(()=>{
                const n = !0 === e.standalone
                  , r = {}
                  , o = {
                    type: e.type,
                    providersResolver: null,
                    decls: e.decls,
                    vars: e.vars,
                    factory: null,
                    template: e.template || null,
                    consts: e.consts || null,
                    ngContentSelectors: e.ngContentSelectors,
                    hostBindings: e.hostBindings || null,
                    hostVars: e.hostVars || 0,
                    hostAttrs: e.hostAttrs || null,
                    contentQueries: e.contentQueries || null,
                    declaredInputs: r,
                    inputs: null,
                    outputs: null,
                    exportAs: e.exportAs || null,
                    onPush: e.changeDetection === dt.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    standalone: n,
                    dependencies: n && e.dependencies || null,
                    getStandaloneInjector: null,
                    selectors: e.selectors || Oe,
                    viewQuery: e.viewQuery || null,
                    features: e.features || null,
                    data: e.data || {},
                    encapsulation: e.encapsulation || Xe.Emulated,
                    id: "c",
                    styles: e.styles || Oe,
                    _: null,
                    setInput: null,
                    schemas: e.schemas || null,
                    tView: null
                }
                  , i = e.dependencies
                  , s = e.features;
                return o.id += On++,
                o.inputs = ur(e.inputs, r),
                o.outputs = ur(e.outputs),
                s && s.forEach(a=>a(o)),
                o.directiveDefs = i ? ()=>("function" == typeof i ? i() : i).map(sr).filter(to) : null,
                o.pipeDefs = i ? ()=>("function" == typeof i ? i() : i).map(ht).filter(to) : null,
                o
            }
            )
        }
        function sr(e) {
            return Ve(e) || Qe(e)
        }
        function to(e) {
            return null !== e
        }
        const Qo = {};
        function ar(e) {
            return Gt(()=>{
                const t = {
                    type: e.type,
                    bootstrap: e.bootstrap || Oe,
                    declarations: e.declarations || Oe,
                    imports: e.imports || Oe,
                    exports: e.exports || Oe,
                    transitiveCompileScopes: null,
                    schemas: e.schemas || null,
                    id: e.id || null
                };
                return null != e.id && (Qo[e.id] = e.type),
                t
            }
            )
        }
        function ur(e, t) {
            if (null == e)
                return Re;
            const n = {};
            for (const r in e)
                if (e.hasOwnProperty(r)) {
                    let o = e[r]
                      , i = o;
                    Array.isArray(o) && (i = o[1],
                    o = o[0]),
                    n[o] = r,
                    t && (t[o] = i)
                }
            return n
        }
        const lr = Ln;
        function cr(e) {
            return {
                type: e.type,
                name: e.name,
                factory: null,
                pure: !1 !== e.pure,
                standalone: !0 === e.standalone,
                onDestroy: e.type.prototype.ngOnDestroy || null
            }
        }
        function Ve(e) {
            return e[zt] || null
        }
        function Qe(e) {
            return e[ir] || null
        }
        function ht(e) {
            return e[nn] || null
        }
        const E = 18
          , m = 19
          , b = 22;
        function ae(e) {
            return Array.isArray(e) && "object" == typeof e[1]
        }
        function we(e) {
            return Array.isArray(e) && !0 === e[1]
        }
        function Tt(e) {
            return 0 != (8 & e.flags)
        }
        function cn(e) {
            return 2 == (2 & e.flags)
        }
        function dn(e) {
            return 1 == (1 & e.flags)
        }
        function nt(e) {
            return null !== e.template
        }
        function as(e) {
            return 0 != (256 & e[2])
        }
        function Mn(e, t) {
            return e.hasOwnProperty(Pt) ? e[Pt] : null
        }
        class fs {
            constructor(t, n, r) {
                this.previousValue = t,
                this.currentValue = n,
                this.firstChange = r
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        function oo() {
            return io
        }
        function io(e) {
            return e.type.prototype.ngOnChanges && (e.setInput = ps),
            hs
        }
        function hs() {
            const e = gs(this)
              , t = null == e ? void 0 : e.current;
            if (t) {
                const n = e.previous;
                if (n === Re)
                    e.previous = t;
                else
                    for (let r in t)
                        n[r] = t[r];
                e.current = null,
                this.ngOnChanges(t)
            }
        }
        function ps(e, t, n, r) {
            const o = gs(e) || function sl(e, t) {
                return e[ti] = t
            }(e, {
                previous: Re,
                current: null
            })
              , i = o.current || (o.current = {})
              , s = o.previous
              , a = this.declaredInputs[n]
              , u = s[a];
            i[a] = new fs(u && u.currentValue,t,s === Re),
            e[r] = t
        }
        oo.ngInherit = !0;
        const ti = "__ngSimpleChanges__";
        function gs(e) {
            return e[ti] || null
        }
        let so;
        function l(e) {
            so = e
        }
        function p(e) {
            return !!e.listen
        }
        const _ = {
            createRenderer: (e,t)=>function h() {
                return void 0 !== so ? so : "undefined" != typeof document ? document : void 0
            }()
        };
        function O(e) {
            for (; Array.isArray(e); )
                e = e[0];
            return e
        }
        function Fe(e, t) {
            return O(t[e.index])
        }
        function lt(e, t) {
            return e.data[t]
        }
        function ze(e, t) {
            const n = t[e];
            return ae(n) ? n : n[0]
        }
        function jn(e) {
            return 4 == (4 & e[2])
        }
        function qt(e) {
            return 64 == (64 & e[2])
        }
        function St(e, t) {
            return null == t ? null : e[t]
        }
        function ao(e) {
            e[E] = 0
        }
        function qn(e, t) {
            e[5] += t;
            let n = e
              , r = e[3];
            for (; null !== r && (1 === t && 1 === n[5] || -1 === t && 0 === n[5]); )
                r[5] += t,
                n = r,
                r = r[3]
        }
        const me = {
            lFrame: Dl(null),
            bindingsEnabled: !0
        };
        function dl() {
            return me.bindingsEnabled
        }
        function V() {
            return me.lFrame.lView
        }
        function ke() {
            return me.lFrame.tView
        }
        function gt() {
            let e = fl();
            for (; null !== e && 64 === e.type; )
                e = e.parent;
            return e
        }
        function fl() {
            return me.lFrame.currentTNode
        }
        function fn(e, t) {
            const n = me.lFrame;
            n.currentTNode = e,
            n.isParent = t
        }
        function ys() {
            return me.lFrame.isParent
        }
        function sg(e, t) {
            const n = me.lFrame;
            n.bindingIndex = n.bindingRootIndex = e,
            vs(t)
        }
        function vs(e) {
            me.lFrame.currentDirectiveIndex = e
        }
        function gl() {
            return me.lFrame.currentQueryIndex
        }
        function _s(e) {
            me.lFrame.currentQueryIndex = e
        }
        function ug(e) {
            const t = e[1];
            return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null
        }
        function ml(e, t, n) {
            if (n & ge.SkipSelf) {
                let o = t
                  , i = e;
                for (; !(o = o.parent,
                null !== o || n & ge.Host || (o = ug(i),
                null === o || (i = i[15],
                10 & o.type))); )
                    ;
                if (null === o)
                    return !1;
                t = o,
                e = i
            }
            const r = me.lFrame = yl();
            return r.currentTNode = t,
            r.lView = e,
            !0
        }
        function ii(e) {
            const t = yl()
              , n = e[1];
            me.lFrame = t,
            t.currentTNode = n.firstChild,
            t.lView = e,
            t.tView = n,
            t.contextLView = e,
            t.bindingIndex = n.bindingStartIndex,
            t.inI18n = !1
        }
        function yl() {
            const e = me.lFrame
              , t = null === e ? null : e.child;
            return null === t ? Dl(e) : t
        }
        function Dl(e) {
            const t = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: e,
                child: null,
                inI18n: !1
            };
            return null !== e && (e.child = t),
            t
        }
        function vl() {
            const e = me.lFrame;
            return me.lFrame = e.parent,
            e.currentTNode = null,
            e.lView = null,
            e
        }
        const El = vl;
        function si() {
            const e = vl();
            e.isParent = !0,
            e.tView = null,
            e.selectedIndex = -1,
            e.contextLView = null,
            e.elementDepthCount = 0,
            e.currentDirectiveIndex = -1,
            e.currentNamespace = null,
            e.bindingRootIndex = -1,
            e.bindingIndex = -1,
            e.currentQueryIndex = 0
        }
        function xt() {
            return me.lFrame.selectedIndex
        }
        function Bn(e) {
            me.lFrame.selectedIndex = e
        }
        function ai(e, t) {
            for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
                const i = e.data[n].type.prototype
                  , {ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: u, ngAfterViewChecked: c, ngOnDestroy: f} = i;
                s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
                a && ((e.contentHooks || (e.contentHooks = [])).push(n, a),
                (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
                u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
                c && ((e.viewHooks || (e.viewHooks = [])).push(n, c),
                (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, c)),
                null != f && (e.destroyHooks || (e.destroyHooks = [])).push(n, f)
            }
        }
        function ui(e, t, n) {
            _l(e, t, 3, n)
        }
        function li(e, t, n, r) {
            (3 & e[2]) === n && _l(e, t, n, r)
        }
        function Cs(e, t) {
            let n = e[2];
            (3 & n) === t && (n &= 2047,
            n += 1,
            e[2] = n)
        }
        function _l(e, t, n, r) {
            const i = null != r ? r : -1
              , s = t.length - 1;
            let a = 0;
            for (let u = void 0 !== r ? 65535 & e[E] : 0; u < s; u++)
                if ("number" == typeof t[u + 1]) {
                    if (a = t[u],
                    null != r && a >= r)
                        break
                } else
                    t[u] < 0 && (e[E] += 65536),
                    (a < i || -1 == i) && (yg(e, n, t, u),
                    e[E] = (4294901760 & e[E]) + u + 2),
                    u++
        }
        function yg(e, t, n, r) {
            const o = n[r] < 0
              , i = n[r + 1]
              , a = e[o ? -n[r] : n[r]];
            if (o) {
                if (e[2] >> 11 < e[E] >> 16 && (3 & e[2]) === t) {
                    e[2] += 2048;
                    try {
                        i.call(a)
                    } finally {}
                }
            } else
                try {
                    i.call(a)
                } finally {}
        }
        class lo {
            constructor(t, n, r) {
                this.factory = t,
                this.resolving = !1,
                this.canSeeViewProviders = n,
                this.injectImpl = r
            }
        }
        function ci(e, t, n) {
            const r = p(e);
            let o = 0;
            for (; o < n.length; ) {
                const i = n[o];
                if ("number" == typeof i) {
                    if (0 !== i)
                        break;
                    o++;
                    const s = n[o++]
                      , a = n[o++]
                      , u = n[o++];
                    r ? e.setAttribute(t, a, u, s) : t.setAttributeNS(s, a, u)
                } else {
                    const s = i
                      , a = n[++o];
                    Is(s) ? r && e.setProperty(t, s, a) : r ? e.setAttribute(t, s, a) : t.setAttribute(s, a),
                    o++
                }
            }
            return o
        }
        function Cl(e) {
            return 3 === e || 4 === e || 6 === e
        }
        function Is(e) {
            return 64 === e.charCodeAt(0)
        }
        function di(e, t) {
            if (null !== t && 0 !== t.length)
                if (null === e || 0 === e.length)
                    e = t.slice();
                else {
                    let n = -1;
                    for (let r = 0; r < t.length; r++) {
                        const o = t[r];
                        "number" == typeof o ? n = o : 0 === n || wl(e, n, o, null, -1 === n || 2 === n ? t[++r] : null)
                    }
                }
            return e
        }
        function wl(e, t, n, r, o) {
            let i = 0
              , s = e.length;
            if (-1 === t)
                s = -1;
            else
                for (; i < e.length; ) {
                    const a = e[i++];
                    if ("number" == typeof a) {
                        if (a === t) {
                            s = -1;
                            break
                        }
                        if (a > t) {
                            s = i - 1;
                            break
                        }
                    }
                }
            for (; i < e.length; ) {
                const a = e[i];
                if ("number" == typeof a)
                    break;
                if (a === n) {
                    if (null === r)
                        return void (null !== o && (e[i + 1] = o));
                    if (r === e[i + 1])
                        return void (e[i + 2] = o)
                }
                i++,
                null !== r && i++,
                null !== o && i++
            }
            -1 !== s && (e.splice(s, 0, t),
            i = s + 1),
            e.splice(i++, 0, n),
            null !== r && e.splice(i++, 0, r),
            null !== o && e.splice(i++, 0, o)
        }
        function Il(e) {
            return -1 !== e
        }
        function pr(e) {
            return 32767 & e
        }
        function gr(e, t) {
            let n = function Cg(e) {
                return e >> 16
            }(e)
              , r = t;
            for (; n > 0; )
                r = r[15],
                n--;
            return r
        }
        let Ms = !0;
        function fi(e) {
            const t = Ms;
            return Ms = e,
            t
        }
        let wg = 0;
        const hn = {};
        function fo(e, t) {
            const n = Ts(e, t);
            if (-1 !== n)
                return n;
            const r = t[1];
            r.firstCreatePass && (e.injectorIndex = t.length,
            bs(r.data, e),
            bs(t, null),
            bs(r.blueprint, null));
            const o = hi(e, t)
              , i = e.injectorIndex;
            if (Il(o)) {
                const s = pr(o)
                  , a = gr(o, t)
                  , u = a[1].data;
                for (let c = 0; c < 8; c++)
                    t[i + c] = a[s + c] | u[s + c]
            }
            return t[i + 8] = o,
            i
        }
        function bs(e, t) {
            e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
        }
        function Ts(e, t) {
            return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === t[e.injectorIndex + 8] ? -1 : e.injectorIndex
        }
        function hi(e, t) {
            if (e.parent && -1 !== e.parent.injectorIndex)
                return e.parent.injectorIndex;
            let n = 0
              , r = null
              , o = t;
            for (; null !== o; ) {
                if (r = Pl(o),
                null === r)
                    return -1;
                if (n++,
                o = o[15],
                -1 !== r.injectorIndex)
                    return r.injectorIndex | n << 16
            }
            return -1
        }
        function pi(e, t, n) {
            !function Ig(e, t, n) {
                let r;
                "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(rn) && (r = n[rn]),
                null == r && (r = n[rn] = wg++);
                const o = 255 & r;
                t.data[e + (o >> 5)] |= 1 << o
            }(e, t, n)
        }
        function Tl(e, t, n) {
            if (n & ge.Optional)
                return e;
            A()
        }
        function Sl(e, t, n, r) {
            if (n & ge.Optional && void 0 === r && (r = null),
            0 == (n & (ge.Self | ge.Host))) {
                const o = e[9]
                  , i = je(void 0);
                try {
                    return o ? o.get(t, r, n & ge.Optional) : ue(t, r, n & ge.Optional)
                } finally {
                    je(i)
                }
            }
            return Tl(r, 0, n)
        }
        function Al(e, t, n, r=ge.Default, o) {
            if (null !== e) {
                if (1024 & t[2]) {
                    const s = function xg(e, t, n, r, o) {
                        let i = e
                          , s = t;
                        for (; null !== i && null !== s && 1024 & s[2] && !(256 & s[2]); ) {
                            const a = xl(i, s, n, r | ge.Self, hn);
                            if (a !== hn)
                                return a;
                            let u = i.parent;
                            if (!u) {
                                const c = s[21];
                                if (c) {
                                    const f = c.get(n, hn, r);
                                    if (f !== hn)
                                        return f
                                }
                                u = Pl(s),
                                s = s[15]
                            }
                            i = u
                        }
                        return o
                    }(e, t, n, r, hn);
                    if (s !== hn)
                        return s
                }
                const i = xl(e, t, n, r, hn);
                if (i !== hn)
                    return i
            }
            return Sl(t, n, r, o)
        }
        function xl(e, t, n, r, o) {
            const i = function Tg(e) {
                if ("string" == typeof e)
                    return e.charCodeAt(0) || 0;
                const t = e.hasOwnProperty(rn) ? e[rn] : void 0;
                return "number" == typeof t ? t >= 0 ? 255 & t : Sg : t
            }(n);
            if ("function" == typeof i) {
                if (!ml(t, e, r))
                    return r & ge.Host ? Tl(o, 0, r) : Sl(t, n, r, o);
                try {
                    const s = i(r);
                    if (null != s || r & ge.Optional)
                        return s;
                    A()
                } finally {
                    El()
                }
            } else if ("number" == typeof i) {
                let s = null
                  , a = Ts(e, t)
                  , u = -1
                  , c = r & ge.Host ? t[16][6] : null;
                for ((-1 === a || r & ge.SkipSelf) && (u = -1 === a ? hi(e, t) : t[a + 8],
                -1 !== u && Nl(r, !1) ? (s = t[1],
                a = pr(u),
                t = gr(u, t)) : a = -1); -1 !== a; ) {
                    const f = t[1];
                    if (Fl(i, a, f.data)) {
                        const y = bg(a, t, n, s, r, c);
                        if (y !== hn)
                            return y
                    }
                    u = t[a + 8],
                    -1 !== u && Nl(r, t[1].data[a + 8] === c) && Fl(i, a, t) ? (s = f,
                    a = pr(u),
                    t = gr(u, t)) : a = -1
                }
            }
            return o
        }
        function bg(e, t, n, r, o, i) {
            const s = t[1]
              , a = s.data[e + 8]
              , f = gi(a, s, n, null == r ? cn(a) && Ms : r != s && 0 != (3 & a.type), o & ge.Host && i === a);
            return null !== f ? ho(t, s, f, a) : hn
        }
        function gi(e, t, n, r, o) {
            const i = e.providerIndexes
              , s = t.data
              , a = 1048575 & i
              , u = e.directiveStart
              , f = i >> 20
              , v = o ? a + f : e.directiveEnd;
            for (let I = r ? a : a + f; I < v; I++) {
                const P = s[I];
                if (I < u && n === P || I >= u && P.type === n)
                    return I
            }
            if (o) {
                const I = s[u];
                if (I && nt(I) && I.type === n)
                    return u
            }
            return null
        }
        function ho(e, t, n, r) {
            let o = e[n];
            const i = t.data;
            if (function Dg(e) {
                return e instanceof lo
            }(o)) {
                const s = o;
                s.resolving && function de(e, t) {
                    const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
                    throw new x(-200,`Circular dependency in DI detected for ${e}${n}`)
                }(H(i[n]));
                const a = fi(s.canSeeViewProviders);
                s.resolving = !0;
                const u = s.injectImpl ? je(s.injectImpl) : null;
                ml(e, r, ge.Default);
                try {
                    o = e[n] = s.factory(void 0, i, e, r),
                    t.firstCreatePass && n >= r.directiveStart && function mg(e, t, n) {
                        const {ngOnChanges: r, ngOnInit: o, ngDoCheck: i} = t.type.prototype;
                        if (r) {
                            const s = io(t);
                            (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                            (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, s)
                        }
                        o && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                        i && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                        (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, i))
                    }(n, i[n], t)
                } finally {
                    null !== u && je(u),
                    fi(a),
                    s.resolving = !1,
                    El()
                }
            }
            return o
        }
        function Fl(e, t, n) {
            return !!(n[t + (e >> 5)] & 1 << e)
        }
        function Nl(e, t) {
            return !(e & ge.Self || e & ge.Host && t)
        }
        class mr {
            constructor(t, n) {
                this._tNode = t,
                this._lView = n
            }
            get(t, n, r) {
                return Al(this._tNode, this._lView, t, r, n)
            }
        }
        function Sg() {
            return new mr(gt(),V())
        }
        function Pl(e) {
            const t = e[1]
              , n = t.type;
            return 2 === n ? t.declTNode : 1 === n ? e[6] : null
        }
        function As(e) {
            return function Mg(e, t) {
                if ("class" === t)
                    return e.classes;
                if ("style" === t)
                    return e.styles;
                const n = e.attrs;
                if (n) {
                    const r = n.length;
                    let o = 0;
                    for (; o < r; ) {
                        const i = n[o];
                        if (Cl(i))
                            break;
                        if (0 === i)
                            o += 2;
                        else if ("number" == typeof i)
                            for (o++; o < r && "string" == typeof n[o]; )
                                o++;
                        else {
                            if (i === t)
                                return n[o + 1];
                            o += 2
                        }
                    }
                }
                return null
            }(gt(), e)
        }
        const Dr = "__parameters__";
        function Er(e, t, n) {
            return Gt(()=>{
                const r = function xs(e) {
                    return function(...n) {
                        if (e) {
                            const r = e(...n);
                            for (const o in r)
                                this[o] = r[o]
                        }
                    }
                }(t);
                function o(...i) {
                    if (this instanceof o)
                        return r.apply(this, i),
                        this;
                    const s = new o(...i);
                    return a.annotation = s,
                    a;
                    function a(u, c, f) {
                        const y = u.hasOwnProperty(Dr) ? u[Dr] : Object.defineProperty(u, Dr, {
                            value: []
                        })[Dr];
                        for (; y.length <= f; )
                            y.push(null);
                        return (y[f] = y[f] || []).push(s),
                        u
                    }
                }
                return n && (o.prototype = Object.create(n.prototype)),
                o.prototype.ngMetadataName = e,
                o.annotationCls = o,
                o
            }
            )
        }
        class Ye {
            constructor(t, n) {
                this._desc = t,
                this.ngMetadataName = "InjectionToken",
                this.\u0275prov = void 0,
                "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.\u0275prov = vt({
                    token: this,
                    providedIn: n.providedIn || "root",
                    factory: n.factory
                }))
            }
            get multi() {
                return this
            }
            toString() {
                return `InjectionToken ${this._desc}`
            }
        }
        function Lt(e, t) {
            void 0 === t && (t = e);
            for (let n = 0; n < e.length; n++) {
                let r = e[n];
                Array.isArray(r) ? (t === e && (t = e.slice(0, n)),
                Lt(r, t)) : t !== e && t.push(r)
            }
            return t
        }
        function Sn(e, t) {
            e.forEach(n=>Array.isArray(n) ? Sn(n, t) : t(n))
        }
        function Ol(e, t, n) {
            t >= e.length ? e.push(n) : e.splice(t, 0, n)
        }
        function mi(e, t) {
            return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
        }
        function kt(e, t, n) {
            let r = _r(e, t);
            return r >= 0 ? e[1 | r] = n : (r = ~r,
            function Rg(e, t, n, r) {
                let o = e.length;
                if (o == t)
                    e.push(n, r);
                else if (1 === o)
                    e.push(r, e[0]),
                    e[0] = n;
                else {
                    for (o--,
                    e.push(e[o - 1], e[o]); o > t; )
                        e[o] = e[o - 2],
                        o--;
                    e[t] = n,
                    e[t + 1] = r
                }
            }(e, r, t, n)),
            r
        }
        function Ns(e, t) {
            const n = _r(e, t);
            if (n >= 0)
                return e[1 | n]
        }
        function _r(e, t) {
            return function Vl(e, t, n) {
                let r = 0
                  , o = e.length >> n;
                for (; o !== r; ) {
                    const i = r + (o - r >> 1)
                      , s = e[i << n];
                    if (t === s)
                        return i << n;
                    s > t ? o = i : r = i + 1
                }
                return ~(o << n)
            }(e, t, 1)
        }
        const yo = {}
          , Rs = "__NG_DI_FLAG__"
          , Di = "ngTempTokenPath"
          , $g = /\n/gm
          , jl = "__source";
        let Do;
        function vi(e) {
            const t = Do;
            return Do = e,
            t
        }
        function Gg(e, t=ge.Default) {
            if (void 0 === Do)
                throw new x(203,"");
            return null === Do ? ue(e, void 0, t) : Do.get(e, t & ge.Optional ? null : void 0, t)
        }
        function at(e, t=ge.Default) {
            return (function Xr() {
                return tn
            }() || Gg)(B(e), t)
        }
        const zg = at;
        function Os(e) {
            const t = [];
            for (let n = 0; n < e.length; n++) {
                const r = B(e[n]);
                if (Array.isArray(r)) {
                    if (0 === r.length)
                        throw new x(900,"");
                    let o, i = ge.Default;
                    for (let s = 0; s < r.length; s++) {
                        const a = r[s]
                          , u = Wg(a);
                        "number" == typeof u ? -1 === u ? o = a.token : i |= u : o = a
                    }
                    t.push(at(o, i))
                } else
                    t.push(at(r))
            }
            return t
        }
        function vo(e, t) {
            return e[Rs] = t,
            e.prototype[Rs] = t,
            e
        }
        function Wg(e) {
            return e[Rs]
        }
        const Ei = vo(Er("Optional"), 8)
          , _i = vo(Er("SkipSelf"), 4);
        const Us = new Map;
        let xm = 0;
        const zs = "__ngContext__";
        function It(e, t) {
            ae(t) ? (e[zs] = t[20],
            function Nm(e) {
                Us.set(e[20], e)
            }(t)) : e[zs] = t
        }
        function Mo(e) {
            const t = e[zs];
            return "number" == typeof t ? function ac(e) {
                return Us.get(e) || null
            }(t) : t || null
        }
        function Si(e) {
            const t = Mo(e);
            return t ? ae(t) ? t : t.lView : null
        }
        function Ys(e) {
            return e.ngOriginalError
        }
        function Gm(e, ...t) {
            e.error(...t)
        }
        class bo {
            constructor() {
                this._console = console
            }
            handleError(t) {
                const n = this._findOriginalError(t)
                  , r = function Um(e) {
                    return e && e.ngErrorLogger || Gm
                }(t);
                r(this._console, "ERROR", t),
                n && r(this._console, "ORIGINAL ERROR", n)
            }
            _findOriginalError(t) {
                let n = t && Ys(t);
                for (; n && Ys(n); )
                    n = Ys(n);
                return n || null
            }
        }
        const ey = (()=>("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(We))();
        var gn = (()=>((gn = gn || {})[gn.Important = 1] = "Important",
        gn[gn.DashCase = 2] = "DashCase",
        gn))();
        function qs(e, t) {
            return undefined(e, t)
        }
        function To(e) {
            const t = e[3];
            return we(t) ? t[3] : t
        }
        function Qs(e) {
            return yc(e[13])
        }
        function Zs(e) {
            return yc(e[4])
        }
        function yc(e) {
            for (; null !== e && !we(e); )
                e = e[4];
            return e
        }
        function Mr(e, t, n, r, o) {
            if (null != r) {
                let i, s = !1;
                we(r) ? i = r : ae(r) && (s = !0,
                r = r[0]);
                const a = O(r);
                0 === e && null !== n ? null == o ? wc(t, n, a) : Qn(t, n, a, o || null, !0) : 1 === e && null !== n ? Qn(t, n, a, o || null, !0) : 2 === e ? function Fc(e, t, n) {
                    const r = Ai(e, t);
                    r && function gy(e, t, n, r) {
                        p(e) ? e.removeChild(t, n, r) : t.removeChild(n)
                    }(e, r, t, n)
                }(t, a, s) : 3 === e && t.destroyNode(a),
                null != i && function Dy(e, t, n, r, o) {
                    const i = n[7];
                    i !== O(n) && Mr(t, e, r, i, o);
                    for (let a = 10; a < n.length; a++) {
                        const u = n[a];
                        So(u[1], u, e, t, r, i)
                    }
                }(t, e, i, n, o)
            }
        }
        function Xs(e, t, n) {
            if (p(e))
                return e.createElement(t, n);
            {
                const r = null !== n ? function ll(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "http://www.w3.org/2000/svg" : "math" === t ? "http://www.w3.org/1998/MathML/" : null
                }(n) : null;
                return null === r ? e.createElement(t) : e.createElementNS(r, t)
            }
        }
        function vc(e, t) {
            const n = e[9]
              , r = n.indexOf(t)
              , o = t[3];
            512 & t[2] && (t[2] &= -513,
            qn(o, -1)),
            n.splice(r, 1)
        }
        function ea(e, t) {
            if (e.length <= 10)
                return;
            const n = 10 + t
              , r = e[n];
            if (r) {
                const o = r[17];
                null !== o && o !== e && vc(o, r),
                t > 0 && (e[n - 1][4] = r[4]);
                const i = mi(e, 10 + t);
                !function ay(e, t) {
                    So(e, t, t[11], 2, null, null),
                    t[0] = null,
                    t[6] = null
                }(r[1], r);
                const s = i[m];
                null !== s && s.detachView(i[1]),
                r[3] = null,
                r[4] = null,
                r[2] &= -65
            }
            return r
        }
        function Ec(e, t) {
            if (!(128 & t[2])) {
                const n = t[11];
                p(n) && n.destroyNode && So(e, t, n, 3, null, null),
                function cy(e) {
                    let t = e[13];
                    if (!t)
                        return ta(e[1], e);
                    for (; t; ) {
                        let n = null;
                        if (ae(t))
                            n = t[13];
                        else {
                            const r = t[10];
                            r && (n = r)
                        }
                        if (!n) {
                            for (; t && !t[4] && t !== e; )
                                ae(t) && ta(t[1], t),
                                t = t[3];
                            null === t && (t = e),
                            ae(t) && ta(t[1], t),
                            n = t && t[4]
                        }
                        t = n
                    }
                }(t)
            }
        }
        function ta(e, t) {
            if (!(128 & t[2])) {
                t[2] &= -65,
                t[2] |= 128,
                function py(e, t) {
                    let n;
                    if (null != e && null != (n = e.destroyHooks))
                        for (let r = 0; r < n.length; r += 2) {
                            const o = t[n[r]];
                            if (!(o instanceof lo)) {
                                const i = n[r + 1];
                                if (Array.isArray(i))
                                    for (let s = 0; s < i.length; s += 2) {
                                        const a = o[i[s]]
                                          , u = i[s + 1];
                                        try {
                                            u.call(a)
                                        } finally {}
                                    }
                                else
                                    try {
                                        i.call(o)
                                    } finally {}
                            }
                        }
                }(e, t),
                function hy(e, t) {
                    const n = e.cleanup
                      , r = t[7];
                    let o = -1;
                    if (null !== n)
                        for (let i = 0; i < n.length - 1; i += 2)
                            if ("string" == typeof n[i]) {
                                const s = n[i + 1]
                                  , a = "function" == typeof s ? s(t) : O(t[s])
                                  , u = r[o = n[i + 2]]
                                  , c = n[i + 3];
                                "boolean" == typeof c ? a.removeEventListener(n[i], u, c) : c >= 0 ? r[o = c]() : r[o = -c].unsubscribe(),
                                i += 2
                            } else {
                                const s = r[o = n[i + 1]];
                                n[i].call(s)
                            }
                    if (null !== r) {
                        for (let i = o + 1; i < r.length; i++)
                            r[i]();
                        t[7] = null
                    }
                }(e, t),
                1 === t[1].type && p(t[11]) && t[11].destroy();
                const n = t[17];
                if (null !== n && we(t[3])) {
                    n !== t[3] && vc(n, t);
                    const r = t[m];
                    null !== r && r.detachView(e)
                }
                !function Pm(e) {
                    Us.delete(e[20])
                }(t)
            }
        }
        function _c(e, t, n) {
            return function Cc(e, t, n) {
                let r = t;
                for (; null !== r && 40 & r.type; )
                    r = (t = r).parent;
                if (null === r)
                    return n[0];
                if (2 & r.flags) {
                    const o = e.data[r.directiveStart].encapsulation;
                    if (o === Xe.None || o === Xe.Emulated)
                        return null
                }
                return Fe(r, n)
            }(e, t.parent, n)
        }
        function Qn(e, t, n, r, o) {
            p(e) ? e.insertBefore(t, n, r, o) : (Mc(t) ? t.content : t).insertBefore(n, r, o)
        }
        function wc(e, t, n) {
            p(e) ? e.appendChild(t, n) : (Mc(t) ? t.content : t).appendChild(n)
        }
        function Ic(e, t, n, r, o) {
            null !== r ? Qn(e, t, n, r, o) : wc(e, t, n)
        }
        function Mc(e) {
            return "TEMPLATE" === e.tagName && void 0 !== e.content
        }
        function Ai(e, t) {
            return p(e) ? e.parentNode(t) : t.parentNode
        }
        let Sc = function Tc(e, t, n) {
            return 40 & e.type ? Fe(e, n) : null
        };
        function xi(e, t, n, r) {
            const o = _c(e, r, t)
              , i = t[11]
              , a = function bc(e, t, n) {
                return Sc(e, t, n)
            }(r.parent || t[6], r, t);
            if (null != o)
                if (Array.isArray(n))
                    for (let u = 0; u < n.length; u++)
                        Ic(i, o, n[u], a, !1);
                else
                    Ic(i, o, n, a, !1)
        }
        function Fi(e, t) {
            if (null !== t) {
                const n = t.type;
                if (3 & n)
                    return Fe(t, e);
                if (4 & n)
                    return ra(-1, e[t.index]);
                if (8 & n) {
                    const r = t.child;
                    if (null !== r)
                        return Fi(e, r);
                    {
                        const o = e[t.index];
                        return we(o) ? ra(-1, o) : O(o)
                    }
                }
                if (32 & n)
                    return qs(t, e)() || O(e[t.index]);
                {
                    const r = xc(e, t);
                    return null !== r ? Array.isArray(r) ? r[0] : Fi(To(e[16]), r) : Fi(e, t.next)
                }
            }
            return null
        }
        function xc(e, t) {
            return null !== t ? e[16][6].projection[t.projection] : null
        }
        function ra(e, t) {
            const n = 10 + e + 1;
            if (n < t.length) {
                const r = t[n]
                  , o = r[1].firstChild;
                if (null !== o)
                    return Fi(r, o)
            }
            return t[7]
        }
        function oa(e, t, n, r, o, i, s) {
            for (; null != n; ) {
                const a = r[n.index]
                  , u = n.type;
                if (s && 0 === t && (a && It(O(a), r),
                n.flags |= 4),
                64 != (64 & n.flags))
                    if (8 & u)
                        oa(e, t, n.child, r, o, i, !1),
                        Mr(t, e, o, a, i);
                    else if (32 & u) {
                        const c = qs(n, r);
                        let f;
                        for (; f = c(); )
                            Mr(t, e, o, f, i);
                        Mr(t, e, o, a, i)
                    } else
                        16 & u ? Nc(e, t, r, n, o, i) : Mr(t, e, o, a, i);
                n = s ? n.projectionNext : n.next
            }
        }
        function So(e, t, n, r, o, i) {
            oa(n, r, e.firstChild, t, o, i, !1)
        }
        function Nc(e, t, n, r, o, i) {
            const s = n[16]
              , u = s[6].projection[r.projection];
            if (Array.isArray(u))
                for (let c = 0; c < u.length; c++)
                    Mr(t, e, o, u[c], i);
            else
                oa(e, t, u, s[3], o, i, !0)
        }
        function Pc(e, t, n) {
            p(e) ? e.setAttribute(t, "style", n) : t.style.cssText = n
        }
        function ia(e, t, n) {
            p(e) ? "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n) : t.className = n
        }
        function Rc(e, t, n) {
            let r = e.length;
            for (; ; ) {
                const o = e.indexOf(t, n);
                if (-1 === o)
                    return o;
                if (0 === o || e.charCodeAt(o - 1) <= 32) {
                    const i = t.length;
                    if (o + i === r || e.charCodeAt(o + i) <= 32)
                        return o
                }
                n = o + 1
            }
        }
        const Oc = "ng-template";
        function Ey(e, t, n) {
            let r = 0;
            for (; r < e.length; ) {
                let o = e[r++];
                if (n && "class" === o) {
                    if (o = e[r],
                    -1 !== Rc(o.toLowerCase(), t, 0))
                        return !0
                } else if (1 === o) {
                    for (; r < e.length && "string" == typeof (o = e[r++]); )
                        if (o.toLowerCase() === t)
                            return !0;
                    return !1
                }
            }
            return !1
        }
        function Lc(e) {
            return 4 === e.type && e.value !== Oc
        }
        function _y(e, t, n) {
            return t === (4 !== e.type || n ? e.value : Oc)
        }
        function Cy(e, t, n) {
            let r = 4;
            const o = e.attrs || []
              , i = function My(e) {
                for (let t = 0; t < e.length; t++)
                    if (Cl(e[t]))
                        return t;
                return e.length
            }(o);
            let s = !1;
            for (let a = 0; a < t.length; a++) {
                const u = t[a];
                if ("number" != typeof u) {
                    if (!s)
                        if (4 & r) {
                            if (r = 2 | 1 & r,
                            "" !== u && !_y(e, u, n) || "" === u && 1 === t.length) {
                                if (Qt(r))
                                    return !1;
                                s = !0
                            }
                        } else {
                            const c = 8 & r ? u : t[++a];
                            if (8 & r && null !== e.attrs) {
                                if (!Ey(e.attrs, c, n)) {
                                    if (Qt(r))
                                        return !1;
                                    s = !0
                                }
                                continue
                            }
                            const y = wy(8 & r ? "class" : u, o, Lc(e), n);
                            if (-1 === y) {
                                if (Qt(r))
                                    return !1;
                                s = !0;
                                continue
                            }
                            if ("" !== c) {
                                let v;
                                v = y > i ? "" : o[y + 1].toLowerCase();
                                const I = 8 & r ? v : null;
                                if (I && -1 !== Rc(I, c, 0) || 2 & r && c !== v) {
                                    if (Qt(r))
                                        return !1;
                                    s = !0
                                }
                            }
                        }
                } else {
                    if (!s && !Qt(r) && !Qt(u))
                        return !1;
                    if (s && Qt(u))
                        continue;
                    s = !1,
                    r = u | 1 & r
                }
            }
            return Qt(r) || s
        }
        function Qt(e) {
            return 0 == (1 & e)
        }
        function wy(e, t, n, r) {
            if (null === t)
                return -1;
            let o = 0;
            if (r || !n) {
                let i = !1;
                for (; o < t.length; ) {
                    const s = t[o];
                    if (s === e)
                        return o;
                    if (3 === s || 6 === s)
                        i = !0;
                    else {
                        if (1 === s || 2 === s) {
                            let a = t[++o];
                            for (; "string" == typeof a; )
                                a = t[++o];
                            continue
                        }
                        if (4 === s)
                            break;
                        if (0 === s) {
                            o += 4;
                            continue
                        }
                    }
                    o += i ? 1 : 2
                }
                return -1
            }
            return function by(e, t) {
                let n = e.indexOf(4);
                if (n > -1)
                    for (n++; n < e.length; ) {
                        const r = e[n];
                        if ("number" == typeof r)
                            return -1;
                        if (r === t)
                            return n;
                        n++
                    }
                return -1
            }(t, e)
        }
        function kc(e, t, n=!1) {
            for (let r = 0; r < t.length; r++)
                if (Cy(e, t[r], n))
                    return !0;
            return !1
        }
        function Vc(e, t) {
            return e ? ":not(" + t.trim() + ")" : t
        }
        function Sy(e) {
            let t = e[0]
              , n = 1
              , r = 2
              , o = ""
              , i = !1;
            for (; n < e.length; ) {
                let s = e[n];
                if ("string" == typeof s)
                    if (2 & r) {
                        const a = e[++n];
                        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                    } else
                        8 & r ? o += "." + s : 4 & r && (o += " " + s);
                else
                    "" !== o && !Qt(s) && (t += Vc(i, o),
                    o = ""),
                    r = s,
                    i = i || !Qt(r);
                n++
            }
            return "" !== o && (t += Vc(i, o)),
            t
        }
        const Ie = {};
        function jc(e) {
            Bc(ke(), V(), xt() + e, !1)
        }
        function Bc(e, t, n, r) {
            if (!r)
                if (3 == (3 & t[2])) {
                    const i = e.preOrderCheckHooks;
                    null !== i && ui(t, i, n)
                } else {
                    const i = e.preOrderHooks;
                    null !== i && li(t, i, 0, n)
                }
            Bn(n)
        }
        const Gc = new Ye("ENVIRONMENT_INITIALIZER")
          , zc = new Ye("INJECTOR_DEF_TYPES");
        function Ly(...e) {
            return {
                \u0275providers: Wc(0, e)
            }
        }
        function Wc(e, ...t) {
            const n = []
              , r = new Set;
            let o;
            return Sn(t, i=>{
                const s = i;
                sa(s, n, [], r) && (o || (o = []),
                o.push(s))
            }
            ),
            void 0 !== o && Yc(o, n),
            n
        }
        function Yc(e, t) {
            for (let n = 0; n < e.length; n++) {
                const {providers: o} = e[n];
                Sn(o, i=>{
                    t.push(i)
                }
                )
            }
        }
        function sa(e, t, n, r) {
            if (!(e = B(e)))
                return !1;
            let o = null
              , i = Et(e);
            const s = !i && Ve(e);
            if (i || s) {
                if (s && !s.standalone)
                    return !1;
                o = e
            } else {
                const u = e.ngModule;
                if (i = Et(u),
                !i)
                    return !1;
                o = u
            }
            const a = r.has(o);
            if (s) {
                if (a)
                    return !1;
                if (r.add(o),
                s.dependencies) {
                    const u = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                    for (const c of u)
                        sa(c, t, n, r)
                }
            } else {
                if (!i)
                    return !1;
                {
                    if (null != i.imports && !a) {
                        let c;
                        r.add(o);
                        try {
                            Sn(i.imports, f=>{
                                sa(f, t, n, r) && (c || (c = []),
                                c.push(f))
                            }
                            )
                        } finally {}
                        void 0 !== c && Yc(c, t)
                    }
                    if (!a) {
                        const c = Mn(o) || (()=>new o);
                        t.push({
                            provide: o,
                            useFactory: c,
                            deps: Oe
                        }, {
                            provide: zc,
                            useValue: o,
                            multi: !0
                        }, {
                            provide: Gc,
                            useValue: ()=>at(o),
                            multi: !0
                        })
                    }
                    const u = i.providers;
                    null == u || a || Sn(u, f=>{
                        t.push(f)
                    }
                    )
                }
            }
            return o !== e && void 0 !== e.providers
        }
        const ky = ce({
            provide: String,
            useValue: ce
        });
        function aa(e) {
            return null !== e && "object" == typeof e && ky in e
        }
        function Zn(e) {
            return "function" == typeof e
        }
        const ua = new Ye("INJECTOR",-1);
        class Qc {
            get(t, n=yo) {
                if (n === yo) {
                    const r = new Error(`NullInjectorError: No provider for ${fe(t)}!`);
                    throw r.name = "NullInjectorError",
                    r
                }
                return n
            }
        }
        const la = new Ye("Set Injector scope.")
          , Ni = {}
          , jy = {};
        let ca;
        function da() {
            return void 0 === ca && (ca = new Qc),
            ca
        }
        class Ao {
        }
        class Zc extends Ao {
            constructor(t, n, r, o) {
                super(),
                this.parent = n,
                this.source = r,
                this.scopes = o,
                this.records = new Map,
                this._ngOnDestroyHooks = new Set,
                this._onDestroyHooks = [],
                this._destroyed = !1,
                ha(t, s=>this.processProvider(s)),
                this.records.set(ua, br(void 0, this)),
                o.has("environment") && this.records.set(Ao, br(void 0, this));
                const i = this.records.get(la);
                null != i && "string" == typeof i.value && this.scopes.add(i.value),
                this.injectorDefTypes = new Set(this.get(zc.multi, Oe, ge.Self))
            }
            get destroyed() {
                return this._destroyed
            }
            destroy() {
                this.assertNotDestroyed(),
                this._destroyed = !0;
                try {
                    for (const t of this._ngOnDestroyHooks)
                        t.ngOnDestroy();
                    for (const t of this._onDestroyHooks)
                        t()
                } finally {
                    this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear(),
                    this._onDestroyHooks.length = 0
                }
            }
            onDestroy(t) {
                this._onDestroyHooks.push(t)
            }
            get(t, n=yo, r=ge.Default) {
                this.assertNotDestroyed();
                const o = vi(this)
                  , i = je(void 0);
                try {
                    if (!(r & ge.SkipSelf)) {
                        let a = this.records.get(t);
                        if (void 0 === a) {
                            const u = function Gy(e) {
                                return "function" == typeof e || "object" == typeof e && e instanceof Ye
                            }(t) && Rn(t);
                            a = u && this.injectableDefInScope(u) ? br(fa(t), Ni) : null,
                            this.records.set(t, a)
                        }
                        if (null != a)
                            return this.hydrate(t, a)
                    }
                    return (r & ge.Self ? da() : this.parent).get(t, n = r & ge.Optional && n === yo ? null : n)
                } catch (s) {
                    if ("NullInjectorError" === s.name) {
                        if ((s[Di] = s[Di] || []).unshift(fe(t)),
                        o)
                            throw s;
                        return function Yg(e, t, n, r) {
                            const o = e[Di];
                            throw t[jl] && o.unshift(t[jl]),
                            e.message = function Kg(e, t, n, r=null) {
                                e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                                let o = fe(t);
                                if (Array.isArray(t))
                                    o = t.map(fe).join(" -> ");
                                else if ("object" == typeof t) {
                                    let i = [];
                                    for (let s in t)
                                        if (t.hasOwnProperty(s)) {
                                            let a = t[s];
                                            i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : fe(a)))
                                        }
                                    o = `{${i.join(", ")}}`
                                }
                                return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace($g, "\n  ")}`
                            }("\n" + e.message, o, n, r),
                            e.ngTokenPath = o,
                            e[Di] = null,
                            e
                        }(s, t, "R3InjectorError", this.source)
                    }
                    throw s
                } finally {
                    je(i),
                    vi(o)
                }
            }
            resolveInjectorInitializers() {
                const t = vi(this)
                  , n = je(void 0);
                try {
                    const r = this.get(Gc.multi, Oe, ge.Self);
                    for (const o of r)
                        o()
                } finally {
                    vi(t),
                    je(n)
                }
            }
            toString() {
                const t = []
                  , n = this.records;
                for (const r of n.keys())
                    t.push(fe(r));
                return `R3Injector[${t.join(", ")}]`
            }
            assertNotDestroyed() {
                if (this._destroyed)
                    throw new x(205,!1)
            }
            processProvider(t) {
                let n = Zn(t = B(t)) ? t : B(t && t.provide);
                const r = function Hy(e) {
                    return aa(e) ? br(void 0, e.useValue) : br(function Jc(e, t, n) {
                        let r;
                        if (Zn(e)) {
                            const o = B(e);
                            return Mn(o) || fa(o)
                        }
                        if (aa(e))
                            r = ()=>B(e.useValue);
                        else if (function qc(e) {
                            return !(!e || !e.useFactory)
                        }(e))
                            r = ()=>e.useFactory(...Os(e.deps || []));
                        else if (function Kc(e) {
                            return !(!e || !e.useExisting)
                        }(e))
                            r = ()=>at(B(e.useExisting));
                        else {
                            const o = B(e && (e.useClass || e.provide));
                            if (!function $y(e) {
                                return !!e.deps
                            }(e))
                                return Mn(o) || fa(o);
                            r = ()=>new o(...Os(e.deps))
                        }
                        return r
                    }(e), Ni)
                }(t);
                if (Zn(t) || !0 !== t.multi)
                    this.records.get(n);
                else {
                    let o = this.records.get(n);
                    o || (o = br(void 0, Ni, !0),
                    o.factory = ()=>Os(o.multi),
                    this.records.set(n, o)),
                    n = t,
                    o.multi.push(t)
                }
                this.records.set(n, r)
            }
            hydrate(t, n) {
                return n.value === Ni && (n.value = jy,
                n.value = n.factory()),
                "object" == typeof n.value && n.value && function Uy(e) {
                    return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                }(n.value) && this._ngOnDestroyHooks.add(n.value),
                n.value
            }
            injectableDefInScope(t) {
                if (!t.providedIn)
                    return !1;
                const n = B(t.providedIn);
                return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
            }
        }
        function fa(e) {
            const t = Rn(e)
              , n = null !== t ? t.factory : Mn(e);
            if (null !== n)
                return n;
            if (e instanceof Ye)
                throw new x(204,!1);
            if (e instanceof Function)
                return function By(e) {
                    const t = e.length;
                    if (t > 0)
                        throw function mo(e, t) {
                            const n = [];
                            for (let r = 0; r < e; r++)
                                n.push(t);
                            return n
                        }(t, "?"),
                        new x(204,!1);
                    const n = function qr(e) {
                        const t = e && (e[Ut] || e[Zr]);
                        if (t) {
                            const n = function Qr(e) {
                                if (e.hasOwnProperty("name"))
                                    return e.name;
                                const t = ("" + e).match(/^function\s*([^\s(]+)/);
                                return null === t ? "" : t[1]
                            }(e);
                            return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`),
                            t
                        }
                        return null
                    }(e);
                    return null !== n ? ()=>n.factory(e) : ()=>new e
                }(e);
            throw new x(204,!1)
        }
        function br(e, t, n=!1) {
            return {
                factory: e,
                value: t,
                multi: n ? [] : void 0
            }
        }
        function zy(e) {
            return !!e.\u0275providers
        }
        function ha(e, t) {
            for (const n of e)
                Array.isArray(n) ? ha(n, t) : zy(n) ? ha(n.\u0275providers, t) : t(n)
        }
        function Xc(e, t=null, n=null, r) {
            const o = ed(e, t, n, r);
            return o.resolveInjectorInitializers(),
            o
        }
        function ed(e, t=null, n=null, r, o=new Set) {
            const i = [n || Oe, Ly(e)];
            return r = r || ("object" == typeof e ? void 0 : fe(e)),
            new Zc(i,t || da(),r || null,o)
        }
        let mn = (()=>{
            class e {
                static create(n, r) {
                    var o;
                    if (Array.isArray(n))
                        return Xc({
                            name: ""
                        }, r, n, "");
                    {
                        const i = null !== (o = n.name) && void 0 !== o ? o : "";
                        return Xc({
                            name: i
                        }, n.parent, n.providers, i)
                    }
                }
            }
            return e.THROW_IF_NOT_FOUND = yo,
            e.NULL = new Qc,
            e.\u0275prov = vt({
                token: e,
                providedIn: "any",
                factory: ()=>at(ua)
            }),
            e.__NG_ELEMENT_ID__ = -1,
            e
        }
        )();
        function Sr(e, t=ge.Default) {
            const n = V();
            return null === n ? at(e, t) : Al(gt(), n, B(e), t)
        }
        function Ri(e, t) {
            return e << 17 | t << 2
        }
        function Zt(e) {
            return e >> 17 & 32767
        }
        function Da(e) {
            return 2 | e
        }
        function xn(e) {
            return (131068 & e) >> 2
        }
        function va(e, t) {
            return -131069 & e | t << 2
        }
        function Ea(e) {
            return 1 | e
        }
        function yd(e, t) {
            const n = e.contentQueries;
            if (null !== n)
                for (let r = 0; r < n.length; r += 2) {
                    const o = n[r]
                      , i = n[r + 1];
                    if (-1 !== i) {
                        const s = e.data[i];
                        _s(o),
                        s.contentQueries(2, t[i], i)
                    }
                }
        }
        function xo(e, t, n, r, o, i, s, a, u, c, f) {
            const y = t.blueprint.slice();
            return y[0] = o,
            y[2] = 76 | r,
            (null !== f || e && 1024 & e[2]) && (y[2] |= 1024),
            ao(y),
            y[3] = y[15] = e,
            y[8] = n,
            y[10] = s || e && e[10],
            y[11] = a || e && e[11],
            y[12] = u || e && e[12] || null,
            y[9] = c || e && e[9] || null,
            y[6] = i,
            y[20] = function Fm() {
                return xm++
            }(),
            y[21] = f,
            y[16] = 2 == t.type ? e[16] : y,
            y
        }
        function Ar(e, t, n, r, o) {
            let i = e.data[t];
            if (null === i)
                i = function xa(e, t, n, r, o) {
                    const i = fl()
                      , s = ys()
                      , u = e.data[t] = function _D(e, t, n, r, o, i) {
                        return {
                            type: n,
                            index: r,
                            insertBeforeIndex: null,
                            injectorIndex: t ? t.injectorIndex : -1,
                            directiveStart: -1,
                            directiveEnd: -1,
                            directiveStylingLast: -1,
                            propertyBindings: null,
                            flags: 0,
                            providerIndexes: 0,
                            value: o,
                            attrs: i,
                            mergedAttrs: null,
                            localNames: null,
                            initialInputs: void 0,
                            inputs: null,
                            outputs: null,
                            tViews: null,
                            next: null,
                            projectionNext: null,
                            child: null,
                            parent: t,
                            projection: null,
                            styles: null,
                            stylesWithoutHost: null,
                            residualStyles: void 0,
                            classes: null,
                            classesWithoutHost: null,
                            residualClasses: void 0,
                            classBindings: 0,
                            styleBindings: 0
                        }
                    }(0, s ? i : i && i.parent, n, t, r, o);
                    return null === e.firstChild && (e.firstChild = u),
                    null !== i && (s ? null == i.child && null !== u.parent && (i.child = u) : null === i.next && (i.next = u)),
                    u
                }(e, t, n, r, o),
                function ig() {
                    return me.lFrame.inI18n
                }() && (i.flags |= 64);
            else if (64 & i.type) {
                i.type = n,
                i.value = r,
                i.attrs = o;
                const s = function uo() {
                    const e = me.lFrame
                      , t = e.currentTNode;
                    return e.isParent ? t : t.parent
                }();
                i.injectorIndex = null === s ? -1 : s.injectorIndex
            }
            return fn(i, !0),
            i
        }
        function xr(e, t, n, r) {
            if (0 === n)
                return -1;
            const o = t.length;
            for (let i = 0; i < n; i++)
                t.push(r),
                e.blueprint.push(r),
                e.data.push(null);
            return o
        }
        function Fo(e, t, n) {
            ii(t);
            try {
                const r = e.viewQuery;
                null !== r && ja(1, r, n);
                const o = e.template;
                null !== o && Dd(e, t, o, 1, n),
                e.firstCreatePass && (e.firstCreatePass = !1),
                e.staticContentQueries && yd(e, t),
                e.staticViewQueries && ja(2, e.viewQuery, n);
                const i = e.components;
                null !== i && function DD(e, t) {
                    for (let n = 0; n < t.length; n++)
                        jD(e, t[n])
                }(t, i)
            } catch (r) {
                throw e.firstCreatePass && (e.incompleteFirstPass = !0,
                e.firstCreatePass = !1),
                r
            } finally {
                t[2] &= -5,
                si()
            }
        }
        function Fr(e, t, n, r) {
            const o = t[2];
            if (128 != (128 & o)) {
                ii(t);
                try {
                    ao(t),
                    function hl(e) {
                        return me.lFrame.bindingIndex = e
                    }(e.bindingStartIndex),
                    null !== n && Dd(e, t, n, 2, r);
                    const s = 3 == (3 & o);
                    if (s) {
                        const c = e.preOrderCheckHooks;
                        null !== c && ui(t, c, null)
                    } else {
                        const c = e.preOrderHooks;
                        null !== c && li(t, c, 0, null),
                        Cs(t, 0)
                    }
                    if (function kD(e) {
                        for (let t = Qs(e); null !== t; t = Zs(t)) {
                            if (!t[2])
                                continue;
                            const n = t[9];
                            for (let r = 0; r < n.length; r++) {
                                const o = n[r]
                                  , i = o[3];
                                0 == (512 & o[2]) && qn(i, 1),
                                o[2] |= 512
                            }
                        }
                    }(t),
                    function LD(e) {
                        for (let t = Qs(e); null !== t; t = Zs(t))
                            for (let n = 10; n < t.length; n++) {
                                const r = t[n]
                                  , o = r[1];
                                qt(r) && Fr(o, r, o.template, r[8])
                            }
                    }(t),
                    null !== e.contentQueries && yd(e, t),
                    s) {
                        const c = e.contentCheckHooks;
                        null !== c && ui(t, c)
                    } else {
                        const c = e.contentHooks;
                        null !== c && li(t, c, 1),
                        Cs(t, 1)
                    }
                    !function mD(e, t) {
                        const n = e.hostBindingOpCodes;
                        if (null !== n)
                            try {
                                for (let r = 0; r < n.length; r++) {
                                    const o = n[r];
                                    if (o < 0)
                                        Bn(~o);
                                    else {
                                        const i = o
                                          , s = n[++r]
                                          , a = n[++r];
                                        sg(s, i),
                                        a(2, t[i])
                                    }
                                }
                            } finally {
                                Bn(-1)
                            }
                    }(e, t);
                    const a = e.components;
                    null !== a && function yD(e, t) {
                        for (let n = 0; n < t.length; n++)
                            VD(e, t[n])
                    }(t, a);
                    const u = e.viewQuery;
                    if (null !== u && ja(2, u, r),
                    s) {
                        const c = e.viewCheckHooks;
                        null !== c && ui(t, c)
                    } else {
                        const c = e.viewHooks;
                        null !== c && li(t, c, 2),
                        Cs(t, 2)
                    }
                    !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
                    t[2] &= -41,
                    512 & t[2] && (t[2] &= -513,
                    qn(t[3], -1))
                } finally {
                    si()
                }
            }
        }
        function vD(e, t, n, r) {
            const o = t[10]
              , s = jn(t);
            try {
                !s && o.begin && o.begin(),
                s && Fo(e, t, r),
                Fr(e, t, n, r)
            } finally {
                !s && o.end && o.end()
            }
        }
        function Dd(e, t, n, r, o) {
            const i = xt()
              , s = 2 & r;
            try {
                Bn(-1),
                s && t.length > b && Bc(e, t, b, !1),
                n(r, o)
            } finally {
                Bn(i)
            }
        }
        function Ed(e) {
            const t = e.tView;
            return null === t || t.incompleteFirstPass ? e.tView = ki(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts) : t
        }
        function ki(e, t, n, r, o, i, s, a, u, c) {
            const f = b + r
              , y = f + o
              , v = function ED(e, t) {
                const n = [];
                for (let r = 0; r < t; r++)
                    n.push(r < e ? null : Ie);
                return n
            }(f, y)
              , I = "function" == typeof c ? c() : c;
            return v[1] = {
                type: e,
                blueprint: v,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: t,
                data: v.slice().fill(null, f),
                bindingStartIndex: f,
                expandoStartIndex: y,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof i ? i() : i,
                pipeRegistry: "function" == typeof s ? s() : s,
                firstChild: null,
                schemas: u,
                consts: I,
                incompleteFirstPass: !1
            }
        }
        function wd(e, t, n, r) {
            const o = Pd(t);
            null === n ? o.push(r) : (o.push(n),
            e.firstCreatePass && Rd(e).push(r, o.length - 1))
        }
        function Id(e, t, n) {
            for (let r in e)
                if (e.hasOwnProperty(r)) {
                    const o = e[r];
                    (n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(t, o) : n[r] = [t, o]
                }
            return n
        }
        function bd(e, t, n, r, o, i) {
            const s = i.hostBindings;
            if (s) {
                let a = e.hostBindingOpCodes;
                null === a && (a = e.hostBindingOpCodes = []);
                const u = ~t.index;
                (function TD(e) {
                    let t = e.length;
                    for (; t > 0; ) {
                        const n = e[--t];
                        if ("number" == typeof n && n < 0)
                            return n
                    }
                    return 0
                }
                )(a) != u && a.push(u),
                a.push(r, o, s)
            }
        }
        function Td(e, t) {
            null !== e.hostBindings && e.hostBindings(1, t)
        }
        function Sd(e, t) {
            t.flags |= 2,
            (e.components || (e.components = [])).push(t.index)
        }
        function ND(e, t, n) {
            if (n) {
                if (t.exportAs)
                    for (let r = 0; r < t.exportAs.length; r++)
                        n[t.exportAs[r]] = e;
                nt(t) && (n[""] = e)
            }
        }
        function Ad(e, t, n) {
            e.flags |= 1,
            e.directiveStart = t,
            e.directiveEnd = t + n,
            e.providerIndexes = t
        }
        function xd(e, t, n, r, o) {
            e.data[r] = o;
            const i = o.factory || (o.factory = Mn(o.type))
              , s = new lo(i,nt(o),Sr);
            e.blueprint[r] = s,
            n[r] = s,
            bd(e, t, 0, r, xr(e, n, o.hostVars, Ie), o)
        }
        function PD(e, t, n) {
            const r = Fe(t, e)
              , o = Ed(n)
              , i = e[10]
              , s = Vi(e, xo(e, o, null, n.onPush ? 32 : 16, r, t, i, i.createRenderer(r, n), null, null, null));
            e[t.index] = s
        }
        function RD(e, t, n, r, o, i) {
            const s = i[t];
            if (null !== s) {
                const a = r.setInput;
                for (let u = 0; u < s.length; ) {
                    const c = s[u++]
                      , f = s[u++]
                      , y = s[u++];
                    null !== a ? r.setInput(n, y, c, f) : n[f] = y
                }
            }
        }
        function OD(e, t) {
            let n = null
              , r = 0;
            for (; r < t.length; ) {
                const o = t[r];
                if (0 !== o)
                    if (5 !== o) {
                        if ("number" == typeof o)
                            break;
                        e.hasOwnProperty(o) && (null === n && (n = []),
                        n.push(o, e[o], t[r + 1])),
                        r += 2
                    } else
                        r += 2;
                else
                    r += 4
            }
            return n
        }
        function VD(e, t) {
            const n = ze(t, e);
            if (qt(n)) {
                const r = n[1];
                48 & n[2] ? Fr(r, n, r.template, n[8]) : n[5] > 0 && Oa(n)
            }
        }
        function Oa(e) {
            for (let r = Qs(e); null !== r; r = Zs(r))
                for (let o = 10; o < r.length; o++) {
                    const i = r[o];
                    if (512 & i[2]) {
                        const s = i[1];
                        Fr(s, i, s.template, i[8])
                    } else
                        i[5] > 0 && Oa(i)
                }
            const n = e[1].components;
            if (null !== n)
                for (let r = 0; r < n.length; r++) {
                    const o = ze(n[r], e);
                    qt(o) && o[5] > 0 && Oa(o)
                }
        }
        function jD(e, t) {
            const n = ze(t, e)
              , r = n[1];
            (function BD(e, t) {
                for (let n = t.length; n < e.blueprint.length; n++)
                    t.push(e.blueprint[n])
            }
            )(r, n),
            Fo(r, n, n[8])
        }
        function Vi(e, t) {
            return e[13] ? e[14][4] = t : e[13] = t,
            e[14] = t,
            t
        }
        function La(e) {
            for (; e; ) {
                e[2] |= 32;
                const t = To(e);
                if (as(e) && !t)
                    return e;
                e = t
            }
            return null
        }
        function Nd(e) {
            !function ka(e) {
                for (let t = 0; t < e.components.length; t++) {
                    const n = e.components[t]
                      , r = Si(n);
                    if (null !== r) {
                        const o = r[1];
                        vD(o, r, o.template, n)
                    }
                }
            }(e[8])
        }
        function ja(e, t, n) {
            _s(0),
            t(e, n)
        }
        const $D = (()=>Promise.resolve(null))();
        function Pd(e) {
            return e[7] || (e[7] = [])
        }
        function Rd(e) {
            return e.cleanup || (e.cleanup = [])
        }
        function Ld(e, t) {
            const n = e[9]
              , r = n ? n.get(bo, null) : null;
            r && r.handleError(t)
        }
        function kd(e, t, n, r, o) {
            for (let i = 0; i < n.length; ) {
                const s = n[i++]
                  , a = n[i++]
                  , u = t[s]
                  , c = e.data[s];
                null !== c.setInput ? c.setInput(u, o, r, a) : u[a] = o
            }
        }
        function ji(e, t, n) {
            let r = n ? e.styles : null
              , o = n ? e.classes : null
              , i = 0;
            if (null !== t)
                for (let s = 0; s < t.length; s++) {
                    const a = t[s];
                    "number" == typeof a ? i = a : 1 == i ? o = Se(o, a) : 2 == i && (r = Se(r, a + ": " + t[++s] + ";"))
                }
            n ? e.styles = r : e.stylesWithoutHost = r,
            n ? e.classes = o : e.classesWithoutHost = o
        }
        function XD(e, t) {
            ai(Si(e)[1], gt())
        }
        let Bi = null;
        function Jn() {
            if (!Bi) {
                const e = We.Symbol;
                if (e && e.iterator)
                    Bi = e.iterator;
                else {
                    const t = Object.getOwnPropertyNames(Map.prototype);
                    for (let n = 0; n < t.length; ++n) {
                        const r = t[n];
                        "entries" !== r && "size" !== r && Map.prototype[r] === Map.prototype.entries && (Bi = r)
                    }
                }
            }
            return Bi
        }
        function No(e) {
            return !!$a(e) && (Array.isArray(e) || !(e instanceof Map) && Jn()in e)
        }
        function $a(e) {
            return null !== e && ("function" == typeof e || "object" == typeof e)
        }
        function Mt(e, t, n) {
            return !Object.is(e[t], n) && (e[t] = n,
            !0)
        }
        function Ua(e, t, n) {
            const r = V();
            return Mt(r, function hr() {
                return me.lFrame.bindingIndex++
            }(), t) && function Vt(e, t, n, r, o, i, s, a) {
                const u = Fe(t, n);
                let f, c = t.inputs;
                !a && null != c && (f = c[r]) ? (kd(e, n, f, r, o),
                cn(t) && function ID(e, t) {
                    const n = ze(t, e);
                    16 & n[2] || (n[2] |= 32)
                }(n, t.index)) : 3 & t.type && (r = function wD(e) {
                    return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
                }(r),
                o = null != s ? s(o, t.value || "", r) : o,
                p(i) ? i.setProperty(u, r, o) : Is(r) || (u.setProperty ? u.setProperty(r, o) : u[r] = o))
            }(ke(), function it() {
                const e = me.lFrame;
                return lt(e.tView, e.selectedIndex)
            }(), r, e, t, r[11], n, !1),
            Ua
        }
        function Ga(e, t, n, r, o) {
            const s = o ? "class" : "style";
            kd(e, n, t.inputs[s], s, r)
        }
        function $i(e, t, n, r) {
            const o = V()
              , i = ke()
              , s = b + e
              , a = o[11]
              , u = o[s] = Xs(a, t, function gg() {
                return me.lFrame.currentNamespace
            }())
              , c = i.firstCreatePass ? function pv(e, t, n, r, o, i, s) {
                const a = t.consts
                  , c = Ar(t, e, 2, o, St(a, i));
                return function Pa(e, t, n, r) {
                    let o = !1;
                    if (dl()) {
                        const i = function xD(e, t, n) {
                            const r = e.directiveRegistry;
                            let o = null;
                            if (r)
                                for (let i = 0; i < r.length; i++) {
                                    const s = r[i];
                                    kc(n, s.selectors, !1) && (o || (o = []),
                                    pi(fo(n, t), e, s.type),
                                    nt(s) ? (Sd(e, n),
                                    o.unshift(s)) : o.push(s))
                                }
                            return o
                        }(e, t, n)
                          , s = null === r ? null : {
                            "": -1
                        };
                        if (null !== i) {
                            o = !0,
                            Ad(n, e.data.length, i.length);
                            for (let f = 0; f < i.length; f++) {
                                const y = i[f];
                                y.providersResolver && y.providersResolver(y)
                            }
                            let a = !1
                              , u = !1
                              , c = xr(e, t, i.length, null);
                            for (let f = 0; f < i.length; f++) {
                                const y = i[f];
                                n.mergedAttrs = di(n.mergedAttrs, y.hostAttrs),
                                xd(e, n, t, c, y),
                                ND(c, y, s),
                                null !== y.contentQueries && (n.flags |= 8),
                                (null !== y.hostBindings || null !== y.hostAttrs || 0 !== y.hostVars) && (n.flags |= 128);
                                const v = y.type.prototype;
                                !a && (v.ngOnChanges || v.ngOnInit || v.ngDoCheck) && ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                                a = !0),
                                !u && (v.ngOnChanges || v.ngDoCheck) && ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n.index),
                                u = !0),
                                c++
                            }
                            !function CD(e, t) {
                                const r = t.directiveEnd
                                  , o = e.data
                                  , i = t.attrs
                                  , s = [];
                                let a = null
                                  , u = null;
                                for (let c = t.directiveStart; c < r; c++) {
                                    const f = o[c]
                                      , y = f.inputs
                                      , v = null === i || Lc(t) ? null : OD(y, i);
                                    s.push(v),
                                    a = Id(y, c, a),
                                    u = Id(f.outputs, c, u)
                                }
                                null !== a && (a.hasOwnProperty("class") && (t.flags |= 16),
                                a.hasOwnProperty("style") && (t.flags |= 32)),
                                t.initialInputs = s,
                                t.inputs = a,
                                t.outputs = u
                            }(e, n)
                        }
                        s && function FD(e, t, n) {
                            if (t) {
                                const r = e.localNames = [];
                                for (let o = 0; o < t.length; o += 2) {
                                    const i = n[t[o + 1]];
                                    if (null == i)
                                        throw new x(-301,!1);
                                    r.push(t[o], i)
                                }
                            }
                        }(n, r, s)
                    }
                    return n.mergedAttrs = di(n.mergedAttrs, n.attrs),
                    o
                }(t, n, c, St(a, s)),
                null !== c.attrs && ji(c, c.attrs, !1),
                null !== c.mergedAttrs && ji(c, c.mergedAttrs, !0),
                null !== t.queries && t.queries.elementStart(t, c),
                c
            }(s, i, o, 0, t, n, r) : i.data[s];
            fn(c, !0);
            const f = c.mergedAttrs;
            null !== f && ci(a, u, f);
            const y = c.classes;
            null !== y && ia(a, u, y);
            const v = c.styles;
            return null !== v && Pc(a, u, v),
            64 != (64 & c.flags) && xi(i, o, u, c),
            0 === function Zp() {
                return me.lFrame.elementDepthCount
            }() && It(u, o),
            function Jp() {
                me.lFrame.elementDepthCount++
            }(),
            dn(c) && (function Fa(e, t, n) {
                !dl() || (function SD(e, t, n, r) {
                    const o = n.directiveStart
                      , i = n.directiveEnd;
                    e.firstCreatePass || fo(n, t),
                    It(r, t);
                    const s = n.initialInputs;
                    for (let a = o; a < i; a++) {
                        const u = e.data[a]
                          , c = nt(u);
                        c && PD(t, n, u);
                        const f = ho(t, e, a, n);
                        It(f, t),
                        null !== s && RD(0, a - o, f, u, 0, s),
                        c && (ze(n.index, t)[8] = f)
                    }
                }(e, t, n, Fe(n, t)),
                128 == (128 & n.flags) && function AD(e, t, n) {
                    const r = n.directiveStart
                      , o = n.directiveEnd
                      , i = n.index
                      , s = function ag() {
                        return me.lFrame.currentDirectiveIndex
                    }();
                    try {
                        Bn(i);
                        for (let a = r; a < o; a++) {
                            const u = e.data[a]
                              , c = t[a];
                            vs(a),
                            (null !== u.hostBindings || 0 !== u.hostVars || null !== u.hostAttrs) && Td(u, c)
                        }
                    } finally {
                        Bn(-1),
                        vs(s)
                    }
                }(e, t, n))
            }(i, o, c),
            function vd(e, t, n) {
                if (Tt(t)) {
                    const o = t.directiveEnd;
                    for (let i = t.directiveStart; i < o; i++) {
                        const s = e.data[i];
                        s.contentQueries && s.contentQueries(1, n[i], i)
                    }
                }
            }(i, c, o)),
            null !== r && function Na(e, t, n=Fe) {
                const r = t.localNames;
                if (null !== r) {
                    let o = t.index + 1;
                    for (let i = 0; i < r.length; i += 2) {
                        const s = r[i + 1]
                          , a = -1 === s ? n(t, e) : e[s];
                        e[o++] = a
                    }
                }
            }(o, c),
            $i
        }
        function Ui() {
            let e = gt();
            ys() ? function Ds() {
                me.lFrame.isParent = !1
            }() : (e = e.parent,
            fn(e, !1));
            const t = e;
            !function Xp() {
                me.lFrame.elementDepthCount--
            }();
            const n = ke();
            return n.firstCreatePass && (ai(n, e),
            Tt(e) && n.queries.elementEnd(e)),
            null != t.classesWithoutHost && function Eg(e) {
                return 0 != (16 & e.flags)
            }(t) && Ga(n, t, V(), t.classesWithoutHost, !0),
            null != t.stylesWithoutHost && function _g(e) {
                return 0 != (32 & e.flags)
            }(t) && Ga(n, t, V(), t.stylesWithoutHost, !1),
            Ui
        }
        function Wa(e, t, n, r) {
            return $i(e, t, n, r),
            Ui(),
            Wa
        }
        function qa(e) {
            return !!e && "function" == typeof e.then
        }
        function lf(e) {
            return !!e && "function" == typeof e.subscribe
        }
        const yv = lf;
        function Qa(e, t, n, r) {
            const o = V()
              , i = ke()
              , s = gt();
            return function df(e, t, n, r, o, i, s, a) {
                const u = dn(r)
                  , f = e.firstCreatePass && Rd(e)
                  , y = t[8]
                  , v = Pd(t);
                let I = !0;
                if (3 & r.type || a) {
                    const G = Fe(r, t)
                      , K = a ? a(G) : G
                      , oe = v.length
                      , L = a ? ie=>a(O(ie[r.index])) : r.index;
                    if (p(n)) {
                        let ie = null;
                        if (!a && u && (ie = function Dv(e, t, n, r) {
                            const o = e.cleanup;
                            if (null != o)
                                for (let i = 0; i < o.length - 1; i += 2) {
                                    const s = o[i];
                                    if (s === n && o[i + 1] === r) {
                                        const a = t[7]
                                          , u = o[i + 2];
                                        return a.length > u ? a[u] : null
                                    }
                                    "string" == typeof s && (i += 2)
                                }
                            return null
                        }(e, t, o, r.index)),
                        null !== ie)
                            (ie.__ngLastListenerFn__ || ie).__ngNextListenerFn__ = i,
                            ie.__ngLastListenerFn__ = i,
                            I = !1;
                        else {
                            i = Za(r, t, y, i, !1);
                            const Ne = n.listen(K, o, i);
                            v.push(i, Ne),
                            f && f.push(o, L, oe, oe + 1)
                        }
                    } else
                        i = Za(r, t, y, i, !0),
                        K.addEventListener(o, i, s),
                        v.push(i),
                        f && f.push(o, L, oe, s)
                } else
                    i = Za(r, t, y, i, !1);
                const P = r.outputs;
                let j;
                if (I && null !== P && (j = P[o])) {
                    const G = j.length;
                    if (G)
                        for (let K = 0; K < G; K += 2) {
                            const rt = t[j[K]][j[K + 1]].subscribe(i)
                              , rr = v.length;
                            v.push(i, rt),
                            f && f.push(o, r.index, rr, -(rr + 1))
                        }
                }
            }(i, o, o[11], s, e, t, !!n, r),
            Qa
        }
        function ff(e, t, n, r) {
            try {
                return !1 !== n(r)
            } catch (o) {
                return Ld(e, o),
                !1
            }
        }
        function Za(e, t, n, r, o) {
            return function i(s) {
                if (s === Function)
                    return r;
                La(2 & e.flags ? ze(e.index, t) : t);
                let u = ff(t, 0, r, s)
                  , c = i.__ngNextListenerFn__;
                for (; c; )
                    u = ff(t, 0, c, s) && u,
                    c = c.__ngNextListenerFn__;
                return o && !1 === u && (s.preventDefault(),
                s.returnValue = !1),
                u
            }
        }
        function Cf(e, t, n, r, o) {
            const i = e[n + 1]
              , s = null === t;
            let a = r ? Zt(i) : xn(i)
              , u = !1;
            for (; 0 !== a && (!1 === u || s); ) {
                const f = e[a + 1];
                Mv(e[a], t) && (u = !0,
                e[a + 1] = r ? Ea(f) : Da(f)),
                a = r ? Zt(f) : xn(f)
            }
            u && (e[n + 1] = r ? Da(i) : Ea(i))
        }
        function Mv(e, t) {
            return null === e || null == t || (Array.isArray(e) ? e[1] : e) === t || !(!Array.isArray(e) || "string" != typeof t) && _r(e, t) >= 0
        }
        function Xa(e, t) {
            return function Xt(e, t, n, r) {
                const o = V()
                  , i = ke()
                  , s = function Tn(e) {
                    const t = me.lFrame
                      , n = t.bindingIndex;
                    return t.bindingIndex = t.bindingIndex + e,
                    n
                }(2);
                i.firstUpdatePass && function Ff(e, t, n, r) {
                    const o = e.data;
                    if (null === o[n + 1]) {
                        const i = o[xt()]
                          , s = function xf(e, t) {
                            return t >= e.expandoStartIndex
                        }(e, n);
                        (function Of(e, t) {
                            return 0 != (e.flags & (t ? 16 : 32))
                        }
                        )(i, r) && null === t && !s && (t = !1),
                        t = function Rv(e, t, n, r) {
                            const o = function Es(e) {
                                const t = me.lFrame.currentDirectiveIndex;
                                return -1 === t ? null : e[t]
                            }(e);
                            let i = r ? t.residualClasses : t.residualStyles;
                            if (null === o)
                                0 === (r ? t.classBindings : t.styleBindings) && (n = Ro(n = eu(null, e, t, n, r), t.attrs, r),
                                i = null);
                            else {
                                const s = t.directiveStylingLast;
                                if (-1 === s || e[s] !== o)
                                    if (n = eu(o, e, t, n, r),
                                    null === i) {
                                        let u = function Ov(e, t, n) {
                                            const r = n ? t.classBindings : t.styleBindings;
                                            if (0 !== xn(r))
                                                return e[Zt(r)]
                                        }(e, t, r);
                                        void 0 !== u && Array.isArray(u) && (u = eu(null, e, t, u[1], r),
                                        u = Ro(u, t.attrs, r),
                                        function Lv(e, t, n, r) {
                                            e[Zt(n ? t.classBindings : t.styleBindings)] = r
                                        }(e, t, r, u))
                                    } else
                                        i = function kv(e, t, n) {
                                            let r;
                                            const o = t.directiveEnd;
                                            for (let i = 1 + t.directiveStylingLast; i < o; i++)
                                                r = Ro(r, e[i].hostAttrs, n);
                                            return Ro(r, t.attrs, n)
                                        }(e, t, r)
                            }
                            return void 0 !== i && (r ? t.residualClasses = i : t.residualStyles = i),
                            n
                        }(o, i, t, r),
                        function wv(e, t, n, r, o, i) {
                            let s = i ? t.classBindings : t.styleBindings
                              , a = Zt(s)
                              , u = xn(s);
                            e[r] = n;
                            let f, c = !1;
                            if (Array.isArray(n)) {
                                const y = n;
                                f = y[1],
                                (null === f || _r(y, f) > 0) && (c = !0)
                            } else
                                f = n;
                            if (o)
                                if (0 !== u) {
                                    const v = Zt(e[a + 1]);
                                    e[r + 1] = Ri(v, a),
                                    0 !== v && (e[v + 1] = va(e[v + 1], r)),
                                    e[a + 1] = function sD(e, t) {
                                        return 131071 & e | t << 17
                                    }(e[a + 1], r)
                                } else
                                    e[r + 1] = Ri(a, 0),
                                    0 !== a && (e[a + 1] = va(e[a + 1], r)),
                                    a = r;
                            else
                                e[r + 1] = Ri(u, 0),
                                0 === a ? a = r : e[u + 1] = va(e[u + 1], r),
                                u = r;
                            c && (e[r + 1] = Da(e[r + 1])),
                            Cf(e, f, r, !0),
                            Cf(e, f, r, !1),
                            function Iv(e, t, n, r, o) {
                                const i = o ? e.residualClasses : e.residualStyles;
                                null != i && "string" == typeof t && _r(i, t) >= 0 && (n[r + 1] = Ea(n[r + 1]))
                            }(t, f, e, r, i),
                            s = Ri(a, u),
                            i ? t.classBindings = s : t.styleBindings = s
                        }(o, i, t, n, s, r)
                    }
                }(i, e, s, r),
                t !== Ie && Mt(o, s, t) && function Pf(e, t, n, r, o, i, s, a) {
                    if (!(3 & t.type))
                        return;
                    const u = e.data
                      , c = u[a + 1];
                    Gi(function ld(e) {
                        return 1 == (1 & e)
                    }(c) ? Rf(u, t, n, o, xn(c), s) : void 0) || (Gi(i) || function ud(e) {
                        return 2 == (2 & e)
                    }(c) && (i = Rf(u, null, n, o, a, s)),
                    function vy(e, t, n, r, o) {
                        const i = p(e);
                        if (t)
                            o ? i ? e.addClass(n, r) : n.classList.add(r) : i ? e.removeClass(n, r) : n.classList.remove(r);
                        else {
                            let s = -1 === r.indexOf("-") ? void 0 : gn.DashCase;
                            if (null == o)
                                i ? e.removeStyle(n, r, s) : n.style.removeProperty(r);
                            else {
                                const a = "string" == typeof o && o.endsWith("!important");
                                a && (o = o.slice(0, -10),
                                s |= gn.Important),
                                i ? e.setStyle(n, r, o, s) : n.style.setProperty(r, o, a ? "important" : "")
                            }
                        }
                    }(r, s, function Ge(e, t) {
                        return O(t[e])
                    }(xt(), n), o, i))
                }(i, i.data[xt()], o, o[11], e, o[s + 1] = function Bv(e, t) {
                    return null == e || ("string" == typeof t ? e += t : "object" == typeof e && (e = fe(function $n(e) {
                        return e instanceof class Zl {
                            constructor(t) {
                                this.changingThisBreaksApplicationSecurity = t
                            }
                            toString() {
                                return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
                            }
                        }
                        ? e.changingThisBreaksApplicationSecurity : e
                    }(e)))),
                    e
                }(t, n), r, s)
            }(e, t, null, !0),
            Xa
        }
        function eu(e, t, n, r, o) {
            let i = null;
            const s = n.directiveEnd;
            let a = n.directiveStylingLast;
            for (-1 === a ? a = n.directiveStart : a++; a < s && (i = t[a],
            r = Ro(r, i.hostAttrs, o),
            i !== e); )
                a++;
            return null !== e && (n.directiveStylingLast = a),
            r
        }
        function Ro(e, t, n) {
            const r = n ? 1 : 2;
            let o = -1;
            if (null !== t)
                for (let i = 0; i < t.length; i++) {
                    const s = t[i];
                    "number" == typeof s ? o = s : o === r && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                    kt(e, s, !!n || t[++i]))
                }
            return void 0 === e ? null : e
        }
        function Rf(e, t, n, r, o, i) {
            const s = null === t;
            let a;
            for (; o > 0; ) {
                const u = e[o]
                  , c = Array.isArray(u)
                  , f = c ? u[1] : u
                  , y = null === f;
                let v = n[o + 1];
                v === Ie && (v = y ? Oe : void 0);
                let I = y ? Ns(v, r) : f === r ? v : void 0;
                if (c && !Gi(I) && (I = Ns(u, r)),
                Gi(I) && (a = I,
                s))
                    return a;
                const P = e[o + 1];
                o = s ? Zt(P) : xn(P)
            }
            if (null !== t) {
                let u = i ? t.residualClasses : t.residualStyles;
                null != u && (a = Ns(u, r))
            }
            return a
        }
        function Gi(e) {
            return void 0 !== e
        }
        function Lf(e, t="") {
            const n = V()
              , r = ke()
              , o = e + b
              , i = r.firstCreatePass ? Ar(r, o, 1, t, null) : r.data[o]
              , s = n[o] = function Js(e, t) {
                return p(e) ? e.createText(t) : e.createTextNode(t)
            }(n[11], t);
            xi(r, n, s, i),
            fn(i, !1)
        }
        const er = void 0;
        var sE = ["en", [["a", "p"], ["AM", "PM"], er], [["AM", "PM"], er, er], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], er, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], er, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", er, "{1} 'at' {0}", er], [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"], ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", function iE(e) {
            const n = Math.floor(Math.abs(e))
              , r = e.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === n && 0 === r ? 1 : 5
        }
        ];
        let $r = {};
        function nu(e) {
            const t = function aE(e) {
                return e.toLowerCase().replace(/_/g, "-")
            }(e);
            let n = oh(t);
            if (n)
                return n;
            const r = t.split("-")[0];
            if (n = oh(r),
            n)
                return n;
            if ("en" === r)
                return sE;
            throw new Error(`Missing locale data for the locale "${e}".`)
        }
        function rh(e) {
            return nu(e)[he.PluralCase]
        }
        function oh(e) {
            return e in $r || ($r[e] = We.ng && We.ng.common && We.ng.common.locales && We.ng.common.locales[e]),
            $r[e]
        }
        var he = (()=>((he = he || {})[he.LocaleId = 0] = "LocaleId",
        he[he.DayPeriodsFormat = 1] = "DayPeriodsFormat",
        he[he.DayPeriodsStandalone = 2] = "DayPeriodsStandalone",
        he[he.DaysFormat = 3] = "DaysFormat",
        he[he.DaysStandalone = 4] = "DaysStandalone",
        he[he.MonthsFormat = 5] = "MonthsFormat",
        he[he.MonthsStandalone = 6] = "MonthsStandalone",
        he[he.Eras = 7] = "Eras",
        he[he.FirstDayOfWeek = 8] = "FirstDayOfWeek",
        he[he.WeekendRange = 9] = "WeekendRange",
        he[he.DateFormat = 10] = "DateFormat",
        he[he.TimeFormat = 11] = "TimeFormat",
        he[he.DateTimeFormat = 12] = "DateTimeFormat",
        he[he.NumberSymbols = 13] = "NumberSymbols",
        he[he.NumberFormats = 14] = "NumberFormats",
        he[he.CurrencyCode = 15] = "CurrencyCode",
        he[he.CurrencySymbol = 16] = "CurrencySymbol",
        he[he.CurrencyName = 17] = "CurrencyName",
        he[he.Currencies = 18] = "Currencies",
        he[he.Directionality = 19] = "Directionality",
        he[he.PluralCase = 20] = "PluralCase",
        he[he.ExtraData = 21] = "ExtraData",
        he))();
        const Ur = "en-US";
        let ih = Ur;
        class a_ {
            resolveComponentFactory(t) {
                throw function s_(e) {
                    const t = Error(`No component factory found for ${fe(e)}. Did you add it to @NgModule.entryComponents?`);
                    return t.ngComponent = e,
                    t
                }(t)
            }
        }
        let jo = (()=>{
            class e {
            }
            return e.NULL = new a_,
            e
        }
        )();
        class tr {
        }
        class Nh {
        }
        function c_() {
            return zr(gt(), V())
        }
        function zr(e, t) {
            return new Bo(Fe(e, t))
        }
        let Bo = (()=>{
            class e {
                constructor(n) {
                    this.nativeElement = n
                }
            }
            return e.__NG_ELEMENT_ID__ = c_,
            e
        }
        )();
        function d_(e) {
            return e instanceof Bo ? e.nativeElement : e
        }
        class Ph {
        }
        let f_ = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = ()=>function p_() {
                const e = V()
                  , n = ze(gt().index, e);
                return function h_(e) {
                    return e[11]
                }(ae(n) ? n : e)
            }(),
            e
        }
        )()
          , g_ = (()=>{
            class e {
            }
            return e.\u0275prov = vt({
                token: e,
                providedIn: "root",
                factory: ()=>null
            }),
            e
        }
        )();
        class Rh {
            constructor(t) {
                this.full = t,
                this.major = t.split(".")[0],
                this.minor = t.split(".")[1],
                this.patch = t.split(".").slice(2).join(".")
            }
        }
        const m_ = new Rh("14.0.0-rc.1")
          , lu = {};
        function qi(e, t, n, r, o=!1) {
            for (; null !== n; ) {
                const i = t[n.index];
                if (null !== i && r.push(O(i)),
                we(i))
                    for (let a = 10; a < i.length; a++) {
                        const u = i[a]
                          , c = u[1].firstChild;
                        null !== c && qi(u[1], u, c, r)
                    }
                const s = n.type;
                if (8 & s)
                    qi(e, t, n.child, r);
                else if (32 & s) {
                    const a = qs(n, t);
                    let u;
                    for (; u = a(); )
                        r.push(u)
                } else if (16 & s) {
                    const a = xc(t, n);
                    if (Array.isArray(a))
                        r.push(...a);
                    else {
                        const u = To(t[16]);
                        qi(u[1], u, a, r, !0)
                    }
                }
                n = o ? n.projectionNext : n.next
            }
            return r
        }
        class Ho {
            constructor(t, n) {
                this._lView = t,
                this._cdRefInjectingView = n,
                this._appRef = null,
                this._attachedToViewContainer = !1
            }
            get rootNodes() {
                const t = this._lView
                  , n = t[1];
                return qi(n, t, n.firstChild, [])
            }
            get context() {
                return this._lView[8]
            }
            set context(t) {
                this._lView[8] = t
            }
            get destroyed() {
                return 128 == (128 & this._lView[2])
            }
            destroy() {
                if (this._appRef)
                    this._appRef.detachView(this);
                else if (this._attachedToViewContainer) {
                    const t = this._lView[3];
                    if (we(t)) {
                        const n = t[8]
                          , r = n ? n.indexOf(this) : -1;
                        r > -1 && (ea(t, r),
                        mi(n, r))
                    }
                    this._attachedToViewContainer = !1
                }
                Ec(this._lView[1], this._lView)
            }
            onDestroy(t) {
                wd(this._lView[1], this._lView, null, t)
            }
            markForCheck() {
                La(this._cdRefInjectingView || this._lView)
            }
            detach() {
                this._lView[2] &= -65
            }
            reattach() {
                this._lView[2] |= 64
            }
            detectChanges() {
                !function Va(e, t, n) {
                    const r = t[10];
                    r.begin && r.begin();
                    try {
                        Fr(e, t, e.template, n)
                    } catch (o) {
                        throw Ld(t, o),
                        o
                    } finally {
                        r.end && r.end()
                    }
                }(this._lView[1], this._lView, this.context)
            }
            checkNoChanges() {}
            attachToViewContainerRef() {
                if (this._appRef)
                    throw new x(902,"");
                this._attachedToViewContainer = !0
            }
            detachFromAppRef() {
                this._appRef = null,
                function ly(e, t) {
                    So(e, t, t[11], 2, null, null)
                }(this._lView[1], this._lView)
            }
            attachToAppRef(t) {
                if (this._attachedToViewContainer)
                    throw new x(902,"");
                this._appRef = t
            }
        }
        class y_ extends Ho {
            constructor(t) {
                super(t),
                this._view = t
            }
            detectChanges() {
                Nd(this._view)
            }
            checkNoChanges() {}
            get context() {
                return null
            }
        }
        class cu extends jo {
            constructor(t) {
                super(),
                this.ngModule = t
            }
            resolveComponentFactory(t) {
                const n = Ve(t);
                return new du(n,this.ngModule)
            }
        }
        function Oh(e) {
            const t = [];
            for (let n in e)
                e.hasOwnProperty(n) && t.push({
                    propName: e[n],
                    templateName: n
                });
            return t
        }
        class v_ {
            constructor(t, n) {
                this.injector = t,
                this.parentInjector = n
            }
            get(t, n, r) {
                const o = this.injector.get(t, lu, r);
                return o !== lu || n === lu ? o : this.parentInjector.get(t, n, r)
            }
        }
        class du extends Nh {
            constructor(t, n) {
                super(),
                this.componentDef = t,
                this.ngModule = n,
                this.componentType = t.type,
                this.selector = function Ay(e) {
                    return e.map(Sy).join(",")
                }(t.selectors),
                this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [],
                this.isBoundToModule = !!n
            }
            get inputs() {
                return Oh(this.componentDef.inputs)
            }
            get outputs() {
                return Oh(this.componentDef.outputs)
            }
            create(t, n, r, o) {
                let i = (o = o || this.ngModule)instanceof Ao ? o : null == o ? void 0 : o.injector;
                i && null !== this.componentDef.getStandaloneInjector && (i = this.componentDef.getStandaloneInjector(i) || i);
                const s = i ? new v_(t,i) : t
                  , a = s.get(Ph, _)
                  , u = s.get(g_, null)
                  , c = a.createRenderer(null, this.componentDef)
                  , f = this.componentDef.selectors[0][0] || "div"
                  , y = r ? function Cd(e, t, n) {
                    if (p(e))
                        return e.selectRootElement(t, n === Xe.ShadowDom);
                    let r = "string" == typeof t ? e.querySelector(t) : t;
                    return r.textContent = "",
                    r
                }(c, r, this.componentDef.encapsulation) : Xs(a.createRenderer(null, this.componentDef), f, function D_(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null
                }(f))
                  , v = this.componentDef.onPush ? 288 : 272
                  , I = function Kd(e, t) {
                    return {
                        components: [],
                        scheduler: e || ey,
                        clean: $D,
                        playerHandler: t || null,
                        flags: 0
                    }
                }()
                  , P = ki(0, null, null, 1, 0, null, null, null, null, null)
                  , j = xo(null, P, I, v, null, null, a, c, u, s, null);
                let G, K;
                ii(j);
                try {
                    const oe = function Wd(e, t, n, r, o, i) {
                        const s = n[1];
                        n[22] = e;
                        const u = Ar(s, 22, 2, "#host", null)
                          , c = u.mergedAttrs = t.hostAttrs;
                        null !== c && (ji(u, c, !0),
                        null !== e && (ci(o, e, c),
                        null !== u.classes && ia(o, e, u.classes),
                        null !== u.styles && Pc(o, e, u.styles)));
                        const f = r.createRenderer(e, t)
                          , y = xo(n, Ed(t), null, t.onPush ? 32 : 16, n[22], u, r, f, i || null, null, null);
                        return s.firstCreatePass && (pi(fo(u, n), s, t.type),
                        Sd(s, u),
                        Ad(u, n.length, 1)),
                        Vi(n, y),
                        n[22] = y
                    }(y, this.componentDef, j, a, c);
                    if (y)
                        if (r)
                            ci(c, y, ["ng-version", m_.full]);
                        else {
                            const {attrs: L, classes: ie} = function xy(e) {
                                const t = []
                                  , n = [];
                                let r = 1
                                  , o = 2;
                                for (; r < e.length; ) {
                                    let i = e[r];
                                    if ("string" == typeof i)
                                        2 === o ? "" !== i && t.push(i, e[++r]) : 8 === o && n.push(i);
                                    else {
                                        if (!Qt(o))
                                            break;
                                        o = i
                                    }
                                    r++
                                }
                                return {
                                    attrs: t,
                                    classes: n
                                }
                            }(this.componentDef.selectors[0]);
                            L && ci(c, y, L),
                            ie && ie.length > 0 && ia(c, y, ie.join(" "))
                        }
                    if (K = lt(P, b),
                    void 0 !== n) {
                        const L = K.projection = [];
                        for (let ie = 0; ie < this.ngContentSelectors.length; ie++) {
                            const Ne = n[ie];
                            L.push(null != Ne ? Array.from(Ne) : null)
                        }
                    }
                    G = function Yd(e, t, n, r, o) {
                        const i = n[1]
                          , s = function bD(e, t, n) {
                            const r = gt();
                            e.firstCreatePass && (n.providersResolver && n.providersResolver(n),
                            xd(e, r, t, xr(e, t, 1, null), n));
                            const o = ho(t, e, r.directiveStart, r);
                            It(o, t);
                            const i = Fe(r, t);
                            return i && It(i, t),
                            o
                        }(i, n, t);
                        if (r.components.push(s),
                        e[8] = s,
                        o && o.forEach(u=>u(s, t)),
                        t.contentQueries) {
                            const u = gt();
                            t.contentQueries(1, s, u.directiveStart)
                        }
                        const a = gt();
                        return !i.firstCreatePass || null === t.hostBindings && null === t.hostAttrs || (Bn(a.index),
                        bd(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                        Td(t, s)),
                        s
                    }(oe, this.componentDef, j, I, [XD]),
                    Fo(P, j, null)
                } finally {
                    si()
                }
                return new __(this.componentType,G,zr(K, j),j,K)
            }
        }
        class __ extends class l_ {
        }
        {
            constructor(t, n, r, o, i) {
                super(),
                this.location = r,
                this._rootLView = o,
                this._tNode = i,
                this.instance = n,
                this.hostView = this.changeDetectorRef = new y_(o),
                this.componentType = t
            }
            get injector() {
                return new mr(this._tNode,this._rootLView)
            }
            destroy() {
                this.hostView.destroy()
            }
            onDestroy(t) {
                this.hostView.onDestroy(t)
            }
        }
        function C_(e, t) {
            return new Lh(e,null != t ? t : null)
        }
        class Lh extends tr {
            constructor(t, n) {
                super(),
                this._parent = n,
                this._bootstrapComponents = [],
                this.injector = this,
                this.destroyCbs = [],
                this.componentFactoryResolver = new cu(this);
                const r = function Ct(e, t) {
                    const n = e[eo] || null;
                    if (!n && !0 === t)
                        throw new Error(`Type ${fe(e)} does not have '\u0275mod' property.`);
                    return n
                }(t);
                this._bootstrapComponents = function An(e) {
                    return e instanceof Function ? e() : e
                }(r.bootstrap),
                this._r3Injector = ed(t, n, [{
                    provide: tr,
                    useValue: this
                }, {
                    provide: jo,
                    useValue: this.componentFactoryResolver
                }], fe(t), new Set(["environment"])),
                this._r3Injector.resolveInjectorInitializers(),
                this.instance = this.get(t)
            }
            get(t, n=mn.THROW_IF_NOT_FOUND, r=ge.Default) {
                return t === mn || t === tr || t === ua ? this : this._r3Injector.get(t, n, r)
            }
            destroy() {
                const t = this._r3Injector;
                !t.destroyed && t.destroy(),
                this.destroyCbs.forEach(n=>n()),
                this.destroyCbs = null
            }
            onDestroy(t) {
                this.destroyCbs.push(t)
            }
        }
        class fu extends class u_ {
        }
        {
            constructor(t) {
                super(),
                this.moduleType = t
            }
            create(t) {
                return new Lh(this.moduleType,t)
            }
        }
        class w_ extends tr {
            constructor(t, n, r) {
                super(),
                this.componentFactoryResolver = new cu(this),
                this.instance = null;
                const o = new Zc([...t, {
                    provide: tr,
                    useValue: this
                }, {
                    provide: jo,
                    useValue: this.componentFactoryResolver
                }],n || da(),r,new Set(["environment"]));
                this.injector = o,
                o.resolveInjectorInitializers()
            }
            destroy() {
                this.injector.destroy()
            }
            onDestroy(t) {
                this.injector.onDestroy(t)
            }
        }
        let I_ = (()=>{
            class e {
                constructor(n) {
                    this._injector = n,
                    this.cachedInjectors = new Map
                }
                getOrCreateStandaloneInjector(n) {
                    if (!n.standalone)
                        return null;
                    if (!this.cachedInjectors.has(n)) {
                        const r = Wc(0, n.type)
                          , o = r.length > 0 ? function kh(e, t=null, n=null) {
                            return new w_(e,t,n).injector
                        }([r], this._injector, `Standalone[${n.type.name}]`) : null;
                        this.cachedInjectors.set(n, o)
                    }
                    return this.cachedInjectors.get(n)
                }
                ngOnDestroy() {
                    try {
                        for (const n of this.cachedInjectors.values())
                            null !== n && n.destroy()
                    } finally {
                        this.cachedInjectors.clear()
                    }
                }
            }
            return e.\u0275prov = vt({
                token: e,
                providedIn: "environment",
                factory: ()=>new e(at(Ao))
            }),
            e
        }
        )();
        function Vh(e) {
            e.getStandaloneInjector = t=>t.get(I_).getOrCreateStandaloneInjector(e)
        }
        function jh(e, t, n, r, o, i) {
            const s = t + n;
            return Mt(e, s, o) ? function Dn(e, t, n) {
                return e[t] = n
            }(e, s + 1, i ? r.call(i, o) : r(o)) : function $o(e, t) {
                const n = e[t];
                return n === Ie ? void 0 : n
            }(e, s + 1)
        }
        function Gh(e, t) {
            const n = ke();
            let r;
            const o = e + b;
            n.firstCreatePass ? (r = function L_(e, t) {
                if (t)
                    for (let n = t.length - 1; n >= 0; n--) {
                        const r = t[n];
                        if (e === r.name)
                            return r
                    }
            }(t, n.pipeRegistry),
            n.data[o] = r,
            r.onDestroy && (n.destroyHooks || (n.destroyHooks = [])).push(o, r.onDestroy)) : r = n.data[o];
            const i = r.factory || (r.factory = Mn(r.type))
              , s = je(Sr);
            try {
                const a = fi(!1)
                  , u = i();
                return fi(a),
                function fv(e, t, n, r) {
                    n >= e.data.length && (e.data[n] = null,
                    e.blueprint[n] = null),
                    t[n] = r
                }(n, V(), o, u),
                u
            } finally {
                je(s)
            }
        }
        function zh(e, t, n) {
            const r = e + b
              , o = V()
              , i = function $e(e, t) {
                return e[t]
            }(o, r);
            return function Uo(e, t) {
                return e[1].data[t].pure
            }(o, r) ? jh(o, function At() {
                const e = me.lFrame;
                let t = e.bindingRootIndex;
                return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                t
            }(), t, i.transform, n, i) : i.transform(n)
        }
        function hu(e) {
            return t=>{
                setTimeout(e, void 0, t)
            }
        }
        const Nn = class H_ extends D.x {
            constructor(t=!1) {
                super(),
                this.__isAsync = t
            }
            emit(t) {
                super.next(t)
            }
            subscribe(t, n, r) {
                var o, i, s;
                let a = t
                  , u = n || (()=>null)
                  , c = r;
                if (t && "object" == typeof t) {
                    const y = t;
                    a = null === (o = y.next) || void 0 === o ? void 0 : o.bind(y),
                    u = null === (i = y.error) || void 0 === i ? void 0 : i.bind(y),
                    c = null === (s = y.complete) || void 0 === s ? void 0 : s.bind(y)
                }
                this.__isAsync && (u = hu(u),
                a && (a = hu(a)),
                c && (c = hu(c)));
                const f = super.subscribe({
                    next: a,
                    error: u,
                    complete: c
                });
                return t instanceof w.w0 && t.add(f),
                f
            }
        }
        ;
        function $_() {
            return this._results[Jn()]()
        }
        class pu {
            constructor(t=!1) {
                this._emitDistinctChangesOnly = t,
                this.dirty = !0,
                this._results = [],
                this._changesDetected = !1,
                this._changes = null,
                this.length = 0,
                this.first = void 0,
                this.last = void 0;
                const n = Jn()
                  , r = pu.prototype;
                r[n] || (r[n] = $_)
            }
            get changes() {
                return this._changes || (this._changes = new Nn)
            }
            get(t) {
                return this._results[t]
            }
            map(t) {
                return this._results.map(t)
            }
            filter(t) {
                return this._results.filter(t)
            }
            find(t) {
                return this._results.find(t)
            }
            reduce(t, n) {
                return this._results.reduce(t, n)
            }
            forEach(t) {
                this._results.forEach(t)
            }
            some(t) {
                return this._results.some(t)
            }
            toArray() {
                return this._results.slice()
            }
            toString() {
                return this._results.toString()
            }
            reset(t, n) {
                const r = this;
                r.dirty = !1;
                const o = Lt(t);
                (this._changesDetected = !function Ng(e, t, n) {
                    if (e.length !== t.length)
                        return !1;
                    for (let r = 0; r < e.length; r++) {
                        let o = e[r]
                          , i = t[r];
                        if (n && (o = n(o),
                        i = n(i)),
                        i !== o)
                            return !1
                    }
                    return !0
                }(r._results, o, n)) && (r._results = o,
                r.length = o.length,
                r.last = o[this.length - 1],
                r.first = o[0])
            }
            notifyOnChanges() {
                this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
            }
            setDirty() {
                this.dirty = !0
            }
            destroy() {
                this.changes.complete(),
                this.changes.unsubscribe()
            }
        }
        let Go = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = z_,
            e
        }
        )();
        const U_ = Go
          , G_ = class extends U_ {
            constructor(t, n, r) {
                super(),
                this._declarationLView = t,
                this._declarationTContainer = n,
                this.elementRef = r
            }
            createEmbeddedView(t, n) {
                const r = this._declarationTContainer.tViews
                  , o = xo(this._declarationLView, r, t, 16, null, r.declTNode, null, null, null, null, n || null);
                o[17] = this._declarationLView[this._declarationTContainer.index];
                const s = this._declarationLView[m];
                return null !== s && (o[m] = s.createEmbeddedView(r)),
                Fo(r, o, t),
                new Ho(o)
            }
        }
        ;
        function z_() {
            return Qi(gt(), V())
        }
        function Qi(e, t) {
            return 4 & e.type ? new G_(t,e,zr(e, t)) : null
        }
        let Zi = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = W_,
            e
        }
        )();
        function W_() {
            return Kh(gt(), V())
        }
        const Y_ = Zi
          , Wh = class extends Y_ {
            constructor(t, n, r) {
                super(),
                this._lContainer = t,
                this._hostTNode = n,
                this._hostLView = r
            }
            get element() {
                return zr(this._hostTNode, this._hostLView)
            }
            get injector() {
                return new mr(this._hostTNode,this._hostLView)
            }
            get parentInjector() {
                const t = hi(this._hostTNode, this._hostLView);
                if (Il(t)) {
                    const n = gr(t, this._hostLView)
                      , r = pr(t);
                    return new mr(n[1].data[r + 8],n)
                }
                return new mr(null,this._hostLView)
            }
            clear() {
                for (; this.length > 0; )
                    this.remove(this.length - 1)
            }
            get(t) {
                const n = Yh(this._lContainer);
                return null !== n && n[t] || null
            }
            get length() {
                return this._lContainer.length - 10
            }
            createEmbeddedView(t, n, r) {
                let o, i;
                "number" == typeof r ? o = r : null != r && (o = r.index,
                i = r.injector);
                const s = t.createEmbeddedView(n || {}, i);
                return this.insert(s, o),
                s
            }
            createComponent(t, n, r, o, i) {
                const s = t && !function go(e) {
                    return "function" == typeof e
                }(t);
                let a;
                if (s)
                    a = n;
                else {
                    const y = n || {};
                    a = y.index,
                    r = y.injector,
                    o = y.projectableNodes,
                    i = y.environmentInjector || y.ngModuleRef
                }
                const u = s ? t : new du(Ve(t))
                  , c = r || this.parentInjector;
                if (!i && null == u.ngModule) {
                    const v = (s ? c : this.parentInjector).get(Ao, null);
                    v && (i = v)
                }
                const f = u.create(c, o, void 0, i);
                return this.insert(f.hostView, a),
                f
            }
            insert(t, n) {
                const r = t._lView
                  , o = r[1];
                if (function fr(e) {
                    return we(e[3])
                }(r)) {
                    const f = this.indexOf(t);
                    if (-1 !== f)
                        this.detach(f);
                    else {
                        const y = r[3]
                          , v = new Wh(y,y[6],y[3]);
                        v.detach(v.indexOf(t))
                    }
                }
                const i = this._adjustIndex(n)
                  , s = this._lContainer;
                !function dy(e, t, n, r) {
                    const o = 10 + r
                      , i = n.length;
                    r > 0 && (n[o - 1][4] = t),
                    r < i - 10 ? (t[4] = n[o],
                    Ol(n, 10 + r, t)) : (n.push(t),
                    t[4] = null),
                    t[3] = n;
                    const s = t[17];
                    null !== s && n !== s && function fy(e, t) {
                        const n = e[9];
                        t[16] !== t[3][3][16] && (e[2] = !0),
                        null === n ? e[9] = [t] : n.push(t)
                    }(s, t);
                    const a = t[m];
                    null !== a && a.insertView(e),
                    t[2] |= 64
                }(o, r, s, i);
                const a = ra(i, s)
                  , u = r[11]
                  , c = Ai(u, s[7]);
                return null !== c && function uy(e, t, n, r, o, i) {
                    r[0] = o,
                    r[6] = t,
                    So(e, r, n, 1, o, i)
                }(o, s[6], u, r, c, a),
                t.attachToViewContainerRef(),
                Ol(gu(s), i, t),
                t
            }
            move(t, n) {
                return this.insert(t, n)
            }
            indexOf(t) {
                const n = Yh(this._lContainer);
                return null !== n ? n.indexOf(t) : -1
            }
            remove(t) {
                const n = this._adjustIndex(t, -1)
                  , r = ea(this._lContainer, n);
                r && (mi(gu(this._lContainer), n),
                Ec(r[1], r))
            }
            detach(t) {
                const n = this._adjustIndex(t, -1)
                  , r = ea(this._lContainer, n);
                return r && null != mi(gu(this._lContainer), n) ? new Ho(r) : null
            }
            _adjustIndex(t, n=0) {
                return null == t ? this.length + n : t
            }
        }
        ;
        function Yh(e) {
            return e[8]
        }
        function gu(e) {
            return e[8] || (e[8] = [])
        }
        function Kh(e, t) {
            let n;
            const r = t[e.index];
            if (we(r))
                n = r;
            else {
                let o;
                if (8 & e.type)
                    o = O(r);
                else {
                    const i = t[11];
                    o = i.createComment("");
                    const s = Fe(e, t);
                    Qn(i, Ai(i, s), o, function my(e, t) {
                        return p(e) ? e.nextSibling(t) : t.nextSibling
                    }(i, s), !1)
                }
                t[e.index] = n = function Fd(e, t, n, r) {
                    return new Array(e,!0,!1,t,null,0,r,n,null,null)
                }(r, t, o, e),
                Vi(t, n)
            }
            return new Wh(n,e,t)
        }
        class mu {
            constructor(t) {
                this.queryList = t,
                this.matches = null
            }
            clone() {
                return new mu(this.queryList)
            }
            setDirty() {
                this.queryList.setDirty()
            }
        }
        class yu {
            constructor(t=[]) {
                this.queries = t
            }
            createEmbeddedView(t) {
                const n = t.queries;
                if (null !== n) {
                    const r = null !== t.contentQueries ? t.contentQueries[0] : n.length
                      , o = [];
                    for (let i = 0; i < r; i++) {
                        const s = n.getByIndex(i);
                        o.push(this.queries[s.indexInDeclarationView].clone())
                    }
                    return new yu(o)
                }
                return null
            }
            insertView(t) {
                this.dirtyQueriesWithMatches(t)
            }
            detachView(t) {
                this.dirtyQueriesWithMatches(t)
            }
            dirtyQueriesWithMatches(t) {
                for (let n = 0; n < this.queries.length; n++)
                    null !== np(t, n).matches && this.queries[n].setDirty()
            }
        }
        class qh {
            constructor(t, n, r=null) {
                this.predicate = t,
                this.flags = n,
                this.read = r
            }
        }
        class Du {
            constructor(t=[]) {
                this.queries = t
            }
            elementStart(t, n) {
                for (let r = 0; r < this.queries.length; r++)
                    this.queries[r].elementStart(t, n)
            }
            elementEnd(t) {
                for (let n = 0; n < this.queries.length; n++)
                    this.queries[n].elementEnd(t)
            }
            embeddedTView(t) {
                let n = null;
                for (let r = 0; r < this.length; r++) {
                    const o = null !== n ? n.length : 0
                      , i = this.getByIndex(r).embeddedTView(t, o);
                    i && (i.indexInDeclarationView = r,
                    null !== n ? n.push(i) : n = [i])
                }
                return null !== n ? new Du(n) : null
            }
            template(t, n) {
                for (let r = 0; r < this.queries.length; r++)
                    this.queries[r].template(t, n)
            }
            getByIndex(t) {
                return this.queries[t]
            }
            get length() {
                return this.queries.length
            }
            track(t) {
                this.queries.push(t)
            }
        }
        class vu {
            constructor(t, n=-1) {
                this.metadata = t,
                this.matches = null,
                this.indexInDeclarationView = -1,
                this.crossesNgTemplate = !1,
                this._appliesToNextNode = !0,
                this._declarationNodeIndex = n
            }
            elementStart(t, n) {
                this.isApplyingToNode(n) && this.matchTNode(t, n)
            }
            elementEnd(t) {
                this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
            }
            template(t, n) {
                this.elementStart(t, n)
            }
            embeddedTView(t, n) {
                return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0,
                this.addMatch(-t.index, n),
                new vu(this.metadata)) : null
            }
            isApplyingToNode(t) {
                if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                    const n = this._declarationNodeIndex;
                    let r = t.parent;
                    for (; null !== r && 8 & r.type && r.index !== n; )
                        r = r.parent;
                    return n === (null !== r ? r.index : -1)
                }
                return this._appliesToNextNode
            }
            matchTNode(t, n) {
                const r = this.metadata.predicate;
                if (Array.isArray(r))
                    for (let o = 0; o < r.length; o++) {
                        const i = r[o];
                        this.matchTNodeWithReadOption(t, n, Q_(n, i)),
                        this.matchTNodeWithReadOption(t, n, gi(n, t, i, !1, !1))
                    }
                else
                    r === Go ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1) : this.matchTNodeWithReadOption(t, n, gi(n, t, r, !1, !1))
            }
            matchTNodeWithReadOption(t, n, r) {
                if (null !== r) {
                    const o = this.metadata.read;
                    if (null !== o)
                        if (o === Bo || o === Zi || o === Go && 4 & n.type)
                            this.addMatch(n.index, -2);
                        else {
                            const i = gi(n, t, o, !1, !1);
                            null !== i && this.addMatch(n.index, i)
                        }
                    else
                        this.addMatch(n.index, r)
                }
            }
            addMatch(t, n) {
                null === this.matches ? this.matches = [t, n] : this.matches.push(t, n)
            }
        }
        function Q_(e, t) {
            const n = e.localNames;
            if (null !== n)
                for (let r = 0; r < n.length; r += 2)
                    if (n[r] === t)
                        return n[r + 1];
            return null
        }
        function J_(e, t, n, r) {
            return -1 === n ? function Z_(e, t) {
                return 11 & e.type ? zr(e, t) : 4 & e.type ? Qi(e, t) : null
            }(t, e) : -2 === n ? function X_(e, t, n) {
                return n === Bo ? zr(t, e) : n === Go ? Qi(t, e) : n === Zi ? Kh(t, e) : void 0
            }(e, t, r) : ho(e, e[1], n, t)
        }
        function Qh(e, t, n, r) {
            const o = t[m].queries[r];
            if (null === o.matches) {
                const i = e.data
                  , s = n.matches
                  , a = [];
                for (let u = 0; u < s.length; u += 2) {
                    const c = s[u];
                    a.push(c < 0 ? null : J_(t, i[c], s[u + 1], n.metadata.read))
                }
                o.matches = a
            }
            return o.matches
        }
        function Eu(e, t, n, r) {
            const o = e.queries.getByIndex(n)
              , i = o.matches;
            if (null !== i) {
                const s = Qh(e, t, o, n);
                for (let a = 0; a < i.length; a += 2) {
                    const u = i[a];
                    if (u > 0)
                        r.push(s[a / 2]);
                    else {
                        const c = i[a + 1]
                          , f = t[-u];
                        for (let y = 10; y < f.length; y++) {
                            const v = f[y];
                            v[17] === v[3] && Eu(v[1], v, c, r)
                        }
                        if (null !== f[9]) {
                            const y = f[9];
                            for (let v = 0; v < y.length; v++) {
                                const I = y[v];
                                Eu(I[1], I, c, r)
                            }
                        }
                    }
                }
            }
            return r
        }
        function Zh(e) {
            const t = V()
              , n = ke()
              , r = gl();
            _s(r + 1);
            const o = np(n, r);
            if (e.dirty && jn(t) === (2 == (2 & o.metadata.flags))) {
                if (null === o.matches)
                    e.reset([]);
                else {
                    const i = o.crossesNgTemplate ? Eu(n, t, r, []) : Qh(n, t, o, r);
                    e.reset(i, d_),
                    e.notifyOnChanges()
                }
                return !0
            }
            return !1
        }
        function Jh(e, t, n) {
            const r = ke();
            r.firstCreatePass && (function tp(e, t, n) {
                null === e.queries && (e.queries = new Du),
                e.queries.track(new vu(t,n))
            }(r, new qh(e,t,n), -1),
            2 == (2 & t) && (r.staticViewQueries = !0)),
            function ep(e, t, n) {
                const r = new pu(4 == (4 & n));
                wd(e, t, r, r.destroy),
                null === t[m] && (t[m] = new yu),
                t[m].queries.push(new mu(r))
            }(r, V(), t)
        }
        function Xh() {
            return function tC(e, t) {
                return e[m].queries[t].queryList
            }(V(), gl())
        }
        function np(e, t) {
            return e.queries.getByIndex(t)
        }
        function Xi(...e) {}
        const _p = new Ye("Application Initializer");
        let es = (()=>{
            class e {
                constructor(n) {
                    this.appInits = n,
                    this.resolve = Xi,
                    this.reject = Xi,
                    this.initialized = !1,
                    this.done = !1,
                    this.donePromise = new Promise((r,o)=>{
                        this.resolve = r,
                        this.reject = o
                    }
                    )
                }
                runInitializers() {
                    if (this.initialized)
                        return;
                    const n = []
                      , r = ()=>{
                        this.done = !0,
                        this.resolve()
                    }
                    ;
                    if (this.appInits)
                        for (let o = 0; o < this.appInits.length; o++) {
                            const i = this.appInits[o]();
                            if (qa(i))
                                n.push(i);
                            else if (yv(i)) {
                                const s = new Promise((a,u)=>{
                                    i.subscribe({
                                        complete: a,
                                        error: u
                                    })
                                }
                                );
                                n.push(s)
                            }
                        }
                    Promise.all(n).then(()=>{
                        r()
                    }
                    ).catch(o=>{
                        this.reject(o)
                    }
                    ),
                    0 === n.length && r(),
                    this.initialized = !0
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(at(_p, 8))
            }
            ,
            e.\u0275prov = vt({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        const Cp = new Ye("AppId",{
            providedIn: "root",
            factory: function wp() {
                return `${Mu()}${Mu()}${Mu()}`
            }
        });
        function Mu() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }
        const Ip = new Ye("Platform Initializer")
          , CC = new Ye("Platform ID",{
            providedIn: "platform",
            factory: ()=>"unknown"
        })
          , wC = new Ye("appBootstrapListener")
          , ts = new Ye("LocaleId",{
            providedIn: "root",
            factory: ()=>zg(ts, ge.Optional | ge.SkipSelf) || function IC() {
                return "undefined" != typeof $localize && $localize.locale || Ur
            }()
        })
          , MC = new Ye("DefaultCurrencyCode",{
            providedIn: "root",
            factory: ()=>"USD"
        })
          , SC = (()=>Promise.resolve(0))();
        function bu(e) {
            "undefined" == typeof Zone ? SC.then(()=>{
                e && e.apply(null, null)
            }
            ) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
        }
        class jt {
            constructor({enableLongStackTrace: t=!1, shouldCoalesceEventChangeDetection: n=!1, shouldCoalesceRunChangeDetection: r=!1}) {
                if (this.hasPendingMacrotasks = !1,
                this.hasPendingMicrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new Nn(!1),
                this.onMicrotaskEmpty = new Nn(!1),
                this.onStable = new Nn(!1),
                this.onError = new Nn(!1),
                "undefined" == typeof Zone)
                    throw new Error("In this configuration Angular requires Zone.js");
                Zone.assertZonePatched();
                const o = this;
                o._nesting = 0,
                o._outer = o._inner = Zone.current,
                Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)),
                t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
                o.shouldCoalesceEventChangeDetection = !r && n,
                o.shouldCoalesceRunChangeDetection = r,
                o.lastRequestAnimationFrameId = -1,
                o.nativeRequestAnimationFrame = function AC() {
                    let e = We.requestAnimationFrame
                      , t = We.cancelAnimationFrame;
                    if ("undefined" != typeof Zone && e && t) {
                        const n = e[Zone.__symbol__("OriginalDelegate")];
                        n && (e = n);
                        const r = t[Zone.__symbol__("OriginalDelegate")];
                        r && (t = r)
                    }
                    return {
                        nativeRequestAnimationFrame: e,
                        nativeCancelAnimationFrame: t
                    }
                }().nativeRequestAnimationFrame,
                function NC(e) {
                    const t = ()=>{
                        !function FC(e) {
                            e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(We, ()=>{
                                e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", ()=>{
                                    e.lastRequestAnimationFrameId = -1,
                                    Su(e),
                                    e.isCheckStableRunning = !0,
                                    Tu(e),
                                    e.isCheckStableRunning = !1
                                }
                                , void 0, ()=>{}
                                , ()=>{}
                                )),
                                e.fakeTopEventTask.invoke()
                            }
                            ),
                            Su(e))
                        }(e)
                    }
                    ;
                    e._inner = e._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (n,r,o,i,s,a)=>{
                            try {
                                return Mp(e),
                                n.invokeTask(o, i, s, a)
                            } finally {
                                (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && t(),
                                bp(e)
                            }
                        }
                        ,
                        onInvoke: (n,r,o,i,s,a,u)=>{
                            try {
                                return Mp(e),
                                n.invoke(o, i, s, a, u)
                            } finally {
                                e.shouldCoalesceRunChangeDetection && t(),
                                bp(e)
                            }
                        }
                        ,
                        onHasTask: (n,r,o,i)=>{
                            n.hasTask(o, i),
                            r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask,
                            Su(e),
                            Tu(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                        }
                        ,
                        onHandleError: (n,r,o,i)=>(n.handleError(o, i),
                        e.runOutsideAngular(()=>e.onError.emit(i)),
                        !1)
                    })
                }(o)
            }
            static isInAngularZone() {
                return "undefined" != typeof Zone && !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!jt.isInAngularZone())
                    throw new Error("Expected to be in Angular Zone, but it is not!")
            }
            static assertNotInAngularZone() {
                if (jt.isInAngularZone())
                    throw new Error("Expected to not be in Angular Zone, but it is!")
            }
            run(t, n, r) {
                return this._inner.run(t, n, r)
            }
            runTask(t, n, r, o) {
                const i = this._inner
                  , s = i.scheduleEventTask("NgZoneEvent: " + o, t, xC, Xi, Xi);
                try {
                    return i.runTask(s, n, r)
                } finally {
                    i.cancelTask(s)
                }
            }
            runGuarded(t, n, r) {
                return this._inner.runGuarded(t, n, r)
            }
            runOutsideAngular(t) {
                return this._outer.run(t)
            }
        }
        const xC = {};
        function Tu(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
                try {
                    e._nesting++,
                    e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--,
                    !e.hasPendingMicrotasks)
                        try {
                            e.runOutsideAngular(()=>e.onStable.emit(null))
                        } finally {
                            e.isStable = !0
                        }
                }
        }
        function Su(e) {
            e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
        }
        function Mp(e) {
            e._nesting++,
            e.isStable && (e.isStable = !1,
            e.onUnstable.emit(null))
        }
        function bp(e) {
            e._nesting--,
            Tu(e)
        }
        class PC {
            constructor() {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new Nn,
                this.onMicrotaskEmpty = new Nn,
                this.onStable = new Nn,
                this.onError = new Nn
            }
            run(t, n, r) {
                return t.apply(n, r)
            }
            runGuarded(t, n, r) {
                return t.apply(n, r)
            }
            runOutsideAngular(t) {
                return t()
            }
            runTask(t, n, r, o) {
                return t.apply(n, r)
            }
        }
        const Tp = new Ye("")
          , Sp = new Ye("");
        let Yo, RC = (()=>{
            class e {
                constructor(n, r, o) {
                    this._ngZone = n,
                    this.registry = r,
                    this._pendingCount = 0,
                    this._isZoneStable = !0,
                    this._didWork = !1,
                    this._callbacks = [],
                    this.taskTrackingZone = null,
                    Yo || (function OC(e) {
                        Yo = e
                    }(o),
                    o.addToWindow(r)),
                    this._watchAngularEvents(),
                    n.run(()=>{
                        this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                    }
                    )
                }
                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: ()=>{
                            this._didWork = !0,
                            this._isZoneStable = !1
                        }
                    }),
                    this._ngZone.runOutsideAngular(()=>{
                        this._ngZone.onStable.subscribe({
                            next: ()=>{
                                jt.assertNotInAngularZone(),
                                bu(()=>{
                                    this._isZoneStable = !0,
                                    this._runCallbacksIfReady()
                                }
                                )
                            }
                        })
                    }
                    )
                }
                increasePendingRequestCount() {
                    return this._pendingCount += 1,
                    this._didWork = !0,
                    this._pendingCount
                }
                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1,
                    this._pendingCount < 0)
                        throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(),
                    this._pendingCount
                }
                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }
                _runCallbacksIfReady() {
                    if (this.isStable())
                        bu(()=>{
                            for (; 0 !== this._callbacks.length; ) {
                                let n = this._callbacks.pop();
                                clearTimeout(n.timeoutId),
                                n.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        }
                        );
                    else {
                        let n = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(r=>!r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId),
                        !1)),
                        this._didWork = !0
                    }
                }
                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n=>({
                        source: n.source,
                        creationLocation: n.creationLocation,
                        data: n.data
                    })) : []
                }
                addCallback(n, r, o) {
                    let i = -1;
                    r && r > 0 && (i = setTimeout(()=>{
                        this._callbacks = this._callbacks.filter(s=>s.timeoutId !== i),
                        n(this._didWork, this.getPendingTasks())
                    }
                    , r)),
                    this._callbacks.push({
                        doneCb: n,
                        timeoutId: i,
                        updateCb: o
                    })
                }
                whenStable(n, r, o) {
                    if (o && !this.taskTrackingZone)
                        throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(n, r, o),
                    this._runCallbacksIfReady()
                }
                getPendingRequestCount() {
                    return this._pendingCount
                }
                registerApplication(n) {
                    this.registry.registerApplication(n, this)
                }
                unregisterApplication(n) {
                    this.registry.unregisterApplication(n)
                }
                findProviders(n, r, o) {
                    return []
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(at(jt),at(Ap),at(Sp))
            }
            ,
            e.\u0275prov = vt({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )(), Ap = (()=>{
            class e {
                constructor() {
                    this._applications = new Map
                }
                registerApplication(n, r) {
                    this._applications.set(n, r)
                }
                unregisterApplication(n) {
                    this._applications.delete(n)
                }
                unregisterAllApplications() {
                    this._applications.clear()
                }
                getTestability(n) {
                    return this._applications.get(n) || null
                }
                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }
                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }
                findTestabilityInTree(n, r=!0) {
                    var o;
                    return null !== (o = null == Yo ? void 0 : Yo.findTestabilityInTree(this, n, r)) && void 0 !== o ? o : null
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = vt({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            }),
            e
        }
        )(), _n = null;
        const xp = new Ye("AllowMultipleToken")
          , Fp = new Ye("PlatformOnDestroy");
        function Pp(e, t, n=[]) {
            const r = `Platform: ${t}`
              , o = new Ye(r);
            return (i=[])=>{
                let s = Au();
                if (!s || s.injector.get(xp, !1)) {
                    const a = [...n, ...i, {
                        provide: o,
                        useValue: !0
                    }];
                    e ? e(a) : function VC(e) {
                        if (_n && !_n.get(xp, !1))
                            throw new x(400,"");
                        _n = e;
                        const t = e.get(Op);
                        (function Np(e) {
                            const t = e.get(Ip, null);
                            t && t.forEach(n=>n())
                        }
                        )(e)
                    }(function Rp(e=[], t) {
                        return mn.create({
                            name: t,
                            providers: [{
                                provide: la,
                                useValue: "platform"
                            }, {
                                provide: Fp,
                                useValue: ()=>_n = null
                            }, ...e]
                        })
                    }(a, r))
                }
                return function BC(e) {
                    const t = Au();
                    if (!t)
                        throw new x(401,"");
                    return t
                }()
            }
        }
        function Au() {
            var e;
            return null !== (e = null == _n ? void 0 : _n.get(Op)) && void 0 !== e ? e : null
        }
        let Op = (()=>{
            class e {
                constructor(n) {
                    this._injector = n,
                    this._modules = [],
                    this._destroyListeners = [],
                    this._destroyed = !1
                }
                bootstrapModuleFactory(n, r) {
                    const o = function HC(e, t) {
                        let n;
                        return n = "noop" === e ? new PC : ("zone.js" === e ? void 0 : e) || new jt(t),
                        n
                    }(null == r ? void 0 : r.ngZone, function Lp(e) {
                        return {
                            enableLongStackTrace: !1,
                            shouldCoalesceEventChangeDetection: !(!e || !e.ngZoneEventCoalescing) || !1,
                            shouldCoalesceRunChangeDetection: !(!e || !e.ngZoneRunCoalescing) || !1
                        }
                    }(r))
                      , i = [{
                        provide: jt,
                        useValue: o
                    }];
                    return o.run(()=>{
                        const s = mn.create({
                            providers: i,
                            parent: this.injector,
                            name: n.moduleType.name
                        })
                          , a = n.create(s)
                          , u = a.injector.get(bo, null);
                        if (!u)
                            throw new x(402,"");
                        return o.runOutsideAngular(()=>{
                            const c = o.onError.subscribe({
                                next: f=>{
                                    u.handleError(f)
                                }
                            });
                            a.onDestroy(()=>{
                                rs(this._modules, a),
                                c.unsubscribe()
                            }
                            )
                        }
                        ),
                        function kp(e, t, n) {
                            try {
                                const r = n();
                                return qa(r) ? r.catch(o=>{
                                    throw t.runOutsideAngular(()=>e.handleError(o)),
                                    o
                                }
                                ) : r
                            } catch (r) {
                                throw t.runOutsideAngular(()=>e.handleError(r)),
                                r
                            }
                        }(u, o, ()=>{
                            const c = a.injector.get(es);
                            return c.runInitializers(),
                            c.donePromise.then(()=>(function sh(e) {
                                ot(e, "Expected localeId to be defined"),
                                "string" == typeof e && (ih = e.toLowerCase().replace(/_/g, "-"))
                            }(a.injector.get(ts, Ur) || Ur),
                            this._moduleDoBootstrap(a),
                            a))
                        }
                        )
                    }
                    )
                }
                bootstrapModule(n, r=[]) {
                    const o = Vp({}, r);
                    return function LC(e, t, n) {
                        const r = new fu(n);
                        return Promise.resolve(r)
                    }(0, 0, n).then(i=>this.bootstrapModuleFactory(i, o))
                }
                _moduleDoBootstrap(n) {
                    const r = n.injector.get(ns);
                    if (n._bootstrapComponents.length > 0)
                        n._bootstrapComponents.forEach(o=>r.bootstrap(o));
                    else {
                        if (!n.instance.ngDoBootstrap)
                            throw new x(403,"");
                        n.instance.ngDoBootstrap(r)
                    }
                    this._modules.push(n)
                }
                onDestroy(n) {
                    this._destroyListeners.push(n)
                }
                get injector() {
                    return this._injector
                }
                destroy() {
                    if (this._destroyed)
                        throw new x(404,"");
                    this._modules.slice().forEach(r=>r.destroy()),
                    this._destroyListeners.forEach(r=>r());
                    const n = this._injector.get(Fp, null);
                    null == n || n(),
                    this._destroyed = !0
                }
                get destroyed() {
                    return this._destroyed
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(at(mn))
            }
            ,
            e.\u0275prov = vt({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            }),
            e
        }
        )();
        function Vp(e, t) {
            return Array.isArray(t) ? t.reduce(Vp, e) : Object.assign(Object.assign({}, e), t)
        }
        let ns = (()=>{
            class e {
                constructor(n, r, o, i) {
                    this._zone = n,
                    this._injector = r,
                    this._exceptionHandler = o,
                    this._initStatus = i,
                    this._bootstrapListeners = [],
                    this._views = [],
                    this._runningTick = !1,
                    this._stable = !0,
                    this._destroyed = !1,
                    this._destroyListeners = [],
                    this.componentTypes = [],
                    this.components = [],
                    this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: ()=>{
                            this._zone.run(()=>{
                                this.tick()
                            }
                            )
                        }
                    });
                    const s = new X.y(u=>{
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks,
                        this._zone.runOutsideAngular(()=>{
                            u.next(this._stable),
                            u.complete()
                        }
                        )
                    }
                    )
                      , a = new X.y(u=>{
                        let c;
                        this._zone.runOutsideAngular(()=>{
                            c = this._zone.onStable.subscribe(()=>{
                                jt.assertNotInAngularZone(),
                                bu(()=>{
                                    !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0,
                                    u.next(!0))
                                }
                                )
                            }
                            )
                        }
                        );
                        const f = this._zone.onUnstable.subscribe(()=>{
                            jt.assertInAngularZone(),
                            this._stable && (this._stable = !1,
                            this._zone.runOutsideAngular(()=>{
                                u.next(!1)
                            }
                            ))
                        }
                        );
                        return ()=>{
                            c.unsubscribe(),
                            f.unsubscribe()
                        }
                    }
                    );
                    this.isStable = (0,
                    J.T)(s, a.pipe(function k(e={}) {
                        const {connector: t=(()=>new D.x), resetOnError: n=!0, resetOnComplete: r=!0, resetOnRefCountZero: o=!0} = e;
                        return i=>{
                            let s = null
                              , a = null
                              , u = null
                              , c = 0
                              , f = !1
                              , y = !1;
                            const v = ()=>{
                                null == a || a.unsubscribe(),
                                a = null
                            }
                              , I = ()=>{
                                v(),
                                s = u = null,
                                f = y = !1
                            }
                              , P = ()=>{
                                const j = s;
                                I(),
                                null == j || j.unsubscribe()
                            }
                            ;
                            return (0,
                            ye.e)((j,G)=>{
                                c++,
                                !y && !f && v();
                                const K = u = null != u ? u : t();
                                G.add(()=>{
                                    c--,
                                    0 === c && !y && !f && (a = le(P, o))
                                }
                                ),
                                K.subscribe(G),
                                s || (s = new Y.Hp({
                                    next: oe=>K.next(oe),
                                    error: oe=>{
                                        y = !0,
                                        v(),
                                        a = le(I, n, oe),
                                        K.error(oe)
                                    }
                                    ,
                                    complete: ()=>{
                                        f = !0,
                                        v(),
                                        a = le(I, r),
                                        K.complete()
                                    }
                                }),
                                (0,
                                U.D)(j).subscribe(s))
                            }
                            )(i)
                        }
                    }()))
                }
                get destroyed() {
                    return this._destroyed
                }
                get injector() {
                    return this._injector
                }
                bootstrap(n, r) {
                    const o = n instanceof Nh;
                    if (!this._initStatus.done)
                        throw !o && function Wo(e) {
                            const t = Ve(e) || Qe(e) || ht(e);
                            return null !== t && t.standalone
                        }(n),
                        new x(405,false);
                    let i;
                    i = o ? n : this._injector.get(jo).resolveComponentFactory(n),
                    this.componentTypes.push(i.componentType);
                    const s = function kC(e) {
                        return e.isBoundToModule
                    }(i) ? void 0 : this._injector.get(tr)
                      , u = i.create(mn.NULL, [], r || i.selector, s)
                      , c = u.location.nativeElement
                      , f = u.injector.get(Tp, null);
                    return null == f || f.registerApplication(c),
                    u.onDestroy(()=>{
                        this.detachView(u.hostView),
                        rs(this.components, u),
                        null == f || f.unregisterApplication(c)
                    }
                    ),
                    this._loadComponent(u),
                    u
                }
                tick() {
                    if (this._runningTick)
                        throw new x(101,"");
                    try {
                        this._runningTick = !0;
                        for (let n of this._views)
                            n.detectChanges()
                    } catch (n) {
                        this._zone.runOutsideAngular(()=>this._exceptionHandler.handleError(n))
                    } finally {
                        this._runningTick = !1
                    }
                }
                attachView(n) {
                    const r = n;
                    this._views.push(r),
                    r.attachToAppRef(this)
                }
                detachView(n) {
                    const r = n;
                    rs(this._views, r),
                    r.detachFromAppRef()
                }
                _loadComponent(n) {
                    this.attachView(n.hostView),
                    this.tick(),
                    this.components.push(n),
                    this._injector.get(wC, []).concat(this._bootstrapListeners).forEach(o=>o(n))
                }
                ngOnDestroy() {
                    if (!this._destroyed)
                        try {
                            this._destroyListeners.forEach(n=>n()),
                            this._views.slice().forEach(n=>n.destroy()),
                            this._onMicrotaskEmptySubscription.unsubscribe()
                        } finally {
                            this._destroyed = !0,
                            this._views = [],
                            this._bootstrapListeners = [],
                            this._destroyListeners = []
                        }
                }
                onDestroy(n) {
                    return this._destroyListeners.push(n),
                    ()=>rs(this._destroyListeners, n)
                }
                destroy() {
                    if (this._destroyed)
                        throw new x(406,false);
                    const n = this._injector;
                    n.destroy && !n.destroyed && n.destroy()
                }
                get viewCount() {
                    return this._views.length
                }
                warnIfDestroyed() {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(at(jt),at(mn),at(bo),at(es))
            }
            ,
            e.\u0275prov = vt({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        function rs(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }
        let Bp = !0;
        function UC() {
            Bp = !1
        }
        let GC = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = zC,
            e
        }
        )();
        function zC(e) {
            return function WC(e, t, n) {
                if (cn(e) && !n) {
                    const r = ze(e.index, t);
                    return new Ho(r,r)
                }
                return 47 & e.type ? new Ho(t[16],t) : null
            }(gt(), V(), 16 == (16 & e))
        }
        class zp {
            constructor() {}
            supports(t) {
                return No(t)
            }
            create(t) {
                return new JC(t)
            }
        }
        const ZC = (e,t)=>t;
        class JC {
            constructor(t) {
                this.length = 0,
                this._linkedRecords = null,
                this._unlinkedRecords = null,
                this._previousItHead = null,
                this._itHead = null,
                this._itTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._movesHead = null,
                this._movesTail = null,
                this._removalsHead = null,
                this._removalsTail = null,
                this._identityChangesHead = null,
                this._identityChangesTail = null,
                this._trackByFn = t || ZC
            }
            forEachItem(t) {
                let n;
                for (n = this._itHead; null !== n; n = n._next)
                    t(n)
            }
            forEachOperation(t) {
                let n = this._itHead
                  , r = this._removalsHead
                  , o = 0
                  , i = null;
                for (; n || r; ) {
                    const s = !r || n && n.currentIndex < Yp(r, o, i) ? n : r
                      , a = Yp(s, o, i)
                      , u = s.currentIndex;
                    if (s === r)
                        o--,
                        r = r._nextRemoved;
                    else if (n = n._next,
                    null == s.previousIndex)
                        o++;
                    else {
                        i || (i = []);
                        const c = a - o
                          , f = u - o;
                        if (c != f) {
                            for (let v = 0; v < c; v++) {
                                const I = v < i.length ? i[v] : i[v] = 0
                                  , P = I + v;
                                f <= P && P < c && (i[v] = I + 1)
                            }
                            i[s.previousIndex] = f - c
                        }
                    }
                    a !== u && t(s, a, u)
                }
            }
            forEachPreviousItem(t) {
                let n;
                for (n = this._previousItHead; null !== n; n = n._nextPrevious)
                    t(n)
            }
            forEachAddedItem(t) {
                let n;
                for (n = this._additionsHead; null !== n; n = n._nextAdded)
                    t(n)
            }
            forEachMovedItem(t) {
                let n;
                for (n = this._movesHead; null !== n; n = n._nextMoved)
                    t(n)
            }
            forEachRemovedItem(t) {
                let n;
                for (n = this._removalsHead; null !== n; n = n._nextRemoved)
                    t(n)
            }
            forEachIdentityChange(t) {
                let n;
                for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange)
                    t(n)
            }
            diff(t) {
                if (null == t && (t = []),
                !No(t))
                    throw new x(900,"");
                return this.check(t) ? this : null
            }
            onDestroy() {}
            check(t) {
                this._reset();
                let o, i, s, n = this._itHead, r = !1;
                if (Array.isArray(t)) {
                    this.length = t.length;
                    for (let a = 0; a < this.length; a++)
                        i = t[a],
                        s = this._trackByFn(a, i),
                        null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                        Object.is(n.item, i) || this._addIdentityChange(n, i)) : (n = this._mismatch(n, i, s, a),
                        r = !0),
                        n = n._next
                } else
                    o = 0,
                    function uv(e, t) {
                        if (Array.isArray(e))
                            for (let n = 0; n < e.length; n++)
                                t(e[n]);
                        else {
                            const n = e[Jn()]();
                            let r;
                            for (; !(r = n.next()).done; )
                                t(r.value)
                        }
                    }(t, a=>{
                        s = this._trackByFn(o, a),
                        null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                        Object.is(n.item, a) || this._addIdentityChange(n, a)) : (n = this._mismatch(n, a, s, o),
                        r = !0),
                        n = n._next,
                        o++
                    }
                    ),
                    this.length = o;
                return this._truncate(n),
                this.collection = t,
                this.isDirty
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }
            _reset() {
                if (this.isDirty) {
                    let t;
                    for (t = this._previousItHead = this._itHead; null !== t; t = t._next)
                        t._nextPrevious = t._next;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded)
                        t.previousIndex = t.currentIndex;
                    for (this._additionsHead = this._additionsTail = null,
                    t = this._movesHead; null !== t; t = t._nextMoved)
                        t.previousIndex = t.currentIndex;
                    this._movesHead = this._movesTail = null,
                    this._removalsHead = this._removalsTail = null,
                    this._identityChangesHead = this._identityChangesTail = null
                }
            }
            _mismatch(t, n, r, o) {
                let i;
                return null === t ? i = this._itTail : (i = t._prev,
                this._remove(t)),
                null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(r, o)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o)) : t = this._addAfter(new XC(n,r), i, o),
                t
            }
            _verifyReinsertion(t, n, r, o) {
                let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
                return null !== i ? t = this._reinsertAfter(i, t._prev, o) : t.currentIndex != o && (t.currentIndex = o,
                this._addToMoves(t, o)),
                t
            }
            _truncate(t) {
                for (; null !== t; ) {
                    const n = t._next;
                    this._addToRemovals(this._unlink(t)),
                    t = n
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail && (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }
            _reinsertAfter(t, n, r) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
                const o = t._prevRemoved
                  , i = t._nextRemoved;
                return null === o ? this._removalsHead = i : o._nextRemoved = i,
                null === i ? this._removalsTail = o : i._prevRemoved = o,
                this._insertAfter(t, n, r),
                this._addToMoves(t, r),
                t
            }
            _moveAfter(t, n, r) {
                return this._unlink(t),
                this._insertAfter(t, n, r),
                this._addToMoves(t, r),
                t
            }
            _addAfter(t, n, r) {
                return this._insertAfter(t, n, r),
                this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t,
                t
            }
            _insertAfter(t, n, r) {
                const o = null === n ? this._itHead : n._next;
                return t._next = o,
                t._prev = n,
                null === o ? this._itTail = t : o._prev = t,
                null === n ? this._itHead = t : n._next = t,
                null === this._linkedRecords && (this._linkedRecords = new Wp),
                this._linkedRecords.put(t),
                t.currentIndex = r,
                t
            }
            _remove(t) {
                return this._addToRemovals(this._unlink(t))
            }
            _unlink(t) {
                null !== this._linkedRecords && this._linkedRecords.remove(t);
                const n = t._prev
                  , r = t._next;
                return null === n ? this._itHead = r : n._next = r,
                null === r ? this._itTail = n : r._prev = n,
                t
            }
            _addToMoves(t, n) {
                return t.previousIndex === n || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t),
                t
            }
            _addToRemovals(t) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new Wp),
                this._unlinkedRecords.put(t),
                t.currentIndex = null,
                t._nextRemoved = null,
                null === this._removalsTail ? (this._removalsTail = this._removalsHead = t,
                t._prevRemoved = null) : (t._prevRemoved = this._removalsTail,
                this._removalsTail = this._removalsTail._nextRemoved = t),
                t
            }
            _addIdentityChange(t, n) {
                return t.item = n,
                this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t,
                t
            }
        }
        class XC {
            constructor(t, n) {
                this.item = t,
                this.trackById = n,
                this.currentIndex = null,
                this.previousIndex = null,
                this._nextPrevious = null,
                this._prev = null,
                this._next = null,
                this._prevDup = null,
                this._nextDup = null,
                this._prevRemoved = null,
                this._nextRemoved = null,
                this._nextAdded = null,
                this._nextMoved = null,
                this._nextIdentityChange = null
            }
        }
        class ew {
            constructor() {
                this._head = null,
                this._tail = null
            }
            add(t) {
                null === this._head ? (this._head = this._tail = t,
                t._nextDup = null,
                t._prevDup = null) : (this._tail._nextDup = t,
                t._prevDup = this._tail,
                t._nextDup = null,
                this._tail = t)
            }
            get(t, n) {
                let r;
                for (r = this._head; null !== r; r = r._nextDup)
                    if ((null === n || n <= r.currentIndex) && Object.is(r.trackById, t))
                        return r;
                return null
            }
            remove(t) {
                const n = t._prevDup
                  , r = t._nextDup;
                return null === n ? this._head = r : n._nextDup = r,
                null === r ? this._tail = n : r._prevDup = n,
                null === this._head
            }
        }
        class Wp {
            constructor() {
                this.map = new Map
            }
            put(t) {
                const n = t.trackById;
                let r = this.map.get(n);
                r || (r = new ew,
                this.map.set(n, r)),
                r.add(t)
            }
            get(t, n) {
                const o = this.map.get(t);
                return o ? o.get(t, n) : null
            }
            remove(t) {
                const n = t.trackById;
                return this.map.get(n).remove(t) && this.map.delete(n),
                t
            }
            get isEmpty() {
                return 0 === this.map.size
            }
            clear() {
                this.map.clear()
            }
        }
        function Yp(e, t, n) {
            const r = e.previousIndex;
            if (null === r)
                return r;
            let o = 0;
            return n && r < n.length && (o = n[r]),
            r + t + o
        }
        class Kp {
            constructor() {}
            supports(t) {
                return t instanceof Map || $a(t)
            }
            create() {
                return new tw
            }
        }
        class tw {
            constructor() {
                this._records = new Map,
                this._mapHead = null,
                this._appendAfter = null,
                this._previousMapHead = null,
                this._changesHead = null,
                this._changesTail = null,
                this._additionsHead = null,
                this._additionsTail = null,
                this._removalsHead = null,
                this._removalsTail = null
            }
            get isDirty() {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
            }
            forEachItem(t) {
                let n;
                for (n = this._mapHead; null !== n; n = n._next)
                    t(n)
            }
            forEachPreviousItem(t) {
                let n;
                for (n = this._previousMapHead; null !== n; n = n._nextPrevious)
                    t(n)
            }
            forEachChangedItem(t) {
                let n;
                for (n = this._changesHead; null !== n; n = n._nextChanged)
                    t(n)
            }
            forEachAddedItem(t) {
                let n;
                for (n = this._additionsHead; null !== n; n = n._nextAdded)
                    t(n)
            }
            forEachRemovedItem(t) {
                let n;
                for (n = this._removalsHead; null !== n; n = n._nextRemoved)
                    t(n)
            }
            diff(t) {
                if (t) {
                    if (!(t instanceof Map || $a(t)))
                        throw new x(900,"")
                } else
                    t = new Map;
                return this.check(t) ? this : null
            }
            onDestroy() {}
            check(t) {
                this._reset();
                let n = this._mapHead;
                if (this._appendAfter = null,
                this._forEach(t, (r,o)=>{
                    if (n && n.key === o)
                        this._maybeAddToChanges(n, r),
                        this._appendAfter = n,
                        n = n._next;
                    else {
                        const i = this._getOrCreateRecordForKey(o, r);
                        n = this._insertBeforeOrAppend(n, i)
                    }
                }
                ),
                n) {
                    n._prev && (n._prev._next = null),
                    this._removalsHead = n;
                    for (let r = n; null !== r; r = r._nextRemoved)
                        r === this._mapHead && (this._mapHead = null),
                        this._records.delete(r.key),
                        r._nextRemoved = r._next,
                        r.previousValue = r.currentValue,
                        r.currentValue = null,
                        r._prev = null,
                        r._next = null
                }
                return this._changesTail && (this._changesTail._nextChanged = null),
                this._additionsTail && (this._additionsTail._nextAdded = null),
                this.isDirty
            }
            _insertBeforeOrAppend(t, n) {
                if (t) {
                    const r = t._prev;
                    return n._next = t,
                    n._prev = r,
                    t._prev = n,
                    r && (r._next = n),
                    t === this._mapHead && (this._mapHead = n),
                    this._appendAfter = t,
                    t
                }
                return this._appendAfter ? (this._appendAfter._next = n,
                n._prev = this._appendAfter) : this._mapHead = n,
                this._appendAfter = n,
                null
            }
            _getOrCreateRecordForKey(t, n) {
                if (this._records.has(t)) {
                    const o = this._records.get(t);
                    this._maybeAddToChanges(o, n);
                    const i = o._prev
                      , s = o._next;
                    return i && (i._next = s),
                    s && (s._prev = i),
                    o._next = null,
                    o._prev = null,
                    o
                }
                const r = new nw(t);
                return this._records.set(t, r),
                r.currentValue = n,
                this._addToAdditions(r),
                r
            }
            _reset() {
                if (this.isDirty) {
                    let t;
                    for (this._previousMapHead = this._mapHead,
                    t = this._previousMapHead; null !== t; t = t._next)
                        t._nextPrevious = t._next;
                    for (t = this._changesHead; null !== t; t = t._nextChanged)
                        t.previousValue = t.currentValue;
                    for (t = this._additionsHead; null != t; t = t._nextAdded)
                        t.previousValue = t.currentValue;
                    this._changesHead = this._changesTail = null,
                    this._additionsHead = this._additionsTail = null,
                    this._removalsHead = null
                }
            }
            _maybeAddToChanges(t, n) {
                Object.is(n, t.currentValue) || (t.previousValue = t.currentValue,
                t.currentValue = n,
                this._addToChanges(t))
            }
            _addToAdditions(t) {
                null === this._additionsHead ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t,
                this._additionsTail = t)
            }
            _addToChanges(t) {
                null === this._changesHead ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t,
                this._changesTail = t)
            }
            _forEach(t, n) {
                t instanceof Map ? t.forEach(n) : Object.keys(t).forEach(r=>n(t[r], r))
            }
        }
        class nw {
            constructor(t) {
                this.key = t,
                this.previousValue = null,
                this.currentValue = null,
                this._nextPrevious = null,
                this._next = null,
                this._prev = null,
                this._nextAdded = null,
                this._nextRemoved = null,
                this._nextChanged = null
            }
        }
        function qp() {
            return new Ru([new zp])
        }
        let Ru = (()=>{
            class e {
                constructor(n) {
                    this.factories = n
                }
                static create(n, r) {
                    if (null != r) {
                        const o = r.factories.slice();
                        n = n.concat(o)
                    }
                    return new e(n)
                }
                static extend(n) {
                    return {
                        provide: e,
                        useFactory: r=>e.create(n, r || qp()),
                        deps: [[e, new _i, new Ei]]
                    }
                }
                find(n) {
                    const r = this.factories.find(o=>o.supports(n));
                    if (null != r)
                        return r;
                    throw new x(901,"")
                }
            }
            return e.\u0275prov = vt({
                token: e,
                providedIn: "root",
                factory: qp
            }),
            e
        }
        )();
        function Qp() {
            return new Ou([new Kp])
        }
        let Ou = (()=>{
            class e {
                constructor(n) {
                    this.factories = n
                }
                static create(n, r) {
                    if (r) {
                        const o = r.factories.slice();
                        n = n.concat(o)
                    }
                    return new e(n)
                }
                static extend(n) {
                    return {
                        provide: e,
                        useFactory: r=>e.create(n, r || Qp()),
                        deps: [[e, new _i, new Ei]]
                    }
                }
                find(n) {
                    const r = this.factories.find(i=>i.supports(n));
                    if (r)
                        return r;
                    throw new x(901,"")
                }
            }
            return e.\u0275prov = vt({
                token: e,
                providedIn: "root",
                factory: Qp
            }),
            e
        }
        )();
        const iw = Pp(null, "core", []);
        let sw = (()=>{
            class e {
                constructor(n) {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(at(ns))
            }
            ,
            e.\u0275mod = ar({
                type: e
            }),
            e.\u0275inj = Pn({}),
            e
        }
        )()
    }
}, Pe=>{
    Pe(Pe.s = 388)
}
]);
