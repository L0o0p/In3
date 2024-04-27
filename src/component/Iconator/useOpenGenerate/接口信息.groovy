uri: wss://aiopen.cytelab.net
path: /paid/ws
version: v4
auth: { uid: string }

生图过程图返
event: 'progress'
payload: {
  data: Buffer; // image data
  headers: {
    progress: number;
  }
}

生图结束图返
event: 'finish'
payload: {
  data?: Buffer; // set null if banned is true 
  banned?: boolean;
  headers: {
    progress: number;
  }
}

