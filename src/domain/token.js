export class Token{
    static set value(token){
        localStorage.setItem('token_iddog', token);
    }

    static get value(){
        return localStorage.getItem('token_iddog');
    }
}