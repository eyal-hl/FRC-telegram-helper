interface realContext {
  reply: any;
  update: Update;
  tg: Tg;
  botInfo: BotInfo;
  state: Events;
}

interface BotInfo {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
  can_join_groups: boolean;
  can_read_all_group_messages: boolean;
  supports_inline_queries: boolean;
}

interface Tg {
  token: string;
  options: Options2;
}

interface Options2 {
  apiRoot: string;
  apiMode: string;
  webhookReply: boolean;
  agent: Agent;
}

interface Agent {
  _events: Events;
  _eventsCount: number;
  defaultPort: number;
  protocol: string;
  options: Options;
  requests: Events;
  sockets: Events;
  freeSockets: FreeSockets;
  keepAliveMsecs: number;
  keepAlive: boolean;
  maxSockets?: any;
  maxFreeSockets: number;
  maxCachedSessions: number;
  _sessionCache: SessionCache;
}

interface SessionCache {
  map: any;
  list: string[];
}


interface Apitelegramorg4432 {
  type: string;
  data: number[];
}

interface FreeSockets {
  'api.telegram.org:443::::::::::::::::::': Apitelegramorg443[];
}

interface Apitelegramorg443 {
  _tlsOptions: TlsOptions;
  _secureEstablished: boolean;
  _securePending: boolean;
  _newSessionPending: boolean;
  _controlReleased: boolean;
  _SNICallback?: any;
  servername: string;
  alpnProtocol: boolean;
  authorized: boolean;
  authorizationError?: any;
  encrypted: boolean;
  _events: Events2;
  _eventsCount: number;
  connecting: boolean;
  _hadError: boolean;
  _parent?: any;
  _host: string;
  _readableState: ReadableState;
  readable: boolean;
  _writableState: WritableState;
  writable: boolean;
  allowHalfOpen: boolean;
  _sockname?: any;
  _pendingData?: any;
  _pendingEncoding: string;
  _server?: any;
  ssl: Ssl;
  _requestCert: boolean;
  _rejectUnauthorized: boolean;
  parser?: any;
  _httpMessage?: any;
}

interface Ssl {
  _parent: Parent;
  _secureContext: SecureContext;
  reading: boolean;
}

interface Parent {
  reading: boolean;
  onconnection?: any;
}

interface WritableState {
  objectMode: boolean;
  highWaterMark: number;
  finalCalled: boolean;
  needDrain: boolean;
  ending: boolean;
  ended: boolean;
  finished: boolean;
  destroyed: boolean;
  decodeStrings: boolean;
  defaultEncoding: string;
  length: number;
  writing: boolean;
  corked: number;
  sync: boolean;
  bufferProcessing: boolean;
  writecb?: any;
  writelen: number;
  afterWriteTickInfo?: any;
  bufferedRequest?: any;
  lastBufferedRequest?: any;
  pendingcb: number;
  prefinished: boolean;
  errorEmitted: boolean;
  emitClose: boolean;
  autoDestroy: boolean;
  bufferedRequestCount: number;
  corkedRequestsFree: CorkedRequestsFree;
}

interface CorkedRequestsFree {
  next: Next;
  entry?: any;
}

interface Next {
  next?: any;
  entry?: any;
}

interface ReadableState {
  objectMode: boolean;
  highWaterMark: number;
  buffer: Buffer;
  length: number;
  pipes?: any;
  pipesCount: number;
  flowing: boolean;
  ended: boolean;
  endEmitted: boolean;
  reading: boolean;
  sync: boolean;
  needReadable: boolean;
  emittedReadable: boolean;
  readableListening: boolean;
  resumeScheduled: boolean;
  emitClose: boolean;
  autoDestroy: boolean;
  destroyed: boolean;
  defaultEncoding: string;
  awaitDrain: number;
  readingMore: boolean;
  decoder?: any;
  encoding?: any;
}

interface Buffer {
  head?: any;
  tail?: any;
  length: number;
}

interface Events2 {
  close: null[];
}

interface TlsOptions {
  pipe: boolean;
  secureContext: SecureContext;
  isServer: boolean;
  requestCert: boolean;
  rejectUnauthorized: boolean;
}

interface SecureContext {
  context: Events;
}

interface Options {
  keepAlive: boolean;
  keepAliveMsecs: number;
  path?: any;
}

interface Events {
}

interface Update {
  update_id: number;
  message: Message;
}

interface Message {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text: string;
  entities: Entity[];
}

interface Entity {
  offset: number;
  length: number;
  type: string;
}

interface Chat {
  id: number;
  first_name: string;
  username: string;
  type: string;
}

interface From {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
  language_code: string;
}