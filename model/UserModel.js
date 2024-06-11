class UserModel{
    get usern() {
        return this._usern;
    }

    set usern(value) {
        this._usern = value;
    }

    get userp() {
        return this._userp;
    }

    set userp(value) {
        this._userp = value;
    }
    constructor(usern, userp) {
        this._usern = usern;
        this._userp = userp;
    }


}