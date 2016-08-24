var monni = function(numonni, eat) {
    var monni = '»<[°3°]';
    var randomSize = function() {
        var c = ((10 + Math.random() * 12) | 0);
        return c + 'px';
    };
    var randomColor = function() {
        var comp = function() {
            var c = ((Math.random() * 256) | 0).toString(16);
            return c.length < 2 ? '0' + c : c;
        };
        return '#' + comp() + comp() + comp();
    };
    var randomCoord = function(lim) {
        var c = ((Math.random() * lim) | 0);
        return c + 'px';
    };

    var point = function(p) {
        return +(p.substr(0, p.length - 2));
    };

    var monniElements = function(monni, speed) {
        var move = function(at, to) {
            at = point(at);
            var t = point(to) - at;
            var d = Math.min(Math.abs(t), speed);
            var s = Math.sign(t);
            return [(at + d * s) + 'px', s];
        };
        var tx = randomCoord(document.body.clientWidth),
            ty = randomCoord(document.body.clientHeight);
        var monniMover = function() {
            var [my, _] = move(monni.style.top, ty),
                [mx, inv] = move(monni.style.left, tx);
            if (ty == monni.style.top && tx == monni.style.left) {
                monni.style.display = 'none';
                var elem = document.elementFromPoint(point(tx), point(ty));
                monni.style.display = 'block';
                if (elem != null) eat(elem, monni);
                tx = randomCoord(document.body.clientWidth);
                ty = randomCoord(document.body.clientHeight);
            } else {
                monni.style.top = my;
                monni.style.left = mx;
                monni.style.transform = inv < 0 ? 'scale(-1, 1)' : '';
            }
        };
        var timer = setInterval(monniMover, 150);
    };

    for (var i = 0; i < numonni; i++) {
        var d = document.createElement('div');
        d.className = 'monni';
        d.style.fontSize = randomSize();
        d.style.color = randomColor();
        d.style.position = 'absolute';
        d.style.top = randomCoord(window.innerHeight);
        d.style.left = randomCoord(window.innerWidth);
        d.style.transition = 'top 0.2s linear, left 0.2s linear';
        d.style.outline = 'red';
        d.textContent = monni;
        document.body.appendChild(d);
        monniElements(d, (1 + Math.random() * 4) | 0);
    }
};
