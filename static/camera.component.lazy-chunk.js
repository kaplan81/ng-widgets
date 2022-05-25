'use strict';
(self.webpackChunkbook = self.webpackChunkbook || []).push([
  [456],
  {
    456: (y, m, a) => {
      a.r(m),
        a.d(m, {
          CameraComponent: () => o,
        });
      var s = a(655);
      function l(n) {
        return null != n && 'false' != `${n}`;
      }
      var h = a(808),
        C = a(579);
      class v extends C.x {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const i = super._subscribe(t);
          return !i.closed && t.next(this._value), i;
        }
        getValue() {
          const { hasError: t, thrownError: i, _value: r } = this;
          if (t) throw i;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      var c,
        u,
        p,
        f,
        e = a(923);
      const b = ['video'];
      class o {
        constructor() {
          c.set(this, !1),
            u.set(this, !1),
            p.set(this, !1),
            f.set(this, !1),
            (this.isPlaying$ = new v(!1)),
            (this.video = null),
            (this.videoEl = null);
        }
        get blur() {
          return (0, s.Q_)(this, c, 'f');
        }
        set blur(t) {
          (0, s.YH)(this, c, l(t), 'f');
        }
        get invert() {
          return (0, s.Q_)(this, u, 'f');
        }
        set invert(t) {
          (0, s.YH)(this, u, l(t), 'f');
        }
        get flip() {
          return (0, s.Q_)(this, p, 'f');
        }
        set flip(t) {
          (0, s.YH)(this, p, l(t), 'f');
        }
        get sepia() {
          return (0, s.Q_)(this, f, 'f');
        }
        set sepia(t) {
          (0, s.YH)(this, f, l(t), 'f');
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
            i = '';
          return (
            this.blur && (t += 'blur(5px)'),
            this.invert && (t += 'invert(1)'),
            this.flip && (i += 'scaleX(-1)'),
            this.sepia && (t += 'sepia(50%)'),
            {
              filter: t,
              transform: i,
            }
          );
        }
      }
      (c = new WeakMap()),
        (u = new WeakMap()),
        (p = new WeakMap()),
        (f = new WeakMap()),
        (o.ɵfac = function (t) {
          return new (t || o)();
        }),
        (o.ɵcmp = e.Xpm({
          type: o,
          selectors: [['bkc-camera']],
          viewQuery: function (t, i) {
            if ((1 & t && e.Gf(b, 5), 2 & t)) {
              let r;
              e.iGM((r = e.CRH())) && (i.video = r.first);
            }
          },
          inputs: {
            blur: 'blur',
            invert: 'invert',
            flip: 'flip',
            sepia: 'sepia',
          },
          standalone: !0,
          features: [e.jDz],
          decls: 16,
          vars: 9,
          consts: [
            [1, 'camera'],
            [3, 'ngStyle'],
            ['video', ''],
            ['type', 'checkbox', 3, 'checked', 'change'],
          ],
          template: function (t, i) {
            1 & t &&
              (e.TgZ(0, 'div', 0),
              e.ALo(1, 'async'),
              e._UZ(2, 'video', 1, 2),
              e.TgZ(4, 'input', 3),
              e.NdJ('change', function () {
                return (i.blur = !i.blur);
              }),
              e.qZA(),
              e.TgZ(5, 'label'),
              e._uU(6, 'BLUR'),
              e.qZA(),
              e.TgZ(7, 'input', 3),
              e.NdJ('change', function () {
                return (i.invert = !i.invert);
              }),
              e.qZA(),
              e.TgZ(8, 'label'),
              e._uU(9, 'INVERT'),
              e.qZA(),
              e.TgZ(10, 'input', 3),
              e.NdJ('change', function () {
                return (i.flip = !i.flip);
              }),
              e.qZA(),
              e.TgZ(11, 'label'),
              e._uU(12, 'FLIP'),
              e.qZA(),
              e.TgZ(13, 'input', 3),
              e.NdJ('change', function () {
                return (i.sepia = !i.sepia);
              }),
              e.qZA(),
              e.TgZ(14, 'label'),
              e._uU(15, 'SEPIA'),
              e.qZA()()),
              2 & t &&
                (e.ekj('visible', e.lcZ(1, 7, i.isPlaying$)),
                e.xp6(2),
                e.Q6J('ngStyle', i.style),
                e.xp6(2),
                e.Q6J('checked', i.blur),
                e.xp6(3),
                e.Q6J('checked', i.invert),
                e.xp6(3),
                e.Q6J('checked', i.flip),
                e.xp6(3),
                e.Q6J('checked', i.sepia));
          },
          dependencies: [h.ez, h.PC, h.Ov],
          styles: [
            '.camera[_ngcontent-%COMP%]{margin-top:20px}.camera[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{opacity:0;visibility:hidden;transition:opacity 1s visibility 1s}.camera.visible[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{opacity:1;visibility:visible}.camera[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{width:100%;margin-bottom:15px}.camera[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:18px;font-weight:700;padding:0 30px 0 10px}',
          ],
        }));
    },
  },
]);
