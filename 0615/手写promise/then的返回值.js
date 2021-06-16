function myPromise(exector) {
    const _this = this;
    _this.status = "pending";
    _this.value = undefined;
    _this.callback = {};

    function resolve(value) {
        if (_this.status !== "pending") return;
        _this.status = "resolved";
        _this.value = value;
        setTimeout(() => {
            _this.callback.onResolved && _this.callback.onResolved(value);
        })
    }

    function reject(reason) {
        if (_this.status !== "pending") return;
        _this.status = "rejected";
        _this.value = reason;
        setTimeout(() => {
            _this.callback.onRejected && _this.callback.onRejected(reason);
        })
    }
    exector(resolve, reject);
}
myPromise.prototype.then = function (onResolved, onRejected) {
    const _this = this;
    return new myPromise((resolve, reject) => {
        _this.callback.onResolved = function (value) {
            try {
                const re = onResolved(value);
                if (re instanceof myPromise) {
                    re.then(function (data) {
                        resolve(data);
                    }, function (reason) {
                        reject(reason);
                    })
                } else {
                    resolve(re);
                }
            } catch (e) {
                reject(e);
            }
        }
        _this.callback.onRejected = function (value) {
            onRejected();
        }
    })
}