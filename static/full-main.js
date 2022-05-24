'use strict';
(self.webpackChunkbook = self.webpackChunkbook || []).push([
  [179],
  {
    486: () => {
      function K(e) {
        return 'function' == typeof e;
      }
      function zr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const qr = zr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = n);
          }
      );
      function Yn(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ot {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (K(r))
              try {
                r();
              } catch (i) {
                t = i instanceof qr ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Qu(i);
                } catch (s) {
                  (t = null != t ? t : []),
                    s instanceof qr ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new qr(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Qu(t);
            else {
              if (t instanceof ot) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Yn(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Yn(n, t), t instanceof ot && t._removeParent(this);
        }
      }
      ot.EMPTY = (() => {
        const e = new ot();
        return (e.closed = !0), e;
      })();
      const qu = ot.EMPTY;
      function Wu(e) {
        return (
          e instanceof ot ||
          (e && 'closed' in e && K(e.remove) && K(e.add) && K(e.unsubscribe))
        );
      }
      function Qu(e) {
        K(e) ? e() : e.unsubscribe();
      }
      const Vt = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Wr = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Wr;
            return (null == r ? void 0 : r.setTimeout)
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Wr;
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Zu(e) {
        Wr.setTimeout(() => {
          const { onUnhandledError: t } = Vt;
          if (!t) throw e;
          t(e);
        });
      }
      function Yu() {}
      const jg = Ii('C', void 0, void 0);
      function Ii(e, t, n) {
        return {
          kind: e,
          value: t,
          error: n,
        };
      }
      let Bt = null;
      function Qr(e) {
        if (Vt.useDeprecatedSynchronousErrorHandling) {
          const t = !Bt;
          if (
            (t &&
              (Bt = {
                errorThrown: !1,
                error: null,
              }),
            e(),
            t)
          ) {
            const { errorThrown: n, error: r } = Bt;
            if (((Bt = null), n)) throw r;
          }
        } else e();
      }
      class Mi extends ot {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Wu(t) && t.add(this))
              : (this.destination = Wg);
        }
        static create(t, n, r) {
          return new Zr(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Si(
                (function $g(e) {
                  return Ii('N', e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Si(
                (function Hg(e) {
                  return Ii('E', void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Si(jg, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Gg = Function.prototype.bind;
      function Ti(e, t) {
        return Gg.call(e, t);
      }
      class zg {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Yr(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Yr(r);
            }
          else Yr(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Yr(n);
            }
        }
      }
      class Zr extends Mi {
        constructor(t, n, r) {
          let o;
          if ((super(), K(t) || !t))
            o = {
              next: null != t ? t : void 0,
              error: null != n ? n : void 0,
              complete: null != r ? r : void 0,
            };
          else {
            let i;
            this && Vt.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Ti(t.next, i),
                  error: t.error && Ti(t.error, i),
                  complete: t.complete && Ti(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new zg(o);
        }
      }
      function Yr(e) {
        Vt.useDeprecatedSynchronousErrorHandling
          ? (function Ug(e) {
              Vt.useDeprecatedSynchronousErrorHandling &&
                Bt &&
                ((Bt.errorThrown = !0), (Bt.error = e));
            })(e)
          : Zu(e);
      }
      function Si(e, t) {
        const { onStoppedNotification: n } = Vt;
        n && Wr.setTimeout(() => n(e, t));
      }
      const Wg = {
          closed: !0,
          next: Yu,
          error: function qg(e) {
            throw e;
          },
          complete: Yu,
        },
        Ai =
          ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function Ku(e) {
        return e;
      }
      let we = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function Zg(e) {
              return (
                (e && e instanceof Mi) ||
                ((function Qg(e) {
                  return e && K(e.next) && K(e.error) && K(e.complete);
                })(e) &&
                  Wu(e))
              );
            })(n)
              ? n
              : new Zr(n, r, o);
            return (
              Qr(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Xu(r))((o, i) => {
              const s = new Zr({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Ai]() {
            return this;
          }
          pipe(...n) {
            return (function Ju(e) {
              return 0 === e.length
                ? Ku
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = Xu(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Xu(e) {
        var t;
        return null !== (t = null != e ? e : Vt.Promise) && void 0 !== t
          ? t
          : Promise;
      }
      const Yg = zr(
        (e) =>
          function () {
            e(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed');
          }
      );
      let Kn = (() => {
        class e extends we {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new el(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Yg();
          }
          next(n) {
            Qr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Qr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Qr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? qu
              : ((this.currentObservers = null),
                i.push(n),
                new ot(() => {
                  (this.currentObservers = null), Yn(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new we();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new el(t, n)), e;
      })();
      class el extends Kn {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : qu;
        }
      }
      function jt(e) {
        return (t) => {
          if (
            (function Kg(e) {
              return K(null == e ? void 0 : e.lift);
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError('Unable to lift unknown Observable type');
        };
      }
      function Ht(e, t, n, r, o) {
        return new Jg(e, t, n, r, o);
      }
      class Jg extends Mi {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function tl(e, t) {
        return jt((n, r) => {
          let o = 0;
          n.subscribe(
            Ht(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function $t(e) {
        return this instanceof $t ? ((this.v = e), this) : new $t(e);
      }
      function tm(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.');
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s('next'),
          s('throw'),
          s('return'),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (p, m) {
                i.push([f, h, p, m]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof $t
                ? Promise.resolve(f.value.v).then(l, c)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(i[0][3], p);
          }
        }
        function l(f) {
          a('next', f);
        }
        function c(f) {
          a('throw', f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function nm(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.');
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function ol(e) {
              var t = 'function' == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      {
                        value: e && e[r++],
                        done: !e,
                      }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              );
            })(e)),
            (n = {}),
            r('next'),
            r('throw'),
            r('return'),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({
                      value: l,
                      done: a,
                    });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      function Kr(e, t, n, r) {
        if ('a' === n && !r)
          throw new TypeError('Private accessor was defined without a getter');
        if ('function' == typeof t ? e !== t || !r : !t.has(e))
          throw new TypeError(
            'Cannot read private member from an object whose class did not declare it'
          );
        return 'm' === n ? r : 'a' === n ? r.call(e) : r ? r.value : t.get(e);
      }
      function Jr(e, t, n, r, o) {
        if ('m' === r) throw new TypeError('Private method is not writable');
        if ('a' === r && !o)
          throw new TypeError('Private accessor was defined without a setter');
        if ('function' == typeof t ? e !== t || !o : !t.has(e))
          throw new TypeError(
            'Cannot write private member to an object whose class did not declare it'
          );
        return 'a' === r ? o.call(e, n) : o ? (o.value = n) : t.set(e, n), n;
      }
      const il = (e) =>
        e && 'number' == typeof e.length && 'function' != typeof e;
      function sl(e) {
        return K(null == e ? void 0 : e.then);
      }
      function al(e) {
        return K(e[Ai]);
      }
      function ul(e) {
        return (
          Symbol.asyncIterator &&
          K(null == e ? void 0 : e[Symbol.asyncIterator])
        );
      }
      function ll(e) {
        return new TypeError(
          `You provided ${
            null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const cl = (function om() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator';
      })();
      function dl(e) {
        return K(null == e ? void 0 : e[cl]);
      }
      function fl(e) {
        return tm(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield $t(n.read());
              if (o) return yield $t(void 0);
              yield yield $t(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function hl(e) {
        return K(null == e ? void 0 : e.getReader);
      }
      function Ut(e) {
        if (e instanceof we) return e;
        if (null != e) {
          if (al(e))
            return (function im(e) {
              return new we((t) => {
                const n = e[Ai]();
                if (K(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                );
              });
            })(e);
          if (il(e))
            return (function sm(e) {
              return new we((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (sl(e))
            return (function am(e) {
              return new we((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Zu);
              });
            })(e);
          if (ul(e)) return pl(e);
          if (dl(e))
            return (function um(e) {
              return new we((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (hl(e))
            return (function lm(e) {
              return pl(fl(e));
            })(e);
        }
        throw ll(e);
      }
      function pl(e) {
        return new we((t) => {
          (function cm(e, t) {
            var n, r, o, i;
            return (function Xg(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = nm(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = {
                  error: s,
                };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Mt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function gl(e, t, n = 1 / 0) {
        return K(t)
          ? gl((r, o) => tl((i, s) => t(r, i, o, s))(Ut(e(r, o))), n)
          : ('number' == typeof t && (n = t),
            jt((r, o) =>
              (function dm(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (m) => (l < r ? p(m) : u.push(m)),
                  p = (m) => {
                    i && t.next(m), l++;
                    let D = !1;
                    Ut(n(m, c++)).subscribe(
                      Ht(
                        t,
                        (v) => {
                          null == o || o(v), i ? h(v) : t.next(v);
                        },
                        () => {
                          D = !0;
                        },
                        void 0,
                        () => {
                          if (D)
                            try {
                              for (l--; u.length && l < r; ) {
                                const v = u.shift();
                                s ? Mt(t, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ht(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const Fi = new we((e) => e.complete());
      function Ni(e) {
        return e[e.length - 1];
      }
      function ml(e, t = 0) {
        return jt((n, r) => {
          n.subscribe(
            Ht(
              r,
              (o) => Mt(r, e, () => r.next(o), t),
              () => Mt(r, e, () => r.complete(), t),
              (o) => Mt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function yl(e, t = 0) {
        return jt((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Dl(e, t) {
        if (!e) throw new Error('Iterable cannot be null');
        return new we((n) => {
          Mt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Mt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function vl(e, t) {
        return t
          ? (function Em(e, t) {
              if (null != e) {
                if (al(e))
                  return (function ym(e, t) {
                    return Ut(e).pipe(yl(t), ml(t));
                  })(e, t);
                if (il(e))
                  return (function vm(e, t) {
                    return new we((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (sl(e))
                  return (function Dm(e, t) {
                    return Ut(e).pipe(yl(t), ml(t));
                  })(e, t);
                if (ul(e)) return Dl(e, t);
                if (dl(e))
                  return (function _m(e, t) {
                    return new we((n) => {
                      let r;
                      return (
                        Mt(n, t, () => {
                          (r = e[cl]()),
                            Mt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => K(null == r ? void 0 : r.return) && r.return()
                      );
                    });
                  })(e, t);
                if (hl(e))
                  return (function Cm(e, t) {
                    return Dl(fl(e), t);
                  })(e, t);
              }
              throw ll(e);
            })(e, t)
          : Ut(e);
      }
      function _l(...e) {
        const t = (function gm(e) {
            return (function pm(e) {
              return e && K(e.schedule);
            })(Ni(e))
              ? e.pop()
              : void 0;
          })(e),
          n = (function mm(e, t) {
            return 'number' == typeof Ni(e) ? e.pop() : t;
          })(e, 1 / 0),
          r = e;
        return r.length
          ? 1 === r.length
            ? Ut(r[0])
            : (function fm(e = 1 / 0) {
                return gl(Ku, e);
              })(n)(vl(r, t))
          : Fi;
      }
      function Pi(e, t, ...n) {
        return !0 === t
          ? (e(), null)
          : !1 === t
          ? null
          : t(...n)
              .pipe(
                (function wm(e) {
                  return e <= 0
                    ? () => Fi
                    : jt((t, n) => {
                        let r = 0;
                        t.subscribe(
                          Ht(n, (o) => {
                            ++r <= e && (n.next(o), e <= r && n.complete());
                          })
                        );
                      });
                })(1)
              )
              .subscribe(() => e());
      }
      function U(e) {
        for (let t in e) if (e[t] === U) return t;
        throw Error('Could not find renamed property on target object.');
      }
      function B(e) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e)) return '[' + e.map(B).join(', ') + ']';
        if (null == e) return '' + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return '' + t;
        const n = t.indexOf('\n');
        return -1 === n ? t : t.substring(0, n);
      }
      function Oi(e, t) {
        return null == e || '' === e
          ? null === t
            ? ''
            : t
          : null == t || '' === t
          ? e
          : e + ' ' + t;
      }
      const Im = U({
        __forward_ref__: U,
      });
      function Li(e) {
        return (
          (e.__forward_ref__ = Li),
          (e.toString = function () {
            return B(this());
          }),
          e
        );
      }
      function A(e) {
        return (function Cl(e) {
          return (
            'function' == typeof e &&
            e.hasOwnProperty(Im) &&
            e.__forward_ref__ === Li
          );
        })(e)
          ? e()
          : e;
      }
      class V extends Error {
        constructor(t, n) {
          super(
            (function ki(e, t) {
              return `NG0${Math.abs(e)}${t ? ': ' + t : ''}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function fe(e) {
        return 'function' == typeof e
          ? e.name || e.toString()
          : 'object' == typeof e && null != e && 'function' == typeof e.type
          ? e.type.name || e.type.toString()
          : (function I(e) {
              return 'string' == typeof e ? e : null == e ? '' : String(e);
            })(e);
      }
      function Xr(e, t) {
        const n = t ? ` in ${t}` : '';
        throw new V(-201, `No provider for ${fe(e)} found${n}`);
      }
      function Se(e, t) {
        null == e &&
          (function G(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? '' : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, '!=');
      }
      function Z(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function nn(e) {
        return {
          providers: e.providers || [],
          imports: e.imports || [],
        };
      }
      function Vi(e) {
        return El(e, eo) || El(e, bl);
      }
      function El(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function wl(e) {
        return e && (e.hasOwnProperty(Bi) || e.hasOwnProperty(Nm))
          ? e[Bi]
          : null;
      }
      const eo = U({
          ɵprov: U,
        }),
        Bi = U({
          ɵinj: U,
        }),
        bl = U({
          ngInjectableDef: U,
        }),
        Nm = U({
          ngInjectorDef: U,
        });
      var S = (() => (
        ((S = S || {})[(S.Default = 0)] = 'Default'),
        (S[(S.Host = 1)] = 'Host'),
        (S[(S.Self = 2)] = 'Self'),
        (S[(S.SkipSelf = 4)] = 'SkipSelf'),
        (S[(S.Optional = 8)] = 'Optional'),
        S
      ))();
      let ji;
      function Tt(e) {
        const t = ji;
        return (ji = e), t;
      }
      function Il(e, t, n) {
        const r = Vi(e);
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & S.Optional
          ? null
          : void 0 !== t
          ? t
          : void Xr(B(e), 'Injector');
      }
      function St(e) {
        return {
          toString: e,
        }.toString();
      }
      var qe = (() => (
          ((qe = qe || {})[(qe.OnPush = 0)] = 'OnPush'),
          (qe[(qe.Default = 1)] = 'Default'),
          qe
        ))(),
        it = (() => {
          return (
            ((e = it || (it = {}))[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            it
          );
          var e;
        })();
      const Rm = 'undefined' != typeof globalThis && globalThis,
        Om = 'undefined' != typeof window && window,
        Lm =
          'undefined' != typeof self &&
          'undefined' != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        H = Rm || ('undefined' != typeof global && global) || Om || Lm,
        rn = {},
        z = [],
        to = U({
          ɵcmp: U,
        }),
        Hi = U({
          ɵdir: U,
        }),
        $i = U({
          ɵpipe: U,
        }),
        Ml = U({
          ɵmod: U,
        }),
        Dt = U({
          ɵfac: U,
        }),
        Jn = U({
          __NG_ELEMENT_ID__: U,
        });
      let km = 0;
      function Ui(e) {
        return St(() => {
          const n = {},
            r = {
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
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === qe.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || z,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || it.Emulated,
              id: 'c',
              styles: e.styles || z,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            o = e.directives,
            i = e.features,
            s = e.pipes;
          return (
            (r.id += km++),
            (r.inputs = xl(e.inputs, n)),
            (r.outputs = xl(e.outputs)),
            i && i.forEach((a) => a(r)),
            (r.directiveDefs = o
              ? () => ('function' == typeof o ? o() : o).map(Tl)
              : null),
            (r.pipeDefs = s
              ? () => ('function' == typeof s ? s() : s).map(Sl)
              : null),
            r
          );
        });
      }
      function Tl(e) {
        return (
          he(e) ||
          (function At(e) {
            return e[Hi] || null;
          })(e)
        );
      }
      function Sl(e) {
        return (function Gt(e) {
          return e[$i] || null;
        })(e);
      }
      const Al = {};
      function Xn(e) {
        return St(() => {
          const t = {
            type: e.type,
            bootstrap: e.bootstrap || z,
            declarations: e.declarations || z,
            imports: e.imports || z,
            exports: e.exports || z,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          };
          return null != e.id && (Al[e.id] = e.type), t;
        });
      }
      function xl(e, t) {
        if (null == e) return rn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const Oe = Ui;
      function be(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function he(e) {
        return e[to] || null;
      }
      function Le(e, t) {
        const n = e[Ml] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${B(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const x = 11,
        q = 20;
      function st(e) {
        return Array.isArray(e) && 'object' == typeof e[1];
      }
      function Qe(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function qi(e) {
        return 0 != (8 & e.flags);
      }
      function io(e) {
        return 2 == (2 & e.flags);
      }
      function so(e) {
        return 1 == (1 & e.flags);
      }
      function Ze(e) {
        return null !== e.template;
      }
      function Um(e) {
        return 0 != (512 & e[2]);
      }
      function Qt(e, t) {
        return e.hasOwnProperty(Dt) ? e[Dt] : null;
      }
      class Nl {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Pl(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = Wm), qm;
      }
      function qm() {
        const e = Ol(this),
          t = null == e ? void 0 : e.current;
        if (t) {
          const n = e.previous;
          if (n === rn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function Wm(e, t, n, r) {
        const o =
            Ol(e) ||
            (function Qm(e, t) {
              return (e[Rl] = t);
            })(e, {
              previous: rn,
              current: null,
            }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (i[a] = new Nl(u && u.currentValue, t, s === rn)), (e[r] = t);
      }
      const Rl = '__ngSimpleChanges__';
      function Ol(e) {
        return e[Rl] || null;
      }
      let Ki;
      function J(e) {
        return !!e.listen;
      }
      const Ll = {
        createRenderer: (e, t) =>
          (function Ji() {
            return void 0 !== Ki
              ? Ki
              : 'undefined' != typeof document
              ? document
              : void 0;
          })(),
      };
      function re(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function Be(e, t) {
        return re(t[e.index]);
      }
      function Xi(e, t) {
        return e.data[t];
      }
      function xe(e, t) {
        const n = t[e];
        return st(n) ? n : n[0];
      }
      function kl(e) {
        return 4 == (4 & e[2]);
      }
      function es(e) {
        return 128 == (128 & e[2]);
      }
      function xt(e, t) {
        return null == t ? null : e[t];
      }
      function Vl(e) {
        e[18] = 0;
      }
      function ts(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const M = {
        lFrame: Wl(null),
        bindingsEnabled: !0,
      };
      function jl() {
        return M.bindingsEnabled;
      }
      function y() {
        return M.lFrame.lView;
      }
      function L() {
        return M.lFrame.tView;
      }
      function ae() {
        let e = Hl();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Hl() {
        return M.lFrame.currentTNode;
      }
      function at(e, t) {
        const n = M.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function ns() {
        return M.lFrame.isParent;
      }
      function fy(e, t) {
        const n = M.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), os(t);
      }
      function os(e) {
        M.lFrame.currentDirectiveIndex = e;
      }
      function Gl() {
        return M.lFrame.currentQueryIndex;
      }
      function ss(e) {
        M.lFrame.currentQueryIndex = e;
      }
      function py(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function zl(e, t, n) {
        if (n & S.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & S.Host ||
              ((o = py(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (M.lFrame = ql());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function co(e) {
        const t = ql(),
          n = e[1];
        (M.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function ql() {
        const e = M.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Wl(e) : t;
      }
      function Wl(e) {
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
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Ql() {
        const e = M.lFrame;
        return (
          (M.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Zl = Ql;
      function fo() {
        const e = Ql();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function De() {
        return M.lFrame.selectedIndex;
      }
      function Ft(e) {
        M.lFrame.selectedIndex = e;
      }
      function ho(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function po(e, t, n) {
        Yl(e, t, 3, n);
      }
      function go(e, t, n, r) {
        (3 & e[2]) === n && Yl(e, t, n, r);
      }
      function as(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Yl(e, t, n, r) {
        const i = null != r ? r : -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ('number' == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (wy(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function wy(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class or {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function mo(e, t, n) {
        const r = J(e);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if ('number' == typeof i) {
            if (0 !== i) break;
            o++;
            const s = n[o++],
              a = n[o++],
              u = n[o++];
            r ? e.setAttribute(t, a, u, s) : t.setAttributeNS(s, a, u);
          } else {
            const s = i,
              a = n[++o];
            ls(s)
              ? r && e.setProperty(t, s, a)
              : r
              ? e.setAttribute(t, s, a)
              : t.setAttribute(s, a),
              o++;
          }
        }
        return o;
      }
      function Kl(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function ls(e) {
        return 64 === e.charCodeAt(0);
      }
      function yo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              'number' == typeof o
                ? (n = o)
                : 0 === n ||
                  Jl(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Jl(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ('number' == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ('number' == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Xl(e) {
        return -1 !== e;
      }
      function dn(e) {
        return 32767 & e;
      }
      function fn(e, t) {
        let n = (function Sy(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let cs = !0;
      function Do(e) {
        const t = cs;
        return (cs = e), t;
      }
      let Ay = 0;
      function sr(e, t) {
        const n = fs(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          ds(r.data, e),
          ds(t, null),
          ds(r.blueprint, null));
        const o = vo(e, t),
          i = e.injectorIndex;
        if (Xl(o)) {
          const s = dn(o),
            a = fn(o, t),
            u = a[1].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function ds(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function fs(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function vo(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          const i = o[1],
            s = i.type;
          if (((r = 2 === s ? i.declTNode : 1 === s ? o[6] : null), null === r))
            return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function _o(e, t, n) {
        !(function xy(e, t, n) {
          let r;
          'string' == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Jn) && (r = n[Jn]),
            null == r && (r = n[Jn] = Ay++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function nc(e, t, n) {
        if (n & S.Optional) return e;
        Xr(t, 'NodeInjector');
      }
      function rc(e, t, n, r) {
        if (
          (n & S.Optional && void 0 === r && (r = null),
          0 == (n & (S.Self | S.Host)))
        ) {
          const o = e[9],
            i = Tt(void 0);
          try {
            return o ? o.get(t, r, n & S.Optional) : Il(t, r, n & S.Optional);
          } finally {
            Tt(i);
          }
        }
        return nc(r, t, n);
      }
      function oc(e, t, n, r = S.Default, o) {
        if (null !== e) {
          const i = (function Ry(e) {
            if ('string' == typeof e) return e.charCodeAt(0) || 0;
            const t = e.hasOwnProperty(Jn) ? e[Jn] : void 0;
            return 'number' == typeof t ? (t >= 0 ? 255 & t : Ny) : t;
          })(n);
          if ('function' == typeof i) {
            if (!zl(t, e, r)) return r & S.Host ? nc(o, n, r) : rc(t, n, r, o);
            try {
              const s = i(r);
              if (null != s || r & S.Optional) return s;
              Xr(n);
            } finally {
              Zl();
            }
          } else if ('number' == typeof i) {
            let s = null,
              a = fs(e, t),
              u = -1,
              l = r & S.Host ? t[16][6] : null;
            for (
              (-1 === a || r & S.SkipSelf) &&
              ((u = -1 === a ? vo(e, t) : t[a + 8]),
              -1 !== u && ac(r, !1)
                ? ((s = t[1]), (a = dn(u)), (t = fn(u, t)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = t[1];
              if (sc(i, a, c.data)) {
                const d = Py(a, t, n, s, r, l);
                if (d !== ic) return d;
              }
              (u = t[a + 8]),
                -1 !== u && ac(r, t[1].data[a + 8] === l) && sc(i, a, t)
                  ? ((s = c), (a = dn(u)), (t = fn(u, t)))
                  : (a = -1);
            }
          }
        }
        return rc(t, n, r, o);
      }
      const ic = {};
      function Ny() {
        return new hn(ae(), y());
      }
      function Py(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = Co(
            a,
            s,
            n,
            null == r ? io(a) && cs : r != s && 0 != (3 & a.type),
            o & S.Host && i === a
          );
        return null !== c ? ar(t, s, c, a) : ic;
      }
      function Co(e, t, n, r, o) {
        const i = e.providerIndexes,
          s = t.data,
          a = 1048575 & i,
          u = e.directiveStart,
          c = i >> 20,
          f = o ? a + c : e.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = s[h];
          if ((h < u && n === p) || (h >= u && p.type === n)) return h;
        }
        if (o) {
          const h = s[u];
          if (h && Ze(h) && h.type === n) return u;
        }
        return null;
      }
      function ar(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function by(e) {
            return e instanceof or;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Mm(e, t) {
              const n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : '';
              throw new V(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(fe(i[n]));
          const a = Do(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? Tt(s.injectImpl) : null;
          zl(e, r, S.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function Ey(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Pl(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && Tt(u), Do(a), (s.resolving = !1), Zl();
          }
        }
        return o;
      }
      function sc(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function ac(e, t) {
        return !(e & S.Self || (e & S.Host && t));
      }
      class hn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return oc(this._tNode, this._lView, t, r, n);
        }
      }
      const gn = '__parameters__';
      function yn(e, t, n) {
        return St(() => {
          const r = (function gs(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(gn)
                ? u[gn]
                : Object.defineProperty(u, gn, {
                    value: [],
                  })[gn];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class j {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = Z({
                  token: this,
                  providedIn: n.providedIn || 'root',
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function je(e, t) {
        void 0 === t && (t = e);
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          Array.isArray(r)
            ? (t === e && (t = e.slice(0, n)), je(r, t))
            : t !== e && t.push(r);
        }
        return t;
      }
      function ut(e, t) {
        e.forEach((n) => (Array.isArray(n) ? ut(n, t) : t(n)));
      }
      function lc(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Eo(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function Fe(e, t, n) {
        let r = Dn(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function By(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function ys(e, t) {
        const n = Dn(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Dn(e, t) {
        return (function fc(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const dr = {},
        vs = '__NG_DI_FLAG__',
        bo = 'ngTempTokenPath',
        qy = /\n/gm,
        pc = '__source',
        Qy = U({
          provide: String,
          useValue: U,
        });
      let fr;
      function gc(e) {
        const t = fr;
        return (fr = e), t;
      }
      function Zy(e, t = S.Default) {
        if (void 0 === fr) throw new V(203, '');
        return null === fr
          ? Il(e, void 0, t)
          : fr.get(e, t & S.Optional ? null : void 0, t);
      }
      function $(e, t = S.Default) {
        return (
          (function Pm() {
            return ji;
          })() || Zy
        )(A(e), t);
      }
      const Yy = $;
      function _s(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = A(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new V(900, '');
            let o,
              i = S.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = Ky(a);
              'number' == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push($(o, i));
          } else t.push($(r));
        }
        return t;
      }
      function hr(e, t) {
        return (e[vs] = t), (e.prototype[vs] = t), e;
      }
      function Ky(e) {
        return e[vs];
      }
      const Io = hr(yn('Optional'), 8),
        Mo = hr(yn('SkipSelf'), 4);
      const Oc = '__ngContext__';
      function ge(e, t) {
        e[Oc] = t;
      }
      function xs(e) {
        const t = (function Dr(e) {
          return e[Oc] || null;
        })(e);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function Ns(e) {
        return e.ngOriginalError;
      }
      function UD(e, ...t) {
        e.error(...t);
      }
      class vr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t),
            r = (function $D(e) {
              return (e && e.ngErrorLogger) || UD;
            })(t);
          r(this._console, 'ERROR', t),
            n && r(this._console, 'ORIGINAL ERROR', n);
        }
        _findOriginalError(t) {
          let n = t && Ns(t);
          for (; n && Ns(n); ) n = Ns(n);
          return n || null;
        }
      }
      const XD = (() =>
        (
          ('undefined' != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(H))();
      function ct(e) {
        return e instanceof Function ? e() : e;
      }
      var Ne = (() => (
        ((Ne = Ne || {})[(Ne.Important = 1)] = 'Important'),
        (Ne[(Ne.DashCase = 2)] = 'DashCase'),
        Ne
      ))();
      function Rs(e, t) {
        return undefined(e, t);
      }
      function _r(e) {
        const t = e[3];
        return Qe(t) ? t[3] : t;
      }
      function Os(e) {
        return Gc(e[13]);
      }
      function Ls(e) {
        return Gc(e[4]);
      }
      function Gc(e) {
        for (; null !== e && !Qe(e); ) e = e[4];
        return e;
      }
      function En(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Qe(r) ? (i = r) : st(r) && ((s = !0), (r = r[0]));
          const a = re(r);
          0 === e && null !== n
            ? null == o
              ? Yc(t, n, a)
              : Zt(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Zt(t, n, a, o || null, !0)
            : 2 === e
            ? (function rd(e, t, n) {
                const r = No(e, t);
                r &&
                  (function hv(e, t, n, r) {
                    J(e) ? e.removeChild(t, n, r) : t.removeChild(n);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function mv(e, t, n, r, o) {
                const i = n[7];
                i !== re(n) && En(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  Cr(u[1], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Vs(e, t, n) {
        if (J(e)) return e.createElement(t, n);
        {
          const r =
            null !== n
              ? (function Jm(e) {
                  const t = e.toLowerCase();
                  return 'svg' === t
                    ? 'http://www.w3.org/2000/svg'
                    : 'math' === t
                    ? 'http://www.w3.org/1998/MathML/'
                    : null;
                })(n)
              : null;
          return null === r ? e.createElement(t) : e.createElementNS(r, t);
        }
      }
      function qc(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        1024 & t[2] && ((t[2] &= -1025), ts(o, -1)), n.splice(r, 1);
      }
      function Bs(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && qc(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = Eo(e, 10 + t);
          !(function iv(e, t) {
            Cr(e, t, t[x], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function Wc(e, t) {
        if (!(256 & t[2])) {
          const n = t[x];
          J(n) && n.destroyNode && Cr(e, t, n, 3, null, null),
            (function uv(e) {
              let t = e[13];
              if (!t) return js(e[1], e);
              for (; t; ) {
                let n = null;
                if (st(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    st(t) && js(t[1], t), (t = t[3]);
                  null === t && (t = e), st(t) && js(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function js(e, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function fv(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof or)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        try {
                          u.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function dv(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ('string' == typeof n[i]) {
                    const s = n[i + 1],
                      a = 'function' == typeof s ? s(t) : re(t[s]),
                      u = r[(o = n[i + 2])],
                      l = n[i + 3];
                    'boolean' == typeof l
                      ? a.removeEventListener(n[i], u, l)
                      : l >= 0
                      ? r[(o = l)]()
                      : r[(o = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) r[i]();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && J(t[x]) && t[x].destroy();
          const n = t[17];
          if (null !== n && Qe(t[3])) {
            n !== t[3] && qc(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
        }
      }
      function Qc(e, t, n) {
        return (function Zc(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === it.None || o === it.Emulated) return null;
          }
          return Be(r, n);
        })(e, t.parent, n);
      }
      function Zt(e, t, n, r, o) {
        J(e) ? e.insertBefore(t, n, r, o) : t.insertBefore(n, r, o);
      }
      function Yc(e, t, n) {
        J(e) ? e.appendChild(t, n) : t.appendChild(n);
      }
      function Kc(e, t, n, r, o) {
        null !== r ? Zt(e, t, n, r, o) : Yc(e, t, n);
      }
      function No(e, t) {
        return J(e) ? e.parentNode(t) : t.parentNode;
      }
      let ed = function Xc(e, t, n) {
        return 40 & e.type ? Be(e, n) : null;
      };
      function Po(e, t, n, r) {
        const o = Qc(e, r, t),
          i = t[x],
          a = (function Jc(e, t, n) {
            return ed(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Kc(i, o, n[u], a, !1);
          else Kc(i, o, n, a, !1);
      }
      function Ro(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Be(t, e);
          if (4 & n) return $s(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Ro(e, r);
            {
              const o = e[t.index];
              return Qe(o) ? $s(-1, o) : re(o);
            }
          }
          if (32 & n) return Rs(t, e)() || re(e[t.index]);
          {
            const r = nd(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Ro(_r(e[16]), r)
              : Ro(e, t.next);
          }
        }
        return null;
      }
      function nd(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function $s(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return Ro(r, o);
        }
        return t[7];
      }
      function Us(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && ge(re(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) Us(e, t, n.child, r, o, i, !1), En(t, e, o, a, i);
            else if (32 & u) {
              const l = Rs(n, r);
              let c;
              for (; (c = l()); ) En(t, e, o, c, i);
              En(t, e, o, a, i);
            } else 16 & u ? od(e, t, r, n, o, i) : En(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Cr(e, t, n, r, o, i) {
        Us(n, r, e.firstChild, t, o, i, !1);
      }
      function od(e, t, n, r, o, i) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) En(t, e, o, u[l], i);
        else Us(e, t, u, s[3], o, i, !0);
      }
      function id(e, t, n) {
        J(e) ? e.setAttribute(t, 'style', n) : (t.style.cssText = n);
      }
      function Gs(e, t, n) {
        J(e)
          ? '' === n
            ? e.removeAttribute(t, 'class')
            : e.setAttribute(t, 'class', n)
          : (t.className = n);
      }
      function sd(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const ad = 'ng-template';
      function Dv(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && 'class' === o) {
            if (((o = e[r]), -1 !== sd(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && 'string' == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function ud(e) {
        return 4 === e.type && e.value !== ad;
      }
      function vv(e, t, n) {
        return t === (4 !== e.type || n ? e.value : ad);
      }
      function _v(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function wv(e) {
            for (let t = 0; t < e.length; t++) if (Kl(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ('number' != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ('' !== u && !vv(e, u, n)) || ('' === u && 1 === t.length))
                ) {
                  if (Ye(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!Dv(e.attrs, l, n)) {
                    if (Ye(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = Cv(8 & r ? 'class' : u, o, ud(e), n);
                if (-1 === d) {
                  if (Ye(r)) return !1;
                  s = !0;
                  continue;
                }
                if ('' !== l) {
                  let f;
                  f = d > i ? '' : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== sd(h, l, 0)) || (2 & r && l !== f)) {
                    if (Ye(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Ye(r) && !Ye(u)) return !1;
            if (s && Ye(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return Ye(r) || s;
      }
      function Ye(e) {
        return 0 == (1 & e);
      }
      function Cv(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; 'string' == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function bv(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ('number' == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function ld(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (_v(e, t[r], n)) return !0;
        return !1;
      }
      function cd(e, t) {
        return e ? ':not(' + t.trim() + ')' : t;
      }
      function Mv(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = '',
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ('string' == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
            } else 8 & r ? (o += '.' + s) : 4 & r && (o += ' ' + s);
          else
            '' !== o && !Ye(s) && ((t += cd(i, o)), (o = '')),
              (r = s),
              (i = i || !Ye(r));
          n++;
        }
        return '' !== o && (t += cd(i, o)), t;
      }
      const T = {};
      function wn(e) {
        dd(L(), y(), De() + e, !1);
      }
      function dd(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && po(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && go(t, i, 0, n);
          }
        Ft(n);
      }
      function Oo(e, t) {
        return (e << 17) | (t << 2);
      }
      function Ke(e) {
        return (e >> 17) & 32767;
      }
      function zs(e) {
        return 2 | e;
      }
      function Ct(e) {
        return (131068 & e) >> 2;
      }
      function qs(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Ws(e) {
        return 1 | e;
      }
      function Ed(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              ss(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Er(e, t, n, r, o, i, s, a, u, l) {
        const c = t.blueprint.slice();
        return (
          (c[0] = o),
          (c[2] = 140 | r),
          Vl(c),
          (c[3] = c[15] = e),
          (c[8] = n),
          (c[10] = s || (e && e[10])),
          (c[x] = a || (e && e[x])),
          (c[12] = u || (e && e[12]) || null),
          (c[9] = l || (e && e[9]) || null),
          (c[6] = i),
          (c[16] = 2 == t.type ? e[16] : c),
          c
        );
      }
      function bn(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function na(e, t, n, r, o) {
            const i = Hl(),
              s = ns(),
              u = (e.data[t] = (function Gv(e, t, n, r, o, i) {
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
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && (i.next = u)),
              u
            );
          })(e, t, n, r, o)),
            (function dy() {
              return M.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function rr() {
            const e = M.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return at(i, !0), i;
      }
      function In(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function wr(e, t, n) {
        co(t);
        try {
          const r = e.viewQuery;
          null !== r && da(1, r, n);
          const o = e.template;
          null !== o && wd(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Ed(e, t),
            e.staticViewQueries && da(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function Hv(e, t) {
              for (let n = 0; n < t.length; n++) u_(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), fo();
        }
      }
      function Mn(e, t, n, r) {
        const o = t[2];
        if (256 != (256 & o)) {
          co(t);
          try {
            Vl(t),
              (function $l(e) {
                return (M.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && wd(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && po(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && go(t, l, 0, null), as(t, 0);
            }
            if (
              ((function s_(e) {
                for (let t = Os(e); null !== t; t = Ls(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r],
                      i = o[3];
                    0 == (1024 & o[2]) && ts(i, 1), (o[2] |= 1024);
                  }
                }
              })(t),
              (function i_(e) {
                for (let t = Os(e); null !== t; t = Ls(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1];
                    es(r) && Mn(o, r, o.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && Ed(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && po(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && go(t, l, 1), as(t, 1);
            }
            !(function Bv(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Ft(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      fy(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Ft(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function jv(e, t) {
                for (let n = 0; n < t.length; n++) a_(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && da(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && po(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && go(t, l, 2), as(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -73),
              1024 & t[2] && ((t[2] &= -1025), ts(t[3], -1));
          } finally {
            fo();
          }
        }
      }
      function $v(e, t, n, r) {
        const o = t[10],
          s = kl(t);
        try {
          !s && o.begin && o.begin(), s && wr(e, t, r), Mn(e, t, n, r);
        } finally {
          !s && o.end && o.end();
        }
      }
      function wd(e, t, n, r, o) {
        const i = De(),
          s = 2 & r;
        try {
          Ft(-1), s && t.length > q && dd(e, t, q, !1), n(r, o);
        } finally {
          Ft(i);
        }
      }
      function Id(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Vo(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Vo(e, t, n, r, o, i, s, a, u, l) {
        const c = q + r,
          d = c + o,
          f = (function Uv(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : T);
            return n;
          })(c, d),
          h = 'function' == typeof l ? l() : l;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
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
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Sd(e, t, n, r) {
        const o = Vd(t);
        null === n
          ? o.push(r)
          : (o.push(n), e.firstCreatePass && Bd(e).push(r, o.length - 1));
      }
      function Ad(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function Fd(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function Yv(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ('number' == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != u && a.push(u),
            a.push(r, o, s);
        }
      }
      function Nd(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Pd(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function t_(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Ze(t) && (n[''] = e);
        }
      }
      function Rd(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Od(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Qt(o.type)),
          s = new or(i, Ze(o), null);
        (e.blueprint[r] = s),
          (n[r] = s),
          Fd(e, t, 0, r, In(e, n, o.hostVars, T), o);
      }
      function n_(e, t, n) {
        const r = Be(t, e),
          o = Id(n),
          i = e[10],
          s = Bo(
            e,
            Er(
              e,
              o,
              null,
              n.onPush ? 64 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function r_(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function o_(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ('number' == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function a_(e, t) {
        const n = xe(t, e);
        if (es(n)) {
          const r = n[1];
          80 & n[2] ? Mn(r, n, r.template, n[8]) : n[5] > 0 && aa(n);
        }
      }
      function aa(e) {
        for (let r = Os(e); null !== r; r = Ls(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (1024 & i[2]) {
              const s = i[1];
              Mn(s, i, s.template, i[8]);
            } else i[5] > 0 && aa(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = xe(n[r], e);
            es(o) && o[5] > 0 && aa(o);
          }
      }
      function u_(e, t) {
        const n = xe(t, e),
          r = n[1];
        (function l_(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          wr(r, n, n[8]);
      }
      function Bo(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function ua(e) {
        for (; e; ) {
          e[2] |= 64;
          const t = _r(e);
          if (Um(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function kd(e) {
        !(function la(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = xs(n),
              o = r[1];
            $v(o, r, o.template, n);
          }
        })(e[8]);
      }
      function da(e, t, n) {
        ss(0), t(e, n);
      }
      const d_ = (() => Promise.resolve(null))();
      function Vd(e) {
        return e[7] || (e[7] = []);
      }
      function Bd(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Hd(e, t) {
        const n = e[9],
          r = n ? n.get(vr, null) : null;
        r && r.handleError(t);
      }
      function $d(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function jo(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            'number' == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Oi(o, a))
              : 2 == i && (r = Oi(r, a + ': ' + t[++s] + ';'));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      const fa = new j('INJECTOR', -1);
      class Ud {
        get(t, n = dr) {
          if (n === dr) {
            const r = new Error(`NullInjectorError: No provider for ${B(t)}!`);
            throw ((r.name = 'NullInjectorError'), r);
          }
          return n;
        }
      }
      const ha = new j('Set Injector scope.'),
        br = {},
        p_ = {};
      let pa;
      function Gd() {
        return void 0 === pa && (pa = new Ud()), pa;
      }
      function zd(e, t = null, n = null, r) {
        const o = qd(e, t, n, r);
        return o._resolveInjectorDefTypes(), o;
      }
      function qd(e, t = null, n = null, r) {
        return new g_(e, n, t || Gd(), r);
      }
      class g_ {
        constructor(t, n, r, o = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const i = [];
          n && ut(n, (a) => this.processProvider(a, t, n)),
            ut([t], (a) => this.processInjectorType(a, [], i)),
            this.records.set(fa, Tn(void 0, this));
          const s = this.records.get(ha);
          (this.scope = null != s ? s.value : null),
            (this.source = o || ('object' == typeof t ? null : B(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, n = dr, r = S.Default) {
          this.assertNotDestroyed();
          const o = gc(this),
            i = Tt(void 0);
          try {
            if (!(r & S.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function w_(e) {
                    return (
                      'function' == typeof e ||
                      ('object' == typeof e && e instanceof j)
                    );
                  })(t) && Vi(t);
                (a = u && this.injectableDefInScope(u) ? Tn(ga(t), br) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & S.Self ? Gd() : this.parent).get(
              t,
              (n = r & S.Optional && n === dr ? null : n)
            );
          } catch (s) {
            if ('NullInjectorError' === s.name) {
              if (((s[bo] = s[bo] || []).unshift(B(t)), o)) throw s;
              return (function Jy(e, t, n, r) {
                const o = e[bo];
                throw (
                  (t[pc] && o.unshift(t[pc]),
                  (e.message = (function Xy(e, t, n, r = null) {
                    e =
                      e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1)
                        ? e.substr(2)
                        : e;
                    let o = B(t);
                    if (Array.isArray(t)) o = t.map(B).join(' -> ');
                    else if ('object' == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ':' +
                              ('string' == typeof a ? JSON.stringify(a) : B(a))
                          );
                        }
                      o = `{${i.join(', ')}}`;
                    }
                    return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(
                      qy,
                      '\n  '
                    )}`;
                  })('\n' + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[bo] = null),
                  e)
                );
              })(s, t, 'R3InjectorError', this.source);
            }
            throw s;
          } finally {
            Tt(i), gc(o);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((r, o) => t.push(B(o))),
            `R3Injector[${t.join(', ')}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new V(205, !1);
        }
        processInjectorType(t, n, r) {
          if (!(t = A(t))) return !1;
          let o = wl(t);
          const i = (null == o && t.ngModule) || void 0,
            s = void 0 === i ? t : i,
            a = -1 !== r.indexOf(s);
          if ((void 0 !== i && (o = wl(i)), null == o)) return !1;
          if (null != o.imports && !a) {
            let c;
            r.push(s);
            try {
              ut(o.imports, (d) => {
                this.processInjectorType(d, n, r) &&
                  (void 0 === c && (c = []), c.push(d));
              });
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d];
                ut(h, (p) => this.processProvider(p, f, h || z));
              }
          }
          this.injectorDefTypes.add(s);
          const u = Qt(s) || (() => new s());
          this.records.set(s, Tn(u, br));
          const l = o.providers;
          if (null != l && !a) {
            const c = t;
            ut(l, (d) => this.processProvider(d, c, l));
          }
          return void 0 !== i && void 0 !== t.providers;
        }
        processProvider(t, n, r) {
          let o = Sn((t = A(t))) ? t : A(t && t.provide);
          const i = (function y_(e, t, n) {
            return Qd(e)
              ? Tn(void 0, e.useValue)
              : Tn(
                  (function Wd(e, t, n) {
                    let r;
                    if (Sn(e)) {
                      const o = A(e);
                      return Qt(o) || ga(o);
                    }
                    if (Qd(e)) r = () => A(e.useValue);
                    else if (
                      (function v_(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(..._s(e.deps || []));
                    else if (
                      (function D_(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => $(A(e.useExisting));
                    else {
                      const o = A(e && (e.useClass || e.provide));
                      if (
                        !(function C_(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Qt(o) || ga(o);
                      r = () => new o(..._s(e.deps));
                    }
                    return r;
                  })(e),
                  br
                );
          })(t);
          if (Sn(t) || !0 !== t.multi) this.records.get(o);
          else {
            let s = this.records.get(o);
            s ||
              ((s = Tn(void 0, br, !0)),
              (s.factory = () => _s(s.multi)),
              this.records.set(o, s)),
              (o = t),
              s.multi.push(t);
          }
          this.records.set(o, i);
        }
        hydrate(t, n) {
          return (
            n.value === br && ((n.value = p_), (n.value = n.factory())),
            'object' == typeof n.value &&
              n.value &&
              (function E_(e) {
                return (
                  null !== e &&
                  'object' == typeof e &&
                  'function' == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = A(t.providedIn);
          return 'string' == typeof n
            ? 'any' === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function ga(e) {
        const t = Vi(e),
          n = null !== t ? t.factory : Qt(e);
        if (null !== n) return n;
        if (e instanceof j) throw new V(204, !1);
        if (e instanceof Function)
          return (function m_(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function cr(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, '?'),
                new V(204, !1))
              );
            const n = (function xm(e) {
              const t = e && (e[eo] || e[bl]);
              if (t) {
                const n = (function Fm(e) {
                  if (e.hasOwnProperty('name')) return e.name;
                  const t = ('' + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? '' : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new V(204, !1);
      }
      function Tn(e, t, n = !1) {
        return {
          factory: e,
          value: t,
          multi: n ? [] : void 0,
        };
      }
      function Qd(e) {
        return null !== e && 'object' == typeof e && Qy in e;
      }
      function Sn(e) {
        return 'function' == typeof e;
      }
      let He = (() => {
        class e {
          static create(n, r) {
            var o;
            if (Array.isArray(n))
              return zd(
                {
                  name: '',
                },
                r,
                n,
                ''
              );
            {
              const i = null !== (o = n.name) && void 0 !== o ? o : '';
              return zd(
                {
                  name: i,
                },
                n.parent,
                n.providers,
                i
              );
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = dr),
          (e.NULL = new Ud()),
          (e.ɵprov = Z({
            token: e,
            providedIn: 'any',
            factory: () => $(fa),
          })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function F_(e, t) {
        ho(xs(e)[1], ae());
      }
      let Ho = null;
      function An() {
        if (!Ho) {
          const e = H.Symbol;
          if (e && e.iterator) Ho = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              'entries' !== r &&
                'size' !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Ho = r);
            }
          }
        }
        return Ho;
      }
      function va(e) {
        return null !== e && ('function' == typeof e || 'object' == typeof e);
      }
      function me(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function R(e, t = S.Default) {
        const n = y();
        return null === n ? $(e, t) : oc(ae(), n, A(e), t);
      }
      function Kt(e, t, n) {
        const r = y();
        return (
          me(
            r,
            (function cn() {
              return M.lFrame.bindingIndex++;
            })(),
            t
          ) &&
            (function Pe(e, t, n, r, o, i, s, a) {
              const u = Be(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? ($d(e, n, c, r, o),
                  io(t) &&
                    (function Wv(e, t) {
                      const n = xe(t, e);
                      16 & n[2] || (n[2] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function qv(e) {
                    return 'class' === e
                      ? 'className'
                      : 'for' === e
                      ? 'htmlFor'
                      : 'formaction' === e
                      ? 'formAction'
                      : 'innerHtml' === e
                      ? 'innerHTML'
                      : 'readonly' === e
                      ? 'readOnly'
                      : 'tabindex' === e
                      ? 'tabIndex'
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || '', r) : o),
                  J(i)
                    ? i.setProperty(u, r, o)
                    : ls(r) ||
                      (u.setProperty ? u.setProperty(r, o) : (u[r] = o)));
            })(
              L(),
              (function X() {
                const e = M.lFrame;
                return Xi(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[x],
              n,
              !1
            ),
          Kt
        );
      }
      function ba(e, t, n, r, o) {
        const s = o ? 'class' : 'style';
        $d(e, n, t.inputs[s], s, r);
      }
      function Ue(e, t, n, r) {
        const o = y(),
          i = L(),
          s = q + e,
          a = o[x],
          u = (o[s] = Vs(
            a,
            t,
            (function Cy() {
              return M.lFrame.currentNamespace;
            })()
          )),
          l = i.firstCreatePass
            ? (function fC(e, t, n, r, o, i, s) {
                const a = t.consts,
                  l = bn(t, e, 2, o, xt(a, i));
                return (
                  (function ia(e, t, n, r) {
                    let o = !1;
                    if (jl()) {
                      const i = (function Xv(e, t, n) {
                          const r = e.directiveRegistry;
                          let o = null;
                          if (r)
                            for (let i = 0; i < r.length; i++) {
                              const s = r[i];
                              ld(n, s.selectors, !1) &&
                                (o || (o = []),
                                _o(sr(n, t), e, s.type),
                                Ze(s) ? (Pd(e, n), o.unshift(s)) : o.push(s));
                            }
                          return o;
                        })(e, t, n),
                        s =
                          null === r
                            ? null
                            : {
                                '': -1,
                              };
                      if (null !== i) {
                        (o = !0), Rd(n, e.data.length, i.length);
                        for (let c = 0; c < i.length; c++) {
                          const d = i[c];
                          d.providersResolver && d.providersResolver(d);
                        }
                        let a = !1,
                          u = !1,
                          l = In(e, t, i.length, null);
                        for (let c = 0; c < i.length; c++) {
                          const d = i[c];
                          (n.mergedAttrs = yo(n.mergedAttrs, d.hostAttrs)),
                            Od(e, n, t, l, d),
                            t_(l, d, s),
                            null !== d.contentQueries && (n.flags |= 8),
                            (null !== d.hostBindings ||
                              null !== d.hostAttrs ||
                              0 !== d.hostVars) &&
                              (n.flags |= 128);
                          const f = d.type.prototype;
                          !a &&
                            (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                            ((e.preOrderHooks || (e.preOrderHooks = [])).push(
                              n.index
                            ),
                            (a = !0)),
                            !u &&
                              (f.ngOnChanges || f.ngDoCheck) &&
                              ((
                                e.preOrderCheckHooks ||
                                (e.preOrderCheckHooks = [])
                              ).push(n.index),
                              (u = !0)),
                            l++;
                        }
                        !(function zv(e, t) {
                          const r = t.directiveEnd,
                            o = e.data,
                            i = t.attrs,
                            s = [];
                          let a = null,
                            u = null;
                          for (let l = t.directiveStart; l < r; l++) {
                            const c = o[l],
                              d = c.inputs,
                              f = null === i || ud(t) ? null : o_(d, i);
                            s.push(f),
                              (a = Ad(d, l, a)),
                              (u = Ad(c.outputs, l, u));
                          }
                          null !== a &&
                            (a.hasOwnProperty('class') && (t.flags |= 16),
                            a.hasOwnProperty('style') && (t.flags |= 32)),
                            (t.initialInputs = s),
                            (t.inputs = a),
                            (t.outputs = u);
                        })(e, n);
                      }
                      s &&
                        (function e_(e, t, n) {
                          if (t) {
                            const r = (e.localNames = []);
                            for (let o = 0; o < t.length; o += 2) {
                              const i = n[t[o + 1]];
                              if (null == i) throw new V(-301, !1);
                              r.push(t[o], i);
                            }
                          }
                        })(n, r, s);
                    }
                    return (n.mergedAttrs = yo(n.mergedAttrs, n.attrs)), o;
                  })(t, n, l, xt(a, s)),
                  null !== l.attrs && jo(l, l.attrs, !1),
                  null !== l.mergedAttrs && jo(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        at(l, !0);
        const c = l.mergedAttrs;
        null !== c && mo(a, u, c);
        const d = l.classes;
        null !== d && Gs(a, u, d);
        const f = l.styles;
        return (
          null !== f && id(a, u, f),
          64 != (64 & l.flags) && Po(i, o, u, l),
          0 ===
            (function oy() {
              return M.lFrame.elementDepthCount;
            })() && ge(u, o),
          (function iy() {
            M.lFrame.elementDepthCount++;
          })(),
          so(l) &&
            ((function ra(e, t, n) {
              !jl() ||
                ((function Kv(e, t, n, r) {
                  const o = n.directiveStart,
                    i = n.directiveEnd;
                  e.firstCreatePass || sr(n, t), ge(r, t);
                  const s = n.initialInputs;
                  for (let a = o; a < i; a++) {
                    const u = e.data[a],
                      l = Ze(u);
                    l && n_(t, n, u);
                    const c = ar(t, e, a, n);
                    ge(c, t),
                      null !== s && r_(0, a - o, c, u, 0, s),
                      l && (xe(n.index, t)[8] = c);
                  }
                })(e, t, n, Be(n, t)),
                128 == (128 & n.flags) &&
                  (function Jv(e, t, n) {
                    const r = n.directiveStart,
                      o = n.directiveEnd,
                      s = n.index,
                      a = (function hy() {
                        return M.lFrame.currentDirectiveIndex;
                      })();
                    try {
                      Ft(s);
                      for (let u = r; u < o; u++) {
                        const l = e.data[u],
                          c = t[u];
                        os(u),
                          (null !== l.hostBindings ||
                            0 !== l.hostVars ||
                            null !== l.hostAttrs) &&
                            Nd(l, c);
                      }
                    } finally {
                      Ft(-1), os(a);
                    }
                  })(e, t, n));
            })(i, o, l),
            (function bd(e, t, n) {
              if (qi(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i];
                  s.contentQueries && s.contentQueries(1, n[i], i);
                }
              }
            })(i, l, o)),
          null !== r &&
            (function oa(e, t, n = Be) {
              const r = t.localNames;
              if (null !== r) {
                let o = t.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                  const s = r[i + 1],
                    a = -1 === s ? n(t, e) : e[s];
                  e[o++] = a;
                }
              }
            })(o, l),
          Ue
        );
      }
      function Xe() {
        let e = ae();
        ns()
          ? (function rs() {
              M.lFrame.isParent = !1;
            })()
          : ((e = e.parent), at(e, !1));
        const t = e;
        !(function sy() {
          M.lFrame.elementDepthCount--;
        })();
        const n = L();
        return (
          n.firstCreatePass && (ho(n, e), qi(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function My(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            ba(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function Ty(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            ba(n, t, y(), t.stylesWithoutHost, !1),
          Xe
        );
      }
      function Ia(e, t, n, r) {
        return Ue(e, t, n, r), Xe(), Ia;
      }
      function Sa(e) {
        return !!e && 'function' == typeof e.then;
      }
      function xf(e) {
        return !!e && 'function' == typeof e.subscribe;
      }
      const gC = xf;
      function jn(e, t, n, r) {
        const o = y(),
          i = L(),
          s = ae();
        return (
          (function Nf(e, t, n, r, o, i, s, a) {
            const u = so(r),
              c = e.firstCreatePass && Bd(e),
              d = t[8],
              f = Vd(t);
            let h = !0;
            if (3 & r.type || a) {
              const D = Be(r, t),
                v = a ? a(D) : D,
                g = f.length,
                E = a ? (N) => a(re(N[r.index])) : r.index;
              if (J(n)) {
                let N = null;
                if (
                  (!a &&
                    u &&
                    (N = (function mC(e, t, n, r) {
                      const o = e.cleanup;
                      if (null != o)
                        for (let i = 0; i < o.length - 1; i += 2) {
                          const s = o[i];
                          if (s === n && o[i + 1] === r) {
                            const a = t[7],
                              u = o[i + 2];
                            return a.length > u ? a[u] : null;
                          }
                          'string' == typeof s && (i += 2);
                        }
                      return null;
                    })(e, t, o, r.index)),
                  null !== N)
                )
                  ((N.__ngLastListenerFn__ || N).__ngNextListenerFn__ = i),
                    (N.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = Aa(r, t, d, i, !1);
                  const k = n.listen(v, o, i);
                  f.push(i, k), c && c.push(o, E, g, g + 1);
                }
              } else
                (i = Aa(r, t, d, i, !0)),
                  v.addEventListener(o, i, s),
                  f.push(i),
                  c && c.push(o, E, g, s);
            } else i = Aa(r, t, d, i, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[o])) {
              const D = m.length;
              if (D)
                for (let v = 0; v < D; v += 2) {
                  const Re = t[m[v]][m[v + 1]].subscribe(i),
                    tn = f.length;
                  f.push(i, Re), c && c.push(o, r.index, tn, -(tn + 1));
                }
            }
          })(i, o, o[x], s, e, t, !!n, r),
          jn
        );
      }
      function Pf(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return Hd(e, o), !1;
        }
      }
      function Aa(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          const a = 2 & e.flags ? xe(e.index, t) : t;
          0 == (32 & t[2]) && ua(a);
          let u = Pf(t, 0, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = Pf(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function Uf(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? Ke(i) : Ct(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          wC(e[a], t) && ((u = !0), (e[a + 1] = r ? Ws(c) : zs(c))),
            (a = r ? Ke(c) : Ct(c));
        }
        u && (e[n + 1] = r ? zs(i) : Ws(i));
      }
      function wC(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || 'string' != typeof t) && Dn(e, t) >= 0)
        );
      }
      function Fa(e, t) {
        return (
          (function et(e, t, n, r) {
            const o = y(),
              i = L(),
              s = (function _t(e) {
                const t = M.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function Jf(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[De()],
                    s = (function Kf(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function nh(e, t) {
                    return 0 != (e.flags & (t ? 16 : 32));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function NC(e, t, n, r) {
                      const o = (function is(e) {
                        const t = M.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Tr((n = Na(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = Na(o, e, t, n, r)), null === i)) {
                            let u = (function PC(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== Ct(r)) return e[Ke(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = Na(null, e, t, u[1], r)),
                              (u = Tr(u, t.attrs, r)),
                              (function RC(e, t, n, r) {
                                e[Ke(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            i = (function OC(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Tr(r, e[i].hostAttrs, n);
                              return Tr(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function CC(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = Ke(s),
                        u = Ct(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (Array.isArray(n)) {
                        const d = n;
                        (c = d[1]), (null === c || Dn(d, c) > 0) && (l = !0);
                      } else c = n;
                      if (o)
                        if (0 !== u) {
                          const f = Ke(e[a + 1]);
                          (e[r + 1] = Oo(f, a)),
                            0 !== f && (e[f + 1] = qs(e[f + 1], r)),
                            (e[a + 1] = (function Av(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Oo(a, 0)),
                            0 !== a && (e[a + 1] = qs(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Oo(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = qs(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = zs(e[r + 1])),
                        Uf(e, c, r, !0),
                        Uf(e, c, r, !1),
                        (function EC(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            'string' == typeof t &&
                            Dn(i, t) >= 0 &&
                            (n[r + 1] = Ws(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = Oo(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== T &&
                me(o, s, t) &&
                (function eh(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1];
                  Go(
                    (function pd(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? th(u, t, n, o, Ct(l), s)
                      : void 0
                  ) ||
                    (Go(i) ||
                      ((function hd(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = th(u, null, n, o, a, s))),
                    (function yv(e, t, n, r, o) {
                      const i = J(e);
                      if (t)
                        o
                          ? i
                            ? e.addClass(n, r)
                            : n.classList.add(r)
                          : i
                          ? e.removeClass(n, r)
                          : n.classList.remove(r);
                      else {
                        let s = -1 === r.indexOf('-') ? void 0 : Ne.DashCase;
                        if (null == o)
                          i
                            ? e.removeStyle(n, r, s)
                            : n.style.removeProperty(r);
                        else {
                          const a =
                            'string' == typeof o && o.endsWith('!important');
                          a && ((o = o.slice(0, -10)), (s |= Ne.Important)),
                            i
                              ? e.setStyle(n, r, o, s)
                              : n.style.setProperty(r, o, a ? 'important' : '');
                        }
                      }
                    })(
                      r,
                      s,
                      (function uo(e, t) {
                        return re(t[e]);
                      })(De(), n),
                      o,
                      i
                    ));
                })(
                  i,
                  i.data[De()],
                  o,
                  o[x],
                  e,
                  (o[s + 1] = (function VC(e, t) {
                    return (
                      null == e ||
                        ('string' == typeof t
                          ? (e += t)
                          : 'object' == typeof e &&
                            (e = B(
                              (function Pt(e) {
                                return e instanceof
                                  class bc {
                                    constructor(t) {
                                      this.changingThisBreaksApplicationSecurity =
                                        t;
                                    }
                                    toString() {
                                      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
                                    }
                                  }
                                  ? e.changingThisBreaksApplicationSecurity
                                  : e;
                              })(e)
                            ))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Fa
        );
      }
      function Na(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Tr(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Tr(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            'number' == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ['', e]),
                Fe(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function th(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === T && (f = d ? z : void 0);
          let h = d ? ys(f, r) : c === r ? f : void 0;
          if ((l && !Go(h) && (h = ys(u, r)), Go(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? Ke(p) : Ct(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = ys(u, r));
        }
        return a;
      }
      function Go(e) {
        return void 0 !== e;
      }
      function Sr(e, t = '') {
        const n = y(),
          r = L(),
          o = e + q,
          i = r.firstCreatePass ? bn(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function ks(e, t) {
            return J(e) ? e.createText(t) : e.createTextNode(t);
          })(n[x], t));
        Po(r, n, s, i), at(i, !1);
      }
      const zo = 'en-US';
      let Ih = zo;
      class Yh {}
      class aw {
        resolveComponentFactory(t) {
          throw (function sw(e) {
            const t = Error(
              `No component factory found for ${B(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Gn = (() => {
        class e {}
        return (e.NULL = new aw()), e;
      })();
      function uw() {
        return zn(ae(), y());
      }
      function zn(e, t) {
        return new qn(Be(e, t));
      }
      let qn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = uw), e;
      })();
      function lw(e) {
        return e instanceof qn ? e.nativeElement : e;
      }
      class Jh {}
      let Xh = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function dw() {
                const e = y(),
                  n = xe(ae().index, e);
                return (function cw(e) {
                  return e[x];
                })(st(n) ? n : e);
              })()),
            e
          );
        })(),
        fw = (() => {
          class e {}
          return (
            (e.ɵprov = Z({
              token: e,
              providedIn: 'root',
              factory: () => null,
            })),
            e
          );
        })();
      class Yo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'));
        }
      }
      const hw = new Yo('13.3.9'),
        ja = {};
      function Ko(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(re(i)), Qe(i)))
            for (let a = 10; a < i.length; a++) {
              const u = i[a],
                l = u[1].firstChild;
              null !== l && Ko(u[1], u, l, r);
            }
          const s = n.type;
          if (8 & s) Ko(e, t, n.child, r);
          else if (32 & s) {
            const a = Rs(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = nd(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = _r(t[16]);
              Ko(u[1], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Pr {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return Ko(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Qe(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Bs(t, r), Eo(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Wc(this._lView[1], this._lView);
        }
        onDestroy(t) {
          Sd(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          ua(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          !(function ca(e, t, n) {
            const r = t[10];
            r.begin && r.begin();
            try {
              Mn(e, t, e.template, n);
            } catch (o) {
              throw (Hd(t, o), o);
            } finally {
              r.end && r.end();
            }
          })(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new V(902, '');
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function av(e, t) {
              Cr(e, t, t[x], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new V(902, '');
          this._appRef = t;
        }
      }
      class pw extends Pr {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          kd(this._view);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class ep extends Gn {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = he(t);
          return new Ha(n, this.ngModule);
        }
      }
      function tp(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) &&
            t.push({
              propName: e[n],
              templateName: n,
            });
        return t;
      }
      class Ha extends Yh {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function Tv(e) {
              return e.map(Mv).join(',');
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return tp(this.componentDef.inputs);
        }
        get outputs() {
          return tp(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          const i = (o = o || this.ngModule)
              ? (function mw(e, t) {
                  return {
                    get: (n, r, o) => {
                      const i = e.get(n, ja, o);
                      return i !== ja || r === ja ? i : t.get(n, r, o);
                    },
                  };
                })(t, o.injector)
              : t,
            s = i.get(Jh, Ll),
            a = i.get(fw, null),
            u = s.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || 'div',
            c = r
              ? (function Td(e, t, n) {
                  if (J(e)) return e.selectRootElement(t, n === it.ShadowDom);
                  let r = 'string' == typeof t ? e.querySelector(t) : t;
                  return (r.textContent = ''), r;
                })(u, r, this.componentDef.encapsulation)
              : Vs(
                  s.createRenderer(null, this.componentDef),
                  l,
                  (function gw(e) {
                    const t = e.toLowerCase();
                    return 'svg' === t ? 'svg' : 'math' === t ? 'math' : null;
                  })(l)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function sf(e, t) {
              return {
                components: [],
                scheduler: e || XD,
                clean: d_,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            h = Vo(0, null, null, 1, 0, null, null, null, null, null),
            p = Er(null, h, f, d, null, null, s, u, a, i);
          let m, D;
          co(p);
          try {
            const v = (function rf(e, t, n, r, o, i) {
              const s = n[1];
              n[20] = e;
              const u = bn(s, 20, 2, '#host', null),
                l = (u.mergedAttrs = t.hostAttrs);
              null !== l &&
                (jo(u, l, !0),
                null !== e &&
                  (mo(o, e, l),
                  null !== u.classes && Gs(o, e, u.classes),
                  null !== u.styles && id(o, e, u.styles)));
              const c = r.createRenderer(e, t),
                d = Er(
                  n,
                  Id(t),
                  null,
                  t.onPush ? 64 : 16,
                  n[20],
                  u,
                  r,
                  c,
                  i || null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (_o(sr(u, n), s, t.type), Pd(s, u), Rd(u, n.length, 1)),
                Bo(n, d),
                (n[20] = d)
              );
            })(c, this.componentDef, p, s, u);
            if (c)
              if (r) mo(u, c, ['ng-version', hw.full]);
              else {
                const { attrs: g, classes: E } = (function Sv(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ('string' == typeof i)
                      2 === o
                        ? '' !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!Ye(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return {
                    attrs: t,
                    classes: n,
                  };
                })(this.componentDef.selectors[0]);
                g && mo(u, c, g), E && E.length > 0 && Gs(u, c, E.join(' '));
              }
            if (((D = Xi(h, q)), void 0 !== n)) {
              const g = (D.projection = []);
              for (let E = 0; E < this.ngContentSelectors.length; E++) {
                const N = n[E];
                g.push(null != N ? Array.from(N) : null);
              }
            }
            (m = (function of(e, t, n, r, o) {
              const i = n[1],
                s = (function Zv(e, t, n) {
                  const r = ae();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Od(e, r, t, In(e, t, 1, null), n));
                  const o = ar(t, e, r.directiveStart, r);
                  ge(o, t);
                  const i = Be(r, t);
                  return i && ge(i, t), o;
                })(i, n, t);
              if (
                (r.components.push(s),
                (e[8] = s),
                o && o.forEach((u) => u(s, t)),
                t.contentQueries)
              ) {
                const u = ae();
                t.contentQueries(1, s, u.directiveStart);
              }
              const a = ae();
              return (
                !i.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Ft(a.index),
                  Fd(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  Nd(t, s)),
                s
              );
            })(v, this.componentDef, p, f, [F_])),
              wr(h, p, null);
          } finally {
            fo();
          }
          return new Dw(this.componentType, m, zn(D, p), p, D);
        }
      }
      class Dw extends class iw {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new pw(o)),
            (this.componentType = t);
        }
        get injector() {
          return new hn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      class Wn {}
      const Qn = new Map();
      class op extends Wn {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ep(this));
          const r = Le(t);
          (this._bootstrapComponents = ct(r.bootstrap)),
            (this._r3Injector = qd(
              t,
              n,
              [
                {
                  provide: Wn,
                  useValue: this,
                },
                {
                  provide: Gn,
                  useValue: this.componentFactoryResolver,
                },
              ],
              B(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, n = He.THROW_IF_NOT_FOUND, r = S.Default) {
          return t === He || t === Wn || t === fa
            ? this
            : this._r3Injector.get(t, n, r);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class $a extends class _w {} {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Le(t) &&
              (function Cw(e) {
                const t = new Set();
                !(function n(r) {
                  const o = Le(r, !0),
                    i = o.id;
                  null !== i &&
                    ((function np(e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${B(
                            t
                          )} vs ${B(t.name)}`
                        );
                    })(i, Qn.get(i), r),
                    Qn.set(i, r));
                  const s = ct(o.imports);
                  for (const a of s) t.has(a) || (t.add(a), n(a));
                })(e);
              })(t);
        }
        create(t) {
          return new op(this.moduleType, t);
        }
      }
      function ip(e, t, n, r, o, i) {
        const s = t + n;
        return me(e, s, o)
          ? (function ft(e, t, n) {
              return (e[t] = n);
            })(e, s + 1, i ? r.call(i, o) : r(o))
          : (function Rr(e, t) {
              const n = e[t];
              return n === T ? void 0 : n;
            })(e, s + 1);
      }
      function dp(e, t, n) {
        const r = e + q,
          o = y(),
          i = (function ln(e, t) {
            return e[t];
          })(o, r);
        return (function Or(e, t) {
          return e[1].data[t].pure;
        })(o, r)
          ? ip(
              o,
              (function ye() {
                const e = M.lFrame;
                let t = e.bindingRootIndex;
                return (
                  -1 === t &&
                    (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                  t
                );
              })(),
              t,
              i.transform,
              n,
              i
            )
          : i.transform(n);
      }
      function Ua(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const wt = class kw extends Kn {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          var o, i, s;
          let a = t,
            u = n || (() => null),
            l = r;
          if (t && 'object' == typeof t) {
            const d = t;
            (a = null === (o = d.next) || void 0 === o ? void 0 : o.bind(d)),
              (u = null === (i = d.error) || void 0 === i ? void 0 : i.bind(d)),
              (l =
                null === (s = d.complete) || void 0 === s ? void 0 : s.bind(d));
          }
          this.__isAsync && ((u = Ua(u)), a && (a = Ua(a)), l && (l = Ua(l)));
          const c = super.subscribe({
            next: a,
            error: u,
            complete: l,
          });
          return t instanceof ot && t.add(c), c;
        }
      };
      function Vw() {
        return this._results[An()]();
      }
      class Ga {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = An(),
            r = Ga.prototype;
          r[n] || (r[n] = Vw);
        }
        get changes() {
          return this._changes || (this._changes = new wt());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const o = je(t);
          (this._changesDetected = !(function ky(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = t[r];
              if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, n)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      Symbol;
      let bt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = Hw), e;
      })();
      const Bw = bt,
        jw = class extends Bw {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t) {
            const n = this._declarationTContainer.tViews,
              r = Er(
                this._declarationLView,
                n,
                t,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const i = this._declarationLView[19];
            return (
              null !== i && (r[19] = i.createEmbeddedView(n)),
              wr(n, r, t),
              new Pr(r)
            );
          }
        };
      function Hw() {
        return Jo(ae(), y());
      }
      function Jo(e, t) {
        return 4 & e.type ? new jw(t, e, zn(e, t)) : null;
      }
      let gt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = $w), e;
      })();
      function $w() {
        return pp(ae(), y());
      }
      const Uw = gt,
        fp = class extends Uw {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return zn(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new hn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = vo(this._hostTNode, this._hostLView);
            if (Xl(t)) {
              const n = fn(t, this._hostLView),
                r = dn(t);
              return new hn(n[1].data[r + 8], n);
            }
            return new hn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = hp(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            const o = t.createEmbeddedView(n || {});
            return this.insert(o, r), o;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function lr(e) {
                return 'function' == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.ngModuleRef);
            }
            const u = s ? t : new Ha(he(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(Wn, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function ry(e) {
                return Qe(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new fp(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function lv(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), lc(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function cv(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 128);
            })(o, r, s, i);
            const a = $s(i, s),
              u = r[x],
              l = No(u, s[7]);
            return (
              null !== l &&
                (function sv(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Cr(e, r, n, 1, o, i);
                })(o, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              lc(za(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = hp(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Bs(this._lContainer, n);
            r && (Eo(za(this._lContainer), n), Wc(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Bs(this._lContainer, n);
            return r && null != Eo(za(this._lContainer), n) ? new Pr(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return null == t ? this.length + n : t;
          }
        };
      function hp(e) {
        return e[8];
      }
      function za(e) {
        return e[8] || (e[8] = []);
      }
      function pp(e, t) {
        let n;
        const r = t[e.index];
        if (Qe(r)) n = r;
        else {
          let o;
          if (8 & e.type) o = re(r);
          else {
            const i = t[x];
            o = i.createComment('');
            const s = Be(e, t);
            Zt(
              i,
              No(i, s),
              o,
              (function pv(e, t) {
                return J(e) ? e.nextSibling(t) : t.nextSibling;
              })(i, s),
              !1
            );
          }
          (t[e.index] = n =
            (function Ld(e, t, n, r) {
              return new Array(e, !0, !1, t, null, 0, r, n, null, null);
            })(r, t, o, e)),
            Bo(t, n);
        }
        return new fp(n, e, t);
      }
      class qa {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new qa(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Wa {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = n.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Wa(o);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== Ep(t, n).matches && this.queries[n].setDirty();
        }
      }
      class gp {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class Qa {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]));
          }
          return null !== n ? new Qa(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Za {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new Za(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(t, n, qw(n, i)),
                this.matchTNodeWithReadOption(t, n, Co(n, t, i, !1, !1));
            }
          else
            r === bt
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, Co(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === qn || o === gt || (o === bt && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = Co(n, t, o, !1, !1);
                null !== i && this.addMatch(n.index, i);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function qw(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function Qw(e, t, n, r) {
        return -1 === n
          ? (function Ww(e, t) {
              return 11 & e.type ? zn(e, t) : 4 & e.type ? Jo(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function Zw(e, t, n) {
              return n === qn
                ? zn(t, e)
                : n === bt
                ? Jo(t, e)
                : n === gt
                ? pp(t, e)
                : void 0;
            })(e, t, r)
          : ar(e, e[1], n, t);
      }
      function mp(e, t, n, r) {
        const o = t[19].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = n.matches,
            a = [];
          for (let u = 0; u < s.length; u += 2) {
            const l = s[u];
            a.push(l < 0 ? null : Qw(t, i[l], s[u + 1], n.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function Ya(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches;
        if (null !== i) {
          const s = mp(e, t, o, n);
          for (let a = 0; a < i.length; a += 2) {
            const u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
              const l = i[a + 1],
                c = t[-u];
              for (let d = 10; d < c.length; d++) {
                const f = c[d];
                f[17] === f[3] && Ya(f[1], f, l, r);
              }
              if (null !== c[9]) {
                const d = c[9];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  Ya(h[1], h, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function yp(e) {
        const t = y(),
          n = L(),
          r = Gl();
        ss(r + 1);
        const o = Ep(n, r);
        if (e.dirty && kl(t) === (2 == (2 & o.metadata.flags))) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? Ya(n, t, r, []) : mp(n, t, o, r);
            e.reset(i, lw), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Dp(e, t, n) {
        const r = L();
        r.firstCreatePass &&
          ((function Cp(e, t, n) {
            null === e.queries && (e.queries = new Qa()),
              e.queries.track(new Za(t, n));
          })(r, new gp(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          (function _p(e, t, n) {
            const r = new Ga(4 == (4 & n));
            Sd(e, t, r, r.destroy),
              null === t[19] && (t[19] = new Wa()),
              t[19].queries.push(new qa(r));
          })(r, y(), t);
      }
      function Ep(e, t) {
        return e.queries.getByIndex(t);
      }
      function ti(...e) {}
      const Bp = new j('Application Initializer');
      let nu = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = ti),
              (this.reject = ti),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Sa(i)) n.push(i);
                else if (gC(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({
                      complete: a,
                      error: u,
                    });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)($(Bp, 8));
          }),
          (e.ɵprov = Z({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          })),
          e
        );
      })();
      const kr = new j('AppId', {
        providedIn: 'root',
        factory: function jp() {
          return `${ru()}${ru()}${ru()}`;
        },
      });
      function ru() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Hp = new j('Platform Initializer'),
        $p = new j('Platform ID', {
          providedIn: 'platform',
          factory: () => 'unknown',
        }),
        y0 = new j('appBootstrapListener'),
        Lt = new j('LocaleId', {
          providedIn: 'root',
          factory: () =>
            Yy(Lt, S.Optional | S.SkipSelf) ||
            (function D0() {
              return (
                ('undefined' != typeof $localize && $localize.locale) || zo
              );
            })(),
        }),
        E0 = (() => Promise.resolve(0))();
      function ou(e) {
        'undefined' == typeof Zone
          ? E0.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', e);
      }
      class Ee {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new wt(!1)),
            (this.onMicrotaskEmpty = new wt(!1)),
            (this.onStable = new wt(!1)),
            (this.onError = new wt(!1)),
            'undefined' == typeof Zone)
          )
            throw new Error('In this configuration Angular requires Zone.js');
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function w0() {
              let e = H.requestAnimationFrame,
                t = H.cancelAnimationFrame;
              if ('undefined' != typeof Zone && e && t) {
                const n = e[Zone.__symbol__('OriginalDelegate')];
                n && (e = n);
                const r = t[Zone.__symbol__('OriginalDelegate')];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function M0(e) {
              const t = () => {
                !(function I0(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(H, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                su(e),
                                (e.isCheckStableRunning = !0),
                                iu(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    su(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: 'angular',
                properties: {
                  isAngularZone: !0,
                },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return Up(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      'eventTask' === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Gp(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return Up(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Gp(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ('microTask' == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          su(e),
                          iu(e))
                        : 'macroTask' == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return (
            'undefined' != typeof Zone &&
            !0 === Zone.current.get('isAngularZone')
          );
        }
        static assertInAngularZone() {
          if (!Ee.isInAngularZone())
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
        static assertNotInAngularZone() {
          if (Ee.isInAngularZone())
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask('NgZoneEvent: ' + o, t, b0, ti, ti);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const b0 = {};
      function iu(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function su(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Up(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Gp(e) {
        e._nesting--, iu(e);
      }
      class T0 {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new wt()),
            (this.onMicrotaskEmpty = new wt()),
            (this.onStable = new wt()),
            (this.onError = new wt());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      let au = (() => {
          class e {
            constructor(n) {
              (this._ngZone = n),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    'undefined' == typeof Zone
                      ? null
                      : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ee.assertNotInAngularZone(),
                        ou(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                ou(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({
                  doneCb: n,
                  timeoutId: i,
                  updateCb: o,
                });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)($(Ee));
            }),
            (e.ɵprov = Z({
              token: e,
              factory: e.ɵfac,
            })),
            e
          );
        })(),
        S0 = (() => {
          class e {
            constructor() {
              (this._applications = new Map()), uu.addToWindow(this);
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return uu.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = Z({
              token: e,
              factory: e.ɵfac,
              providedIn: 'platform',
            })),
            e
          );
        })();
      class A0 {
        addToWindow(t) {}
        findTestabilityInTree(t, n, r) {
          return null;
        }
      }
      let uu = new A0(),
        Xt = null;
      const zp = new j('AllowMultipleToken'),
        qp = new j('PlatformOnDestroy');
      function Wp(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new j(r);
        return (i = []) => {
          let s = lu();
          if (!s || s.injector.get(zp, !1)) {
            const a = [
              ...n,
              ...i,
              {
                provide: o,
                useValue: !0,
              },
            ];
            e
              ? e(a)
              : (function P0(e) {
                  if (Xt && !Xt.get(zp, !1)) throw new V(400, '');
                  Xt = e;
                  const t = e.get(Qp),
                    n = e.get(Hp, null);
                  n && n.forEach((r) => r());
                })(
                  (function O0(e = [], t) {
                    return He.create({
                      name: t,
                      providers: [
                        {
                          provide: ha,
                          useValue: 'platform',
                        },
                        {
                          provide: qp,
                          useValue: () => (Xt = null),
                        },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function R0(e) {
            const t = lu();
            if (!t) throw new V(401, '');
            return t;
          })();
        };
      }
      function lu() {
        var e;
        return null !== (e = null == Xt ? void 0 : Xt.get(Qp)) && void 0 !== e
          ? e
          : null;
      }
      let Qp = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function L0(e, t) {
                let n;
                return (
                  (n =
                    'noop' === e
                      ? new T0()
                      : ('zone.js' === e ? void 0 : e) ||
                        new Ee({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              u = [
                {
                  provide: Ee,
                  useValue: a,
                },
              ];
            return a.run(() => {
              const l = He.create({
                  providers: u,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(l),
                d = c.injector.get(vr, null);
              if (!d) throw new V(402, '');
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    du(this._modules, c), f.unsubscribe();
                  });
                }),
                (function k0(e, t, n) {
                  try {
                    const r = n();
                    return Sa(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(d, a, () => {
                  const f = c.injector.get(nu);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function lE(e) {
                          Se(e, 'Expected localeId to be defined'),
                            'string' == typeof e &&
                              (Ih = e.toLowerCase().replace(/_/g, '-'));
                        })(c.injector.get(Lt, zo) || zo),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Zp({}, r);
            return (function F0(e, t, n) {
              const r = new $a(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(cu);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new V(403, '');
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new V(404, '');
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(qp, null);
            null == n || n(), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)($(He));
          }),
          (e.ɵprov = Z({
            token: e,
            factory: e.ɵfac,
            providedIn: 'platform',
          })),
          e
        );
      })();
      function Zp(e, t) {
        return Array.isArray(t)
          ? t.reduce(Zp, e)
          : Object.assign(Object.assign({}, e), t);
      }
      let cu = (() => {
        class e {
          constructor(n, r, o, i) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const s = new we((u) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    u.next(this._stable), u.complete();
                  });
              }),
              a = new we((u) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Ee.assertNotInAngularZone(),
                      ou(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), u.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  Ee.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        u.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = _l(
              s,
              a.pipe(
                (function bm(e = {}) {
                  const {
                    connector: t = () => new Kn(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s = null,
                      a = null,
                      u = null,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        null == a || a.unsubscribe(), (a = null);
                      },
                      h = () => {
                        f(), (s = u = null), (c = d = !1);
                      },
                      p = () => {
                        const m = s;
                        h(), null == m || m.unsubscribe();
                      };
                    return jt((m, D) => {
                      l++, !d && !c && f();
                      const v = (u = null != u ? u : t());
                      D.add(() => {
                        l--, 0 === l && !d && !c && (a = Pi(p, o));
                      }),
                        v.subscribe(D),
                        s ||
                          ((s = new Zr({
                            next: (g) => v.next(g),
                            error: (g) => {
                              (d = !0), f(), (a = Pi(h, n, g)), v.error(g);
                            },
                            complete: () => {
                              (c = !0), f(), (a = Pi(h, r)), v.complete();
                            },
                          })),
                          vl(m).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new V(405, '');
            let o;
            (o =
              n instanceof Yh
                ? n
                : this._injector.get(Gn).resolveComponentFactory(n)),
              this.componentTypes.push(o.componentType);
            const i = (function N0(e) {
                return e.isBoundToModule;
              })(o)
                ? void 0
                : this._injector.get(Wn),
              a = o.create(He.NULL, [], r || o.selector, i),
              u = a.location.nativeElement,
              l = a.injector.get(au, null),
              c = l && a.injector.get(S0);
            return (
              l && c && c.registerApplication(u, l),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  du(this.components, a),
                  c && c.unregisterApplication(u);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick) throw new V(101, '');
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            du(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(y0, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
          }
          ngOnDestroy() {
            this._views.slice().forEach((n) => n.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)($(Ee), $(He), $(vr), $(nu));
          }),
          (e.ɵprov = Z({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          })),
          e
        );
      })();
      function du(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Kp = !0,
        eg = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = j0), e;
        })();
      function j0(e) {
        return (function H0(e, t, n) {
          if (io(e) && !n) {
            const r = xe(e.index, t);
            return new Pr(r, r);
          }
          return 47 & e.type ? new Pr(t[16], t) : null;
        })(ae(), y(), 16 == (16 & e));
      }
      class sg {
        constructor() {}
        supports(t) {
          return t instanceof Map || va(t);
        }
        create() {
          return new Y0();
        }
      }
      class Y0 {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || va(t))) throw new V(900, '');
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new K0(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class K0 {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function ug() {
        return new Vr([new sg()]);
      }
      let Vr = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || ug()),
              deps: [[e, new Mo(), new Io()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (r) return r;
            throw new V(901, '');
          }
        }
        return (
          (e.ɵprov = Z({
            token: e,
            providedIn: 'root',
            factory: ug,
          })),
          e
        );
      })();
      const eb = Wp(null, 'core', []);
      let tb = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)($(cu));
            }),
            (e.ɵmod = Xn({
              type: e,
            })),
            (e.ɵinj = nn({})),
            e
          );
        })(),
        ii = null;
      function Br() {
        return ii;
      }
      const mt = new j('DocumentToken');
      let Eg = (() => {
        class e {
          constructor(n, r, o) {
            (this._ngEl = n),
              (this._differs = r),
              (this._renderer = o),
              (this._ngStyle = null),
              (this._differ = null);
          }
          set ngStyle(n) {
            (this._ngStyle = n),
              !this._differ &&
                n &&
                (this._differ = this._differs.find(n).create());
          }
          ngDoCheck() {
            if (this._differ) {
              const n = this._differ.diff(this._ngStyle);
              n && this._applyChanges(n);
            }
          }
          _setStyle(n, r) {
            const [o, i] = n.split('.');
            null != (r = null != r && i ? `${r}${i}` : r)
              ? this._renderer.setStyle(this._ngEl.nativeElement, o, r)
              : this._renderer.removeStyle(this._ngEl.nativeElement, o);
          }
          _applyChanges(n) {
            n.forEachRemovedItem((r) => this._setStyle(r.key, null)),
              n.forEachAddedItem((r) => this._setStyle(r.key, r.currentValue)),
              n.forEachChangedItem((r) =>
                this._setStyle(r.key, r.currentValue)
              );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(qn), R(Vr), R(Xh));
          }),
          (e.ɵdir = Oe({
            type: e,
            selectors: [['', 'ngStyle', '']],
            inputs: {
              ngStyle: 'ngStyle',
            },
          })),
          e
        );
      })();
      class tI {
        createSubscription(t, n) {
          return t.subscribe({
            next: n,
            error: (r) => {
              throw r;
            },
          });
        }
        dispose(t) {
          t.unsubscribe();
        }
        onDestroy(t) {
          t.unsubscribe();
        }
      }
      class nI {
        createSubscription(t, n) {
          return t.then(n, (r) => {
            throw r;
          });
        }
        dispose(t) {}
        onDestroy(t) {}
      }
      const rI = new nI(),
        oI = new tI();
      let wg = (() => {
          class e {
            constructor(n) {
              (this._ref = n),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null);
            }
            ngOnDestroy() {
              this._subscription && this._dispose();
            }
            transform(n) {
              return this._obj
                ? n !== this._obj
                  ? (this._dispose(), this.transform(n))
                  : this._latestValue
                : (n && this._subscribe(n), this._latestValue);
            }
            _subscribe(n) {
              (this._obj = n),
                (this._strategy = this._selectStrategy(n)),
                (this._subscription = this._strategy.createSubscription(
                  n,
                  (r) => this._updateLatestValue(n, r)
                ));
            }
            _selectStrategy(n) {
              if (Sa(n)) return rI;
              if (xf(n)) return oI;
              throw (function rt(e, t) {
                return new V(2100, '');
              })();
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(n, r) {
              n === this._obj &&
                ((this._latestValue = r), this._ref.markForCheck());
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(eg, 16));
            }),
            (e.ɵpipe = be({
              name: 'async',
              type: e,
              pure: !1,
            })),
            e
          );
        })(),
        CI = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Xn({
              type: e,
            })),
            (e.ɵinj = nn({})),
            e
          );
        })();
      class Au extends class TI extends class ob {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function rb(e) {
            ii || (ii = e);
          })(new Au());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return 'window' === n
            ? window
            : 'document' === n
            ? t
            : 'body' === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function SI() {
            return (
              ($r = $r || document.querySelector('base')),
              $r ? $r.getAttribute('href') : null
            );
          })();
          return null == n
            ? null
            : (function AI(e) {
                (gi = gi || document.createElement('a')),
                  gi.setAttribute('href', e);
                const t = gi.pathname;
                return '/' === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          $r = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function Gb(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(';')) {
              const r = n.indexOf('='),
                [o, i] = -1 == r ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let gi,
        $r = null;
      const Tg = new j('TRANSITION_ID'),
        FI = [
          {
            provide: Bp,
            useFactory: function xI(e, t, n) {
              return () => {
                n.get(nu).donePromise.then(() => {
                  const r = Br(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Tg, mt, He],
            multi: !0,
          },
        ];
      class xu {
        static init() {
          !(function x0(e) {
            uu = e;
          })(new xu());
        }
        addToWindow(t) {
          (H.getAngularTestability = (r, o = !0) => {
            const i = t.findTestabilityInTree(r, o);
            if (null == i)
              throw new Error('Could not find testability for element.');
            return i;
          }),
            (H.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (H.getAllAngularRootElements = () => t.getAllRootElements()),
            H.frameworkStabilizers || (H.frameworkStabilizers = []),
            H.frameworkStabilizers.push((r) => {
              const o = H.getAllAngularTestabilities();
              let i = o.length,
                s = !1;
              const a = function (u) {
                (s = s || u), i--, 0 == i && r(s);
              };
              o.forEach(function (u) {
                u.whenStable(a);
              });
            });
        }
        findTestabilityInTree(t, n, r) {
          if (null == n) return null;
          const o = t.getTestability(n);
          return null != o
            ? o
            : r
            ? Br().isShadowRoot(n)
              ? this.findTestabilityInTree(t, n.host, !0)
              : this.findTestabilityInTree(t, n.parentElement, !0)
            : null;
        }
      }
      let NI = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = Z({
            token: e,
            factory: e.ɵfac,
          })),
          e
        );
      })();
      const mi = new j('EventManagerPlugins');
      let yi = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)($(mi), $(Ee));
          }),
          (e.ɵprov = Z({
            token: e,
            factory: e.ɵfac,
          })),
          e
        );
      })();
      class Sg {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = Br().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Ag = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = Z({
              token: e,
              factory: e.ɵfac,
            })),
            e
          );
        })(),
        Ur = (() => {
          class e extends Ag {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement('style');
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(xg), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(xg));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)($(mt));
            }),
            (e.ɵprov = Z({
              token: e,
              factory: e.ɵfac,
            })),
            e
          );
        })();
      function xg(e) {
        Br().remove(e);
      }
      const Fu = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        Nu = /%COMP%/g;
      function Di(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let o = t[r];
          Array.isArray(o) ? Di(e, o, n) : ((o = o.replace(Nu, e)), n.push(o));
        }
        return n;
      }
      function Pg(e) {
        return (t) => {
          if ('__ngUnwrap__' === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Pu = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ru(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case it.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new VI(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case 1:
              case it.ShadowDom:
                return new BI(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = Di(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)($(yi), $(Ur), $(kr));
          }),
          (e.ɵprov = Z({
            token: e,
            factory: e.ɵfac,
          })),
          e
        );
      })();
      class Ru {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Fu[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          t.appendChild(n);
        }
        insertBefore(t, n, r) {
          t && t.insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = 'string' == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ''), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ':' + n;
            const i = Fu[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Fu[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Ne.DashCase | Ne.Important)
            ? t.style.setProperty(n, r, o & Ne.Important ? 'important' : '')
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Ne.DashCase ? t.style.removeProperty(n) : (t.style[n] = '');
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, Pg(r))
            : this.eventManager.addEventListener(t, n, Pg(r));
        }
      }
      class VI extends Ru {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = Di(o + '-' + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function OI(e) {
              return '_ngcontent-%COMP%'.replace(Nu, e);
            })(o + '-' + r.id)),
            (this.hostAttr = (function LI(e) {
              return '_nghost-%COMP%'.replace(Nu, e);
            })(o + '-' + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '');
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ''), r;
        }
      }
      class BI extends Ru {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({
              mode: 'open',
            })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Di(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement('style');
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let jI = (() => {
        class e extends Sg {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)($(mt));
          }),
          (e.ɵprov = Z({
            token: e,
            factory: e.ɵfac,
          })),
          e
        );
      })();
      const Og = ['alt', 'control', 'meta', 'shift'],
        $I = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        Lg = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock',
        },
        UI = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let GI = (() => {
        class e extends Sg {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Br().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split('.'),
              o = r.shift();
            if (0 === r.length || ('keydown' !== o && 'keyup' !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = '';
            if (
              (Og.forEach((u) => {
                const l = r.indexOf(u);
                l > -1 && (r.splice(l, 1), (s += u + '.'));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const a = {};
            return (a.domEventName = o), (a.fullKey = s), a;
          }
          static getEventFullKey(n) {
            let r = '',
              o = (function zI(e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return 'Unidentified';
                  t.startsWith('U+') &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && Lg.hasOwnProperty(t) && (t = Lg[t]));
                }
                return $I[t] || t;
              })(n);
            return (
              (o = o.toLowerCase()),
              ' ' === o ? (o = 'space') : '.' === o && (o = 'dot'),
              Og.forEach((i) => {
                i != o && UI[i](n) && (r += i + '.');
              }),
              (r += o),
              r
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.getEventFullKey(i) === n && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return 'esc' === n ? 'escape' : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)($(mt));
          }),
          (e.ɵprov = Z({
            token: e,
            factory: e.ɵfac,
          })),
          e
        );
      })();
      const ZI = Wp(eb, 'browser', [
          {
            provide: $p,
            useValue: 'browser',
          },
          {
            provide: Hp,
            useValue: function qI() {
              Au.makeCurrent(), xu.init();
            },
            multi: !0,
          },
          {
            provide: mt,
            useFactory: function QI() {
              return (
                (function Xm(e) {
                  Ki = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        YI = [
          {
            provide: ha,
            useValue: 'root',
          },
          {
            provide: vr,
            useFactory: function WI() {
              return new vr();
            },
            deps: [],
          },
          {
            provide: mi,
            useClass: jI,
            multi: !0,
            deps: [mt, Ee, $p],
          },
          {
            provide: mi,
            useClass: GI,
            multi: !0,
            deps: [mt],
          },
          {
            provide: Pu,
            useClass: Pu,
            deps: [yi, Ur, kr],
          },
          {
            provide: Jh,
            useExisting: Pu,
          },
          {
            provide: Ag,
            useExisting: Ur,
          },
          {
            provide: Ur,
            useClass: Ur,
            deps: [mt],
          },
          {
            provide: au,
            useClass: au,
            deps: [Ee],
          },
          {
            provide: yi,
            useClass: yi,
            deps: [mi, Ee],
          },
          {
            provide: class MI {},
            useClass: NI,
            deps: [],
          },
        ];
      let KI = (() => {
        class e {
          constructor(n) {
            if (n)
              throw new Error(
                'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
              );
          }
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                {
                  provide: kr,
                  useValue: n.appId,
                },
                {
                  provide: Tg,
                  useExisting: kr,
                },
                FI,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)($(e, 12));
          }),
          (e.ɵmod = Xn({
            type: e,
          })),
          (e.ɵinj = nn({
            providers: YI,
            imports: [CI, tb],
          })),
          e
        );
      })();
      'undefined' != typeof window && window;
      const Bg = {
        now: () => (Bg.delegate || Date).now(),
        delegate: void 0,
      };
      class uM extends Kn {
        constructor(t = 1 / 0, n = 1 / 0, r = Bg) {
          super(),
            (this._bufferSize = t),
            (this._windowTime = n),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = n === 1 / 0),
            (this._bufferSize = Math.max(1, t)),
            (this._windowTime = Math.max(1, n));
        }
        next(t) {
          const {
            isStopped: n,
            _buffer: r,
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s,
          } = this;
          n || (r.push(t), !o && r.push(i.now() + s)),
            this._trimBuffer(),
            super.next(t);
        }
        _subscribe(t) {
          this._throwIfClosed(), this._trimBuffer();
          const n = this._innerSubscribe(t),
            { _infiniteTimeWindow: r, _buffer: o } = this,
            i = o.slice();
          for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2)
            t.next(i[s]);
          return this._checkFinalizedStatuses(t), n;
        }
        _trimBuffer() {
          const {
              _bufferSize: t,
              _timestampProvider: n,
              _buffer: r,
              _infiniteTimeWindow: o,
            } = this,
            i = (o ? 1 : 2) * t;
          if ((t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
            const s = n.now();
            let a = 0;
            for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u;
            a && r.splice(0, a + 1);
          }
        }
      }
      const vi = {
        schedule(e, t) {
          const n = setTimeout(e, t);
          return () => clearTimeout(n);
        },
        scheduleBeforeRender(e) {
          if ('undefined' == typeof window) return vi.schedule(e, 0);
          if (void 0 === window.requestAnimationFrame)
            return vi.schedule(e, 16);
          const t = window.requestAnimationFrame(e);
          return () => window.cancelAnimationFrame(t);
        },
      };
      let Lu;
      function DM(e, t, n) {
        let r = n;
        return (
          (function dM(e) {
            return !!e && e.nodeType === Node.ELEMENT_NODE;
          })(e) &&
            t.some(
              (o, i) =>
                !(
                  '*' === o ||
                  !(function hM(e, t) {
                    if (!Lu) {
                      const n = Element.prototype;
                      Lu =
                        n.matches ||
                        n.matchesSelector ||
                        n.mozMatchesSelector ||
                        n.msMatchesSelector ||
                        n.oMatchesSelector ||
                        n.webkitMatchesSelector;
                    }
                    return e.nodeType === Node.ELEMENT_NODE && Lu.call(e, t);
                  })(e, o) ||
                  ((r = i), 0)
                )
            ),
          r
        );
      }
      class _M {
        constructor(t, n) {
          this.componentFactory = n.get(Gn).resolveComponentFactory(t);
        }
        create(t) {
          return new CM(this.componentFactory, t);
        }
      }
      class CM {
        constructor(t, n) {
          (this.componentFactory = t),
            (this.injector = n),
            (this.eventEmitters = new uM(1)),
            (this.events = this.eventEmitters.pipe(
              (function lM(e, t) {
                return jt((n, r) => {
                  let o = null,
                    i = 0,
                    s = !1;
                  const a = () => s && !o && r.complete();
                  n.subscribe(
                    Ht(
                      r,
                      (u) => {
                        null == o || o.unsubscribe();
                        let l = 0;
                        const c = i++;
                        Ut(e(u, c)).subscribe(
                          (o = Ht(
                            r,
                            (d) => r.next(t ? t(u, d, c, l++) : d),
                            () => {
                              (o = null), a();
                            }
                          ))
                        );
                      },
                      () => {
                        (s = !0), a();
                      }
                    )
                  );
                });
              })((r) => _l(...r))
            )),
            (this.componentRef = null),
            (this.viewChangeDetectorRef = null),
            (this.inputChanges = null),
            (this.hasInputChanges = !1),
            (this.implementsOnChanges = !1),
            (this.scheduledChangeDetectionFn = null),
            (this.scheduledDestroyFn = null),
            (this.initialInputValues = new Map()),
            (this.unchangedInputs = new Set(
              this.componentFactory.inputs.map(({ propName: r }) => r)
            )),
            (this.ngZone = this.injector.get(Ee)),
            (this.elementZone =
              'undefined' == typeof Zone
                ? null
                : this.ngZone.run(() => Zone.current));
        }
        connect(t) {
          this.runInZone(() => {
            if (null !== this.scheduledDestroyFn)
              return (
                this.scheduledDestroyFn(), void (this.scheduledDestroyFn = null)
              );
            null === this.componentRef && this.initializeComponent(t);
          });
        }
        disconnect() {
          this.runInZone(() => {
            null === this.componentRef ||
              null !== this.scheduledDestroyFn ||
              (this.scheduledDestroyFn = vi.schedule(() => {
                null !== this.componentRef &&
                  (this.componentRef.destroy(),
                  (this.componentRef = null),
                  (this.viewChangeDetectorRef = null));
              }, 10));
          });
        }
        getInputValue(t) {
          return this.runInZone(() =>
            null === this.componentRef
              ? this.initialInputValues.get(t)
              : this.componentRef.instance[t]
          );
        }
        setInputValue(t, n) {
          this.runInZone(() => {
            null !== this.componentRef
              ? ((function pM(e, t) {
                  return e === t || (e != e && t != t);
                })(n, this.getInputValue(t)) &&
                  (void 0 !== n || !this.unchangedInputs.has(t))) ||
                (this.recordInputChange(t, n),
                this.unchangedInputs.delete(t),
                (this.hasInputChanges = !0),
                (this.componentRef.instance[t] = n),
                this.scheduleDetectChanges())
              : this.initialInputValues.set(t, n);
          });
        }
        initializeComponent(t) {
          const n = He.create({
              providers: [],
              parent: this.injector,
            }),
            r = (function yM(e, t) {
              const n = e.childNodes,
                r = t.map(() => []);
              let o = -1;
              t.some((i, s) => '*' === i && ((o = s), !0));
              for (let i = 0, s = n.length; i < s; ++i) {
                const a = n[i],
                  u = DM(a, t, o);
                -1 !== u && r[u].push(a);
              }
              return r;
            })(t, this.componentFactory.ngContentSelectors);
          (this.componentRef = this.componentFactory.create(n, r, t)),
            (this.viewChangeDetectorRef = this.componentRef.injector.get(eg)),
            (this.implementsOnChanges = (function fM(e) {
              return 'function' == typeof e;
            })(this.componentRef.instance.ngOnChanges)),
            this.initializeInputs(),
            this.initializeOutputs(this.componentRef),
            this.detectChanges(),
            this.injector.get(cu).attachView(this.componentRef.hostView);
        }
        initializeInputs() {
          this.componentFactory.inputs.forEach(({ propName: t }) => {
            this.initialInputValues.has(t) &&
              this.setInputValue(t, this.initialInputValues.get(t));
          }),
            this.initialInputValues.clear();
        }
        initializeOutputs(t) {
          const n = this.componentFactory.outputs.map(
            ({ propName: r, templateName: o }) =>
              t.instance[r].pipe(
                tl((s) => ({
                  name: o,
                  value: s,
                }))
              )
          );
          this.eventEmitters.next(n);
        }
        callNgOnChanges(t) {
          if (!this.implementsOnChanges || null === this.inputChanges) return;
          const n = this.inputChanges;
          (this.inputChanges = null), t.instance.ngOnChanges(n);
        }
        markViewForCheck(t) {
          this.hasInputChanges &&
            ((this.hasInputChanges = !1), t.markForCheck());
        }
        scheduleDetectChanges() {
          this.scheduledChangeDetectionFn ||
            (this.scheduledChangeDetectionFn = vi.scheduleBeforeRender(() => {
              (this.scheduledChangeDetectionFn = null), this.detectChanges();
            }));
        }
        recordInputChange(t, n) {
          if (!this.implementsOnChanges) return;
          null === this.inputChanges && (this.inputChanges = {});
          const r = this.inputChanges[t];
          if (r) return void (r.currentValue = n);
          const o = this.unchangedInputs.has(t),
            i = o ? void 0 : this.getInputValue(t);
          this.inputChanges[t] = new Nl(i, n, o);
        }
        detectChanges() {
          null !== this.componentRef &&
            (this.callNgOnChanges(this.componentRef),
            this.markViewForCheck(this.viewChangeDetectorRef),
            this.componentRef.changeDetectorRef.detectChanges());
        }
        runInZone(t) {
          return this.elementZone && Zone.current !== this.elementZone
            ? this.ngZone.run(t)
            : t();
        }
      }
      class EM extends HTMLElement {
        constructor() {
          super(...arguments), (this.ngElementEventsSubscription = null);
        }
      }
      function _i(e) {
        return null != e && 'false' != `${e}`;
      }
      class IM extends Kn {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      var Ci, Ei, wi, bi;
      const MM = ['video'];
      class Gr {
        constructor() {
          Ci.set(this, !1),
            Ei.set(this, !1),
            wi.set(this, !1),
            bi.set(this, !1),
            (this.isPlaying$ = new IM(!1)),
            (this.video = null),
            (this.videoEl = null);
        }
        get blur() {
          return Kr(this, Ci, 'f');
        }
        set blur(t) {
          Jr(this, Ci, _i(t), 'f');
        }
        get invert() {
          return Kr(this, Ei, 'f');
        }
        set invert(t) {
          Jr(this, Ei, _i(t), 'f');
        }
        get flip() {
          return Kr(this, wi, 'f');
        }
        set flip(t) {
          Jr(this, wi, _i(t), 'f');
        }
        get sepia() {
          return Kr(this, bi, 'f');
        }
        set sepia(t) {
          Jr(this, bi, _i(t), 'f');
        }
        ngAfterViewInit() {
          null !== this.video &&
            ((this.videoEl = this.video.nativeElement),
            navigator.mediaDevices
              .getUserMedia({
                video: {
                  facingMode: 'user',
                },
              })
              .then((t) => {
                (this.videoEl.srcObject = t),
                  this.videoEl.play().then(() => this.isPlaying$.next(!0)),
                  (this.videoEl.style.visibility = 'visible');
              }));
        }
        get style() {
          let t = '',
            n = '';
          return (
            this.blur && (t += 'blur(5px)'),
            this.invert && (t += 'invert(1)'),
            this.flip && (n += 'scaleX(-1)'),
            this.sepia && (t += 'sepia(50%)'),
            {
              filter: t,
              transform: n,
            }
          );
        }
      }
      (Ci = new WeakMap()),
        (Ei = new WeakMap()),
        (wi = new WeakMap()),
        (bi = new WeakMap()),
        (Gr.ɵfac = function (t) {
          return new (t || Gr)();
        }),
        (Gr.ɵcmp = Ui({
          type: Gr,
          selectors: [['bkc-camera']],
          viewQuery: function (t, n) {
            if ((1 & t && Dp(MM, 5), 2 & t)) {
              let r;
              yp(
                (r = (function vp() {
                  return (function Kw(e, t) {
                    return e[19].queries[t].queryList;
                  })(y(), Gl());
                })())
              ) && (n.video = r.first);
            }
          },
          inputs: {
            blur: 'blur',
            invert: 'invert',
            flip: 'flip',
            sepia: 'sepia',
          },
          decls: 16,
          vars: 9,
          consts: [
            [1, 'camera'],
            [3, 'ngStyle'],
            ['video', ''],
            ['type', 'checkbox', 3, 'checked', 'change'],
          ],
          template: function (t, n) {
            1 & t &&
              (Ue(0, 'div', 0),
              (function cp(e, t) {
                const n = L();
                let r;
                const o = e + q;
                n.firstCreatePass
                  ? ((r = (function Nw(e, t) {
                      if (t)
                        for (let n = t.length - 1; n >= 0; n--) {
                          const r = t[n];
                          if (e === r.name) return r;
                        }
                    })(t, n.pipeRegistry)),
                    (n.data[o] = r),
                    r.onDestroy &&
                      (n.destroyHooks || (n.destroyHooks = [])).push(
                        o,
                        r.onDestroy
                      ))
                  : (r = n.data[o]);
                const i = r.factory || (r.factory = Qt(r.type)),
                  s = Tt(R);
                try {
                  const a = Do(!1),
                    u = i();
                  return (
                    Do(a),
                    (function G_(e, t, n, r) {
                      n >= e.data.length &&
                        ((e.data[n] = null), (e.blueprint[n] = null)),
                        (t[n] = r);
                    })(n, y(), o, u),
                    u
                  );
                } finally {
                  Tt(s);
                }
              })(1, 'async'),
              Ia(2, 'video', 1, 2),
              Ue(4, 'input', 3),
              jn('change', function () {
                return (n.blur = !n.blur);
              }),
              Xe(),
              Ue(5, 'label'),
              Sr(6, 'BLUR'),
              Xe(),
              Ue(7, 'input', 3),
              jn('change', function () {
                return (n.invert = !n.invert);
              }),
              Xe(),
              Ue(8, 'label'),
              Sr(9, 'INVERT'),
              Xe(),
              Ue(10, 'input', 3),
              jn('change', function () {
                return (n.flip = !n.flip);
              }),
              Xe(),
              Ue(11, 'label'),
              Sr(12, 'FLIP'),
              Xe(),
              Ue(13, 'input', 3),
              jn('change', function () {
                return (n.sepia = !n.sepia);
              }),
              Xe(),
              Ue(14, 'label'),
              Sr(15, 'SEPIA'),
              Xe()()),
              2 & t &&
                (Fa('visible', dp(1, 7, n.isPlaying$)),
                wn(2),
                Kt('ngStyle', n.style),
                wn(2),
                Kt('checked', n.blur),
                wn(3),
                Kt('checked', n.invert),
                wn(3),
                Kt('checked', n.flip),
                wn(3),
                Kt('checked', n.sepia));
          },
          directives: [Eg],
          pipes: [wg],
          styles: [
            '.camera[_ngcontent-%COMP%]{margin-top:20px}.camera[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{opacity:0;visibility:hidden;transition:opacity 1s visibility 1s}.camera.visible[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{opacity:1;visibility:visible}.camera[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{width:100%;margin-bottom:15px}.camera[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:18px;font-weight:700;padding:0 30px 0 10px}',
          ],
        }));
      let TM = (() => {
        class e {
          constructor(n) {
            this.injector = n;
          }
          ngDoBootstrap() {
            const n = (function wM(e, t) {
              const n = (function mM(e, t) {
                  return t.get(Gn).resolveComponentFactory(e).inputs;
                })(e, t.injector),
                r = t.strategyFactory || new _M(e, t.injector),
                o = (function gM(e) {
                  const t = {};
                  return (
                    e.forEach(({ propName: n, templateName: r }) => {
                      t[
                        (function cM(e) {
                          return e.replace(
                            /[A-Z]/g,
                            (t) => `-${t.toLowerCase()}`
                          );
                        })(r)
                      ] = n;
                    }),
                    t
                  );
                })(n);
              class i extends EM {
                constructor(a) {
                  super(), (this.injector = a);
                }
                get ngElementStrategy() {
                  if (!this._ngElementStrategy) {
                    const a = (this._ngElementStrategy = r.create(
                      this.injector || t.injector
                    ));
                    n.forEach(({ propName: u }) => {
                      if (!this.hasOwnProperty(u)) return;
                      const l = this[u];
                      delete this[u], a.setInputValue(u, l);
                    });
                  }
                  return this._ngElementStrategy;
                }
                attributeChangedCallback(a, u, l, c) {
                  this.ngElementStrategy.setInputValue(o[a], l);
                }
                connectedCallback() {
                  let a = !1;
                  this.ngElementStrategy.events &&
                    (this.subscribeToEvents(), (a = !0)),
                    this.ngElementStrategy.connect(this),
                    a || this.subscribeToEvents();
                }
                disconnectedCallback() {
                  this._ngElementStrategy &&
                    this._ngElementStrategy.disconnect(),
                    this.ngElementEventsSubscription &&
                      (this.ngElementEventsSubscription.unsubscribe(),
                      (this.ngElementEventsSubscription = null));
                }
                subscribeToEvents() {
                  this.ngElementEventsSubscription =
                    this.ngElementStrategy.events.subscribe((a) => {
                      const u = new CustomEvent(a.name, {
                        detail: a.value,
                      });
                      this.dispatchEvent(u);
                    });
                }
              }
              return (
                (i.observedAttributes = Object.keys(o)),
                n.forEach(({ propName: s }) => {
                  Object.defineProperty(i.prototype, s, {
                    get() {
                      return this.ngElementStrategy.getInputValue(s);
                    },
                    set(a) {
                      this.ngElementStrategy.setInputValue(s, a);
                    },
                    configurable: !0,
                    enumerable: !0,
                  });
                }),
                i
              );
            })(Gr, {
              injector: this.injector,
            });
            customElements.define('bkc-camera', n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)($(He));
          }),
          (e.ɵmod = Xn({
            type: e,
          })),
          (e.ɵinj = nn({
            imports: [[KI]],
          })),
          e
        );
      })();
      (function B0() {
        Kp = !1;
      })(),
        ZI()
          .bootstrapModule(TM)
          .catch((e) => console.error(e));
    },
  },
  (K) => {
    K((K.s = 486));
  },
]);
