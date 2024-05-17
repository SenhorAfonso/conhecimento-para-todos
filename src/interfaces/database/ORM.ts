interface ORM {
  connect(url: string, options?: object): Promise<any>;
  disconnect(): Promise<void>
}

export default ORM;