export interface IMessageService {
  publish(topic: string, data: any): Promise<void>;
}