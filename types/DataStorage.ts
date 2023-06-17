class Data {
    private static instance: Data;
    private AccBalance: String;
    static GetInstance(): Data{
        if(this.instance == null)
            this.instance = new Data()
        return this.instance;
    }
    
    public constructor(){ this.AccBalance = ""}

    public getAccBalance():String {return this.AccBalance}

    public setAccBalance(value:String) {return this.AccBalance}
}