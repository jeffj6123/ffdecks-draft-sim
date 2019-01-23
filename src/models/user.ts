import * as socketIo from 'socket.io';

export class User {
    private listeners: Record<string, (...args: any[]) => void > = {};

    constructor(
        public socket: socketIo.Socket, 
        public username: string){
        }

    sendMessage(event: string, message: any){
        this.socket.emit(event, message);
    }

    public addListener(eventName: string, callback: (...args: any[]) => void): void {
        this.socket.addListener(eventName, callback);
        this.listeners[eventName] = callback;
        console.log(this.socket.listeners(eventName))
    }

    public removeListener(eventName: string): void {
        const callback =  this.listeners[eventName];
        this.socket.removeListener(eventName, callback);
        delete this.listeners[eventName];
        console.log(this.socket.listeners(eventName))
    }
}

export class SocketBase {
    

}

export interface ICard {
    id: string;
}

export interface IDraftUserData {
    user: User;
    cards: ICard[];
}

//client
const REQUESTHAND = 'gethand';

//server
const GETHAND = 'currenthand';


export class Draft {
    userData: IDraftUserData[];

    constructor(public users: User[]){
        this.users.forEach(user => {
            this.userData.push({
                user,
                cards: []
            })
        })
        this.addListeners();
    }


    addListeners(): void {
        this.userData.forEach( (user) => {
            this.getCards(user);
            user.user.addListener(REQUESTHAND, )
            // console.log("testtt");
            // user.addListener('test', () => {})
            // user.removeListener('test');
        })
    }

    getCards(user: IDraftUserData): void {
        // const data = this.userData.find(u => u.user === user);
        user.user.sendMessage(GETHAND, user.cards);
    }

}