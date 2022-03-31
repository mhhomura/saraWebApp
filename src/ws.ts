
interface Message {
  subject: string;
  data: any;
}

class WS {
  private ws?: WebSocket;
  private listeners = new Array<(msg: Message) => void>();
  public initialized = false;

  public init(token: string, isChat: boolean = false) {
    this.ws = new WebSocket(`${process.env.REACT_APP_WS_API}/${isChat ? 'chat' : 'user'}/ws/${token}`);
    this.initialized = true;
    this.ws.onmessage = ({ data }) => this.notify(JSON.parse(data));
    this.ws.onclose = () => setTimeout(() => this.init(token, isChat), 1e3);
  }

  public subscribe(cb: (msg: Message) => void) {
    this.listeners.push(cb);
    return () => this.unsubscribe(cb);
  }

  public unsubscribe(cb: (msg: Message) => void) {
    this.listeners = this.listeners.filter((l) => l !== cb);
  }

  private notify(msg: Message) {
    this.listeners.forEach((cb) => cb(msg));
  }
}

export default new WS();
