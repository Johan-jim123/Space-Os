const SystemStorage ={
    prefix : "Austronuat_",

    save: function(key,data){
    const sdata=JSON.stringify(data);
    localStorage.setItem(this.prefix+key,sdata)

    },
    load:function(key,fallback){
        const user_data=localStorage.getItem(this.prefix+key)
        if (typeof user_data !==null){
            return JSON.parse(user_data);
        }
        else{
            return fallback

        }
    }
}