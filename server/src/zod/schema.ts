import zod from 'zod';
export let userschema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(8)
});

export const validation=(obj:object)=>{
    try{
        let result= userschema.safeParse(obj);
    if(result.success)
    {
        return true
    }
    else{
        return false
    }

    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}